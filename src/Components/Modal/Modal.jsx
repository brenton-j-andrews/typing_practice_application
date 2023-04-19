import React from 'react';

import Register from '../Register/Register';
import Login from "../Login/Login";
import "./modal.css";

const Modal = ({ modalMode, setModalMode, setDisplayModal }) => {

  return (
    <div className="modal-content">
      { modalMode === "register" && <Register setModalMode={setModalMode}/> }
      { modalMode === "login" && <Login setModalMode={setModalMode}/> }


      <button className='exit-btn' onClick={() => {setDisplayModal(false)}}> Close </button>
    </div> 
  )
};

export default Modal;