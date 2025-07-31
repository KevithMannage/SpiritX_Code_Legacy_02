import connectDB from '../Config/db.js';

export const createUser = async (username, password, email) => {
  const query = `
    INSERT INTO user (username, password, email, Is_Admin, Created_date) 
    VALUES (?, ?, ?, 0, NOW())`;  // Set Is_Admin to 0 and Created_date to NOW()
  
  const result = await connectDB.execute(query, [username, password, email]);
  return result;
};



export const getUserByUsername = async (username) => {
  try {
    console.log(username);

    // Use await with a promise-based query method
    const [results] = await connectDB.execute(
      'SELECT * FROM user WHERE Username = ?',
      [username]
    );

    console.log(results);

    if (results.length > 0) {
      console.log('User found:', results[0]);
      return results[0]; // Return the user object
    } else {
      return null; // Return null if no user is found
    }
  } catch (err) {
    console.error('Error querying database:', err);
    throw err; // Re-throw the error to handle it in the calling function
  }
};


// Function to get user by username and password
export const getUserByEmailAndPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    connectDB.query(
      'SELECT * FROM user WHERE username = ? AND password = ?',
      [username, password],
      (err, results) => {
        if (err) {
          console.error('Error querying database:', err);
          reject(err);  
        } else {
          if (results.length > 0) {
            console.log('User found:', results[0]);
            resolve(results[0]);  
          } else {
            resolve(null);  
          }
        }
      }
    );
  });
};



export const findUserByEmailAndUsername = async (email, username) => {
  const [rows] = await connectDB.execute(
    "SELECT * FROM user WHERE Email = ? AND Username = ?",
    [email, username]
  );
  return rows[0]; // returns undefined if not found
};