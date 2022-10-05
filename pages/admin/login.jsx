import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styles from '../../styles/AdminLogin.module.css'

const login = () => {

   const [username, setUsername] = useState(null);
   const [password, setPassword] = useState(null);
   const [error, setError] = useState(false);
   const router = useRouter();

   const handleLogin = async () => {
    try{
        await axios.post("http://localhost:3000/api/login", {username, password});
        router.push("/admin")
    }catch(err){
        setError(true);
    }    
   }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1>Admin Dashboard</h1>
            <input type="text" placeholder='Username' className={styles.usernameInput} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='Password' className={styles.passwordInput} onChange={(e) => setPassword(e.target.value)} />
            <button className={styles.button} onClick={handleLogin}>Sign In</button>
            {error && <span className={styles.errorMessage}>Wrong Credentials!!</span>}
        </div>
    </div>
  )
}

export default login