export const logInHandler = (username, password) => (
  new Promise((resolve, reject) => {
    if (username === 'admin' && password === '12345') {
      resolve();
    } else {
      reject(new Error('Incorrect username or password.'));
    }
  })
);
