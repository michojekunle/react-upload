import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { searchUploads } = useContext(AuthContext);

  return (
    <div>
        <form className='search-bar-form' onSubmit={e => {e.preventDefault(); searchUploads(searchTerm) }}>
            <i className="fas fa-search"></i>
            <input 
                type="text"
                placeholder='search documents...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </form>
    </div>
  )
}

export default SearchBar