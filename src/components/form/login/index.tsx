'use client'
import loginPost, { Login } from "@/actions/login";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function FormLogin() {
  const { toast } = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const login: Login = {
      email,
      senha,
    };

    const { ok, error } = await loginPost(login);
    if (ok) {
      toast({
        title: "Login executado com sucesso",
      });
      router.push("/contatos");
    } else {
      toast({
        title: error,
      });
    }
  };

  return (
    <form className="form-register" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <br />
        <p className="esqueceu-senha">
          Trocar a senha <Link href="/trocar-senha">Clique aqui</Link>
        </p>
        <br />
        <button type="submit" className="button">
          Logar
        </button>
      </div>
    </form>
  );
}
