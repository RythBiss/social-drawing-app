import React, { useState } from 'react'
import { handleUpdateProfile } from '../Functions/API'

export default function Edit() {

    const [name, setName] = useState('');
    const [URL, setURL] = useState(null);

  return (
    <div className='edit-container'>
        <div className='edit-name'>
            <h1>Change Display Name</h1>
            <div>
                <input type='text' placeholder='Display Name' value={name} onChange={e => setName(e.target.value)} />
                <button onClick={() => {
                    if(name !== ''){
                        handleUpdateProfile(name, null);
                    }
                }} >Save Changes</button>
            </div>
        </div>
        <div className='edit-pic'>
            <h1>Change Profile Picture</h1>
            <div>
                <label htmlFor='upload'>Upload Image</label>
                <input id='upload' type='file' onChange={(e) => {setURL(e.target.files[0])}} />
                <button onClick={() => {
                    if(URL !== null){
                        handleUpdateProfile(null, URL);
                    }
                }} >Save Changes</button>
            </div>
            <p>
                {
                    URL ? URL.name : ''
                }
            </p>
        </div>
    </div>
  )
}
