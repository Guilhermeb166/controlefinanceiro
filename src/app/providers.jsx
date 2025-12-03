'use client'

import Modal from "react-modal";

export default function Providers({ children }) {
  Modal.setAppElement('body'); 
  return <>{children}</>;
}
