import React, {useContext, useState} from 'react';
import { AuthContext } from '../context/AuthContext';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { handleSignIn, loading, closeModal } = useContext(AuthContext);

  return (
    <div className='signin'>
        <button onClick={closeModal}><i className="fas fa-times"></i></button>
        <h2 className='signin-heading'>Sign In</h2>
        <form onSubmit={e => {e.preventDefault(); handleSignIn(username, password)}} >
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
                value={loading ? "Signing In": "Sign In"}
                onClick={handleSignIn(username, password)}
            />
        </form>
    </div>
  )
}

export default SignIn