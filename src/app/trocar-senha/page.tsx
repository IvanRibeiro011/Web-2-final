import React from "react";
import "../register/style.css";
import NewPassword from "@/components/form/formNewPassword/newPassword";

export default function AlterPassword() {
  return (
    <main>
      <div className="register">
        <h1>Trocar senha</h1>
        <NewPassword />
      </div>
    </main>
  );
}
