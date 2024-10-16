"use client";
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import createContact from '@/actions/new-contact'; 
import "../../../app/cadastrar-contato/style.css";

export default function NewContact() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      nome: name,
      email,
      endereco,
      usuarioId: 1
    };

    const { ok, error } = await createContact(data); 
    if (ok) {
      toast({
        title: 'Contato cadastrado com sucesso',
      });
      router.push('/contatos');
    } else {
      toast({
        title: error,
      });
    }
  };

  return (
    <form className="form-register" onSubmit={handleSubmit}>
      <div>
        <div className="container-contact">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            placeholder="Digite seu endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
          <br />
        </div>
        <div>
          <button type="submit" className="button">
            Cadastrar
          </button>
        </div>
      </div>
    </form>
  );
}
