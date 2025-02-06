import { auth, googleProvider } from '../../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from "./index.module.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/'); // Redirect to home page if logged in
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bg}></div>
      <div className={styles.innercontainer}>
        <div className={styles.content}>
          <div className={styles.logo}></div>
          <h2>To use this Application, click the button Below and Log in through Google Account</h2>
          <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
