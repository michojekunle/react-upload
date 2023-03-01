import React, {useContext, useState} from 'react';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { handleSignUp, loading } = useContext(AuthContext);


  return (
    <div className='signup'>
        <h2 className='signup-heading'>Sign Up</h2>
        <form onSubmit={e => { e.preventDefault(); handleSignUp(username, password) }}>
            <input 
                className="username" 
                type="text" 
                placeholder="Enter your Username" 
                value= {username}
                onChange={e => setUsername(e.target.value)}
                required
            />
            <input 
                className="password" 
                type="password" 
                placeholder="Enter Your Password" 
                value= {password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <input 
                className="submit" 
                type="submit" 
                value={loading ? "Signing up..." : "Sign Up"}
                onClick={handleSignUp(username, password)}
            />
        </form>
    </div>
  )
}

export default SignUp