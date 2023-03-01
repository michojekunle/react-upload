import { useContext } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthContext } from './context/AuthContext';

function App() {
  const { userProfile, handleSignOut, authstate, setAuthstate } = useContext(AuthContext);

  return (
      <div className="container">
        <header className='app-header'>
          <div className="brand-logo">
            <p>Logo</p>
          </div>
          <SearchBar />
          <div className="nav-links">
            {userProfile?.username ? (
              <>
                <div className='avatar'>{userProfile?.username.charAt(0).toUpperCase()}</div>
                <p>{userProfile?.username}</p>
                <button onClick={handleSignOut}><i className="fas fa-sign-out"></i></button>
              </>
            ) : (
              <>
                <button onClick={() => setAuthstate({ signin: true, signup: false, overlay: true})}>Sign In</button>
                <button onClick={() => setAuthstate({ signin: false, signup: true, overlay: true})}>Sign Up</button>
              </>
            )
            }
          </div>
        </header>
        {
          authstate.overlay && (
            <div className='overlay' onClick={() => setAuthstate({ signin: false, signup: false, overlay: false})}></div>
          )
        }
        {
          authstate.signin && (
            <SignIn/>
          )
        }
        {
          authstate.signup && (
            <SignUp/>
          )
        }
      </div>
  );
}

export default App;
