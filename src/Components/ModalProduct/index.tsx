import { useState } from "react";
import ReactModal from "react-modal";
import { ModalContainer, ModalContent } from "./styled";
import "./modal.css";
import { Products } from "../../Pages/Products";

interface ModalProductProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ModalProduct({ isOpen, onRequestClose }: ModalProductProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      className="modal-content"
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      // style={customStyles}
      // onAfterOpen={afterOpenModal}
      overlayClassName="modal-overlay"
    >
      <ModalContainer>
        <ModalContent>
          <Products />
        </ModalContent>
      </ModalContainer>
    </ReactModal>
  );
}
