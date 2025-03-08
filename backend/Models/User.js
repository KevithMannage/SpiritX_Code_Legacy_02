import connectDB from '../Config/db.js';

export const createUser = async (username, password) => {
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  const result = await  connectDB.execute(query, [username, password]); // Assuming you're using a MySQL database
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
      'SELECT * FROM users WHERE username = ? AND password = ?',
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
