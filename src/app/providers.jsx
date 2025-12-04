'use client'
import Modal from "react-modal";
import { AppProvider } from "@/context/AppContext";

export default function Providers({ children }) {
  Modal.setAppElement('body'); 
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}
