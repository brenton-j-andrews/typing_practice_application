import React from 'react';

import Register from '../Register/Register';
import "./credential.css";

const Credential = ({ setDisplayModal }) => {

  return (
    <div className="modal-content">
      <Register />

      <button className='exit-btn' onClick={() => {setDisplayModal(false)}}> Close </button>
    </div> 
  )
};

export default Credential;
