import React, { useState } from 'react'
import { handleUpdateProfile } from '../Functions/API'
import { motion } from "framer-motion"


export default function Edit() {

    const [name, setName] = useState('');
    const [URL, setURL] = useState(null);

    const fieldsContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
            }
        }
    }    

    const fieldsAnim = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
      };

  return (
    <motion.div className='edit-container' variants={fieldsContainer} initial="hidden" animate="show">
        <motion.div className='edit-name' variants={fieldsAnim}>
            <h1>Change Display Name</h1>
            <div>
                <input type='text' placeholder='Display Name' value={name} onChange={e => setName(e.target.value)} />
                <button onClick={() => {
                    if(name !== ''){
                        handleUpdateProfile(name, null);
                    }
                }} >Save Changes</button>
            </div>
        </motion.div>
        <motion.div className='edit-pic' variants={fieldsAnim} >
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
        </motion.div>
    </motion.div>
  )
}
