import { useContext, useState } from 'react';
import SearchBar from './components/SearchBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthContext } from './context/AuthContext';

import pdf from './pdf.svg';
import './App.css';

function App() {
  const { userProfile, handleSignOut, authstate, setAuthstate } = useContext(AuthContext);
  const [docUpload, setDocUpload] = useState([]);
  console.log("Image FIles", docUpload);

  const docUploadHandler = (e) => {
    if (e.target.files.length !== 0) {
      setDocUpload([...docUpload, { file: e.target.files[0]}]);
    }
  }

  function getLastModified(d_c) {
    const currentDate = (new Date()).getTime();
    const remTime = currentDate - d_c;
    
    let lastModified;

    if(remTime / (1000) < 60 ){
      lastModified = `${(remTime / (1000)).toFixed(0)} seconds ago`;
    } else if(remTime / (1000 * 60) < 60) {
      lastModified = `${(remTime / (1000 * 60)).toFixed(0)} minutes ago`;
    } else if(remTime / (1000 * 60 * 60) < 24) {
      lastModified = `${(remTime / (1000 * 60 * 60)).toFixed(0)} hours ago`;
    } else if(remTime / (1000 * 60 * 60 * 24) < 7){
      lastModified = `${(remTime / (1000 * 60 * 60 * 24)).toFixed(0)} days ago`;
    } else {
      lastModified = 'a few weeks ago';
    }
    
    return lastModified;
  }

  function dropHandler(ev) {
    console.log("File(s) dropped");
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          console.log(`… file[${i}].name = ${file.name}`);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  }

  console.log((new Date()).getTime())

  function dragOverHandler(e) {
    console.log("File(s) in drop zone");
  
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
  }

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

        <section className='main'>
          <div 
            className='upload'
            onDrop={dropHandler}
            onDragOver={dragOverHandler}
          >
            <img src={pdf} alt="Pdf Image" />
            <p>Drag and drop your pdf here</p>
            <label>Upload File <input type="file" onChange={docUploadHandler}/> </label>
            <p>Maximum of 10mb</p>
          </div>
          
          <section className="uploads">
            <h3>Recent Activity</h3>
            <ul className="documents-uploaded">
              <li className='header'>
                <span>Name</span>
                <span>Last edited</span>
                <span>size</span>  
              </li>
              {
                docUpload.map(upload => (
                  <li key={upload.file.lastModified}>
                    <span>{upload.file.name}</span>
                    <span>{getLastModified(upload.file.lastModified)}</span>
                    <span>{upload.file.size}kb</span>
                  </li>
                ))
              }
            </ul>
          </section>

        </section>
      </div>
  );
}

export default App;
