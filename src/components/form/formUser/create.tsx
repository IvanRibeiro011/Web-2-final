"use client";
import userPost, { User } from "@/actions/new-user";
import React, { useState } from "react";
import "../../../app/register/style.css";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function FormCreate() {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const newUser: User = {
      nome,
      email,
      senha,
    };

    const {ok, error} = await userPost(newUser);
    if (ok) {
      toast({
        title: "Usuário foi criado com sucesso"
      })
      router.push("/")
    } else {
      toast({
        title: error,
      })
    }
  };

  return (
    <div>
      <form className="form-register" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <br />
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
          <div>
            <button type="submit" className="button">
              Cadastrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
