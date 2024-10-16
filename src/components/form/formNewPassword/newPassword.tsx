"use client";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import updatePassword from "@/actions/new-password"; 

export default function NewPassword() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [novaSenha, setNovaSenha] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      email,
      senha,
      novaSenha,
    };

    const { ok, error } = await updatePassword(data); 
    if (ok) {
      toast({
        title: "Senha atualizada com sucesso",
      });
      router.push("/login");
    } else {
      toast({
        title: error,
      });
    }
  };

  return (
    <form className="form-register" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          name="senha"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <br />
        <label htmlFor="nova-senha">Nova senha:</label>
        <input
          type="password"
          id="nova-senha"
          name="nova-senha"
          placeholder="Digite uma nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />
        <br />
        <div>
          <button type="submit" className="button">
            Atualizar
          </button>
        </div>
      </div>
    </form>
  );
}
