import React, { useState } from "react";
import "./style.css";
import FormCreate from "@/components/form/formUser/create";

export default function RegisterPage() {

  return (
    <main>
      <div className="register">
        <h1>Cadastro</h1>
        <FormCreate />
      </div>
    </main>
  );
}
