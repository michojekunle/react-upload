import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';

const ListUploads = () => {
    const { uploads } = useContext(AuthContext);
  return (
    <div>

    </div>
  )
}

export default ListUploads