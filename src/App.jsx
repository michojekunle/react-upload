import { useContext, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import * as XLSX from 'xlsx/xlsx.mjs';
import { AuthContext } from './context/AuthContext';

import xls from './download.png';
import './App.css';

function App() {
  const { userProfile, handleSignOut, authstate, setAuthstate, setDocumentUploaded, searchResults, docHeaders, docBody } = useContext(AuthContext);
  

    const processExcelFile = (data) => {
      let workbook = XLSX.read(data, {type: 'binary'});
      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];

      // Convert Array to json
      const dataParse = XLSX.utils.sheet_to_json(ws, {header: 1});
      console.log("DataParsed", dataParse);
      return dataParse;
    } 

  const docUploadHandler = (e) => {
    const fileUploaded = e.target.files[0];

    //for browsers other than internet explorer
    if(typeof (FileReader) !== 'undefined'){
      let reader = new FileReader();

      if(reader.readAsBinaryString){
        
        reader.onload = function(e) {
          const res = processExcelFile(e.target.result);
          setDocumentUploaded(res);
        }
        reader.readAsBinaryString(fileUploaded)
      } else {
        // For Internet Explorer
        reader.onload = function(e){
          let data = "";
          let bytes = new Uint8Array(e.target.result);
          for(let i=0; i< bytes.byteLength; i++){
            data += String.fromCharCode(bytes[i]);
          }
          const res = processExcelFile(data);
          setDocumentUploaded(res)
        }
        reader.readAsBinaryString(fileUploaded)
      }
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

  useEffect(() => {
    console.log(docHeaders)
  }, [docHeaders])

  useEffect(() => {
    console.log(docBody)
  }, [docBody])

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
          >
            <img src={xls} alt="Pdf Image" />
            <p>Drag and drop your pdf here</p>
            <label>Upload File <input type="file" accept=".xls, .xlsx" onChange={docUploadHandler}/> </label>
            <p>Maximum of 10mb</p>
          </div>
          
          <section className="uploads">
            <h3>Output</h3>
            <ul className="documents-uploaded">
              <li className='header'>
                {
                  docHeaders?.length > 0 && (
                    docHeaders.map(header => (
                      <span>{header}</span>
                    ))
                  )
                }               
              </li>
              {
                searchResults?.length > 0 && (
                  docBody.map((list, i) => (
                    i!== 0 && (
                       <li>
                        {
                          list?.length > 0 && (
                            list.map(body => (
                              <span>{body}</span>
                            ))
                          )
                        }
                      </li>
                     )
                  ))
                )
              }
            </ul>
          </section>

        </section>
      </div>
  );
}

export default App;
