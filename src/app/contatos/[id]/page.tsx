"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./style.css";
import contactGet from "@/actions/get-contact";
import cellPhones from "@/actions/get-cell-phones";
import { useToast } from "@/hooks/use-toast";
import newCellPhone from "@/actions/new-cell-phones";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/contatos/loading";

type ContactId = {
  params: {
    id: number;
  };
};

export type CellPhone = {
  numeros: string[];
  contatoId: number;
};

export type CellPhones = {
  id: number;
  numero: string;
};

export default function ContactId({ params }: ContactId) {
  const [contact, setContact] = useState<any>(null);
  const [phones, setPhones] = useState<string[]>([]);
  const [newPhone, setNewPhone] = useState<string>("");
  const [cellPhonesData, setCellPhonesData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [error, setError] = useState<string>("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getContact() {
      setLoading(true);
      const { data, ok, error } = await contactGet(params.id);

      if (ok) {
        setContact(data);
        setLoading(false);
      } else {
        toast({ title: error });
        setLoading(false);
      }
    }
    getContact();

    async function getCellPhones() {
      const { data, ok, error } = await cellPhones(params.id);
      if (ok) {
        setCellPhonesData(data);
        setLoading(false);
      } else {
        toast({ title: error });
        setLoading(false);
      }
    }
    getCellPhones();
  }, []);

  useEffect(() => {

    async function getCellPhones() {
      const { data, ok, error } = await cellPhones(params.id);
      if (ok) {
        setCellPhonesData(data);
        setLoading(false);
      } else {
        toast({ title: error });
        setLoading(false);
      }
    }
    getCellPhones();
  }, [count])

  const validatePhone = (phone: string) => {
    const isNumber = /^\d+$/.test(phone);
    const lengthValid = phone.length >= 9 && phone.length <= 15;
    if (!isNumber) {
      return "O telefone deve conter apenas números.";
    }
    if (!lengthValid) {
      return "O telefone deve ter entre 9 e 15 dígitos.";
    }
    return "";
  };

  const handleAddPhone = () => {
    const validationError = validatePhone(newPhone);
    if (validationError) {
      setError(validationError);
      return;
    }
    setPhones([...phones, newPhone]);
    setNewPhone("");
    setError(""); 
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cellPhone: CellPhone = {
      contatoId: Number(params.id).valueOf(),
      numeros: phones,
    };

    const { ok, error } = await newCellPhone(cellPhone);
    if (ok) {
      toast({ title: "Telefones enviados com sucesso!" });
      setPhones([]);
      setCount(count + 1);
    } else {
      toast({ title: error });
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main>
      <div className="main-container">
        <div className="header-section">
          <h1>{contact?.nome}</h1>
          <Link href="/contatos" className="button-tertiary">
            Voltar
          </Link>
        </div>
        <div className="content-section">
          <div className="contacts">
            <p>Email: {contact?.email}</p>
            <p>Endereço: {contact?.endereco}</p>
          </div>
          <div className="cellphones">
            <h2>Telefones cadastrados</h2>
            <div className="list-display list-display-cellphone">
              {Array.isArray(cellPhonesData) && cellPhonesData.length > 0 ? (
                cellPhonesData.map((cellPhoneData: any) => (
                  <p key={cellPhoneData.id}>{cellPhoneData.numero}</p>
                ))
              ) : (
                <p>Nenhum telefone cadastrado</p>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-section">
              <h2>Adicionar Telefones</h2>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="Digite o telefone"
                className="text-input"
              />
              <button
                type="button"
                className="button-primary"
                onClick={handleAddPhone}
              >
                Adicionar telefone
              </button>

              {error && <p className="error-message">{error}</p>}

              <div className="list-display">
                {phones.length > 0 ? (
                  phones.map((phone, index) => <p key={index}>{phone}</p>)
                ) : (
                  <p>Nenhum telefone adicionado ainda</p>
                )}
              </div>
            </div>
            <button type="submit" className="button-secondary">
              Enviar Telefones
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
