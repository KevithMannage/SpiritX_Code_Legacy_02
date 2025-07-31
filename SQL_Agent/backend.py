from flask import Flask, request, jsonify
import google.generativeai as genai
import mysql.connector
import os
from dotenv import load_dotenv
from mysql.connector import Error
from flask_cors import CORS

# Load all environment variables
load_dotenv()

# Configure our API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# MySQL Database Configuration
DB_CONFIG = {
    'host': os.getenv("DB_HOST"),
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASSWORD"),
    'database': 'spiritx_2'
}

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Updated prompt for cricket fantasy application
PROMPT = """You are an expert in converting English questions to MySQL queries for a cricket fantasy application!
The database has the following tables:

1. USER (User_ID, Username, Password, Is_Admin, Created_date, Email)
2. PLAYER (Player_ID, Name, University, Category, Total_Runs, Balls_Faced, Innings_Played, Wickets, Overs_Bowled, Runs_Conceded)
3. TEAM_MEMBERS (User_ID, Player_ID, Purchased_Price, Added_Date)

Important Rules:
1. Always use proper MySQL syntax
2. Never include ``` or 'sql' in output
3. Only return the SQL query
4. String values in single quotes
5. Table/column names are case-sensitive

Examples:
Question: How many batsmen are there?
SQL: SELECT COUNT(*) FROM Player WHERE Category = 'Batsman';

Question: Show top 5 players by runs
SQL: SELECT Name, Total_Runs FROM Player ORDER BY Total_Runs DESC LIMIT 5;

Question: Find all players from 'XYZ University'
SQL: SELECT * FROM Player WHERE University = 'XYZ University';

Question: List all teams for user with ID 5
SQL: SELECT p.Name, p.Category, tm.Purchased_Price 
     FROM Team_Members tm
     JOIN Player p ON tm.Player_ID = p.Player_ID
     WHERE tm.User_ID = 5;
"""


def get_gemini_response(question, prompt):
    """Get response from Gemini model with error handling"""
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content([prompt, question])
        return response.text
    except Exception as e:
        return None


def read_sql_query(sql):
    """Execute SQL query with proper error handling and connection management"""
    conn = None
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor(dictionary=True)

        cursor.execute(sql)

        if sql.strip().lower().startswith('select'):
            rows = cursor.fetchall()
            return rows
        else:
            conn.commit()
            return f"Query executed successfully. Rows affected: {cursor.rowcount}"

    except Error as e:
        return None
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


def clean_sql_response(response):
    """Clean the SQL response by removing unwanted characters"""
    if not response:
        return None

    response = response.replace("```sql", "").replace("```", "").strip()
    return response


@app.route('/generate-sql', methods=['POST'])
def generate_sql():
    data = request.get_json()
    question = data.get('question')

    if not question:
        return jsonify({'error': 'Question is required'}), 400

    # Generate SQL query
    response = get_gemini_response(question, PROMPT)
    sql_query = clean_sql_response(response)

    if not sql_query:
        return jsonify({'error': 'Failed to generate SQL query'}), 400

    # Execute the query
    result = read_sql_query(sql_query)

    if result is None:
        return jsonify({'error': 'Error executing SQL query'}), 500

    return jsonify({
        'sql_query': sql_query,
        'result': result
    })


if __name__ == '__main__':
    app.run(debug=True, port=8000)
