import React from "react";
import "./style.css";
import NewContact from "@/components/form/formContact/newContact";

export default function AddContact() {
  return (
    <main>
      <div className="register">
        <h1>Cadastrar contato</h1>
        <NewContact />
      </div>
    </main>
  );
}
