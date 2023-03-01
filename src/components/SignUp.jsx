import React, {useContext, useState} from 'react';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { handleSignUp, loading, closeModal } = useContext(AuthContext);


  return (
    <div className='signup'>
        <button onClick={closeModal}><i className="fas fa-times"></i></button>
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
                className="email" 
                type="email" 
                placeholder="Enter your Email Address" 
                value= {email}
                onChange={e => setEmail(e.target.value)}
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