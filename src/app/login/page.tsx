import React from "react";
import "../register/style.css";
import "./style.css";
import Link from "next/link";
import FormLogin from "@/components/form/login";

export default function LoginPage() {
  return (
    <main>
      <div className="register">
        <h1>Login</h1>
        <FormLogin />
      </div>
    </main>
  );
}
