import React from 'react';

interface ModalProps {
  title: string;
  message: string;
  handleClose: () => void;
  handleConfirm: () => void;
}

export default function Modal({ title, message, handleClose, handleConfirm }: ModalProps) {
  return (
    <div className="overlay">
      <div className="modal-custom">
        <div className="modal-title">
          <h4>{title}</h4>
          <i className="fa-solid fa-xmark" onClick={handleClose} />
        </div>
        <div className="modal-body-custom">
          <span>{message}</span>
        </div>
        <div className="modal-footer-custom">
          <button className="btn btn-light" onClick={handleClose}>Hủy</button>
          <button className="btn btn-danger" onClick={handleConfirm}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
}
