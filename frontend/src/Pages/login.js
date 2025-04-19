import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    // Handle successful login here
    const userObj = {
      name: response?.credential?.name,
      email: response?.credential?.email,
    };
    setUser(userObj);
    console.log('User Data:', userObj);
  };

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
  };

  return (
    <div style={styles.container}>
      <h2>Login to Your Account</h2>

      {/* Google login button */}
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        useOneTap
      />

      <p>OR</p>

      {/* Regular login form */}
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Username" required style={styles.input} /><br /><br />
        <input type="password" placeholder="Password" required style={styles.input} /><br /><br />
        <button type="submit" style={styles.button}>Login</button>
      </form>

      {user && (
        <div style={styles.userInfo}>
          <h3>Logged in as:</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    margin: '0 auto',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  userInfo: {
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default LoginPage;
