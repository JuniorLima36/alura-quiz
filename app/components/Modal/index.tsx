import React from 'react';
import modalStyles from './modal.module.css';

interface ModalProps {
  message: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <section className={modalStyles.modalOverlay}>
      <article className={modalStyles.modalContent}>
        <p>{message}</p>
        <button onClick={onClose}>Fechar</button>
      </article>
    </section>
  )
}