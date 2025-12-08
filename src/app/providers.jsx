'use client'
import { SessionProvider } from "next-auth/react";
import Modal from "react-modal";
import { AppProvider } from "@/context/AppContext";


export default function Providers({ children }) {
  Modal.setAppElement('body'); 
  return (
    <SessionProvider>
      <AppProvider>
        {children}
      </AppProvider>
    </SessionProvider>
  );
}
