import ReactModal from "react-modal";
import { ModalContainer } from "./styled";
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
      overlayClassName="modal-overlay"
    >
      <ModalContainer>
        <Products />
      </ModalContainer>
    </ReactModal>
  );
}
