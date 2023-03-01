import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [uploads, setUploads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [docUpload, setDocUpload] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [userProfile, setUserProfile] = useState({});
    const [authstate, setAuthstate] = useState({
        signin: false,
        signup: false,
        overlay: false
    })

    const handleSignUp = (username, password) => async () => {
        try {
            setLoading(true);
            // Check of user exists
            let exists = false;
            console.log(users);
            users.forEach(user => {
                if(user.username === username){
                    exists = true;
                } 
            })

            if(exists){
                alert("User Already exists");
            }else {
                setUsers([...users, { username, password }]);
                setLoading(false);
                setAuthstate({signin: true, signup: false, overlay: true})
                const usersInlocalStorage = JSON.parse(localStorage.getItem('users'));
                usersInlocalStorage.push({ username, password })
                localStorage.setItem('users', JSON.stringify(usersInlocalStorage));
            }

        } catch (error) {   
            console.error(error.message);
            alert(error.message);  
            setLoading(false);
        }
    }

    const handleSignIn = (username, password) => () => {
        try {
            // Check if user exists
            let exists = false;
            console.log(users);
            
            users.forEach(user => {
                if(user.username === username) {
                    exists = true;
                }
            })

            if(exists) {
                let isValid = false;
                users.forEach(user => {
                    if(user.username === username && user.password === password){
                        isValid = true;
                        setUserProfile(user);
                        localStorage.setItem('userprofile', JSON.stringify(user));
                        setAuthstate({signin: false, signup: false, overlay: false});
                    }
                })

                if(!isValid) {
                    alert("Invalid Credentials....")
                }
            }else {
                alert("User Not Found ");
            }

        } catch (error) {   
            console.error(error.message);
            alert(error.message);   
            setLoading(false);         
        }
    };

    const handleSignOut = () => {
        localStorage.setItem('userprofile', 'null');
        setUserProfile({});
    };

    const searchUploads = (searchTerm) => {
        alert(searchTerm);
        setDocUpload(docUpload.filter(doc => {
            if(doc.name.includes(searchTerm)){
                return doc;
            }
        }));
    };

    const closeModal = () => {
        setAuthstate({signin: false, signup: false, overlay: false});
    }

    useEffect(() => {
        if(localStorage.getItem('users') !== null && localStorage.getItem('users') !== 'null'){
            setUsers(JSON.parse(localStorage.getItem('users')));
        }else {
            setUsers([]);
            localStorage.setItem('users', JSON.stringify([]));
            console.log(users);
        }
    }, [localStorage.getItem('users')]);

    useEffect(() => {
        if(localStorage.getItem('userprofile') !== null && localStorage.getItem('userprofile') !== 'null' ){
            setUserProfile(JSON.parse(localStorage.getItem('userprofile')));
        }else {
            setUserProfile({});
            console.log(userProfile)
        }
    }, [localStorage.getItem('userprofile')]);



    useEffect(() => {
        setSearchResults(docUpload.filter(doc => {
            if(doc.name.includes(searchTerm)){
                return doc;
            }
        }))
    
    
    }, [searchTerm])

    useEffect(() => {
        setSearchResults(docUpload.filter(doc => {
            if(doc.name.toLowerCase().includes(searchTerm.toLowerCase())){
                return doc;
            }
        }))


    }, [docUpload])

    useEffect(() => {
    }, [docUpload]);

    useEffect(() => {
        setDocUpload(JSON.parse(localStorage.getItem('docupload')))
    },[localStorage.getItem('docupload')])

  return (
    <AuthContext.Provider value={{users, loading, userProfile, handleSignIn, handleSignUp, handleSignOut, uploads, searchUploads, authstate, setAuthstate, docUpload, setDocUpload, searchTerm, setSearchTerm, searchResults, closeModal}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider