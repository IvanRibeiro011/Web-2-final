"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import contactsGet from "@/actions/get-contacts";
import "./style.css";
import Link from "next/link";
import Loading from "@/app/contatos/loading";
import cellPhones from "@/actions/get-cell-phones";

export default function Contacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [cellPhonesData, setCellPhonesData] = useState<any>({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Estado para controlar qual painel está ativo

  useEffect(() => {
    async function getContacts() {
      const { data, ok, error } = await contactsGet();

      if (ok) {
        setContacts(data);
      }
    }
    getContacts();
  }, []);

  async function getCellPhones(id: number) {
    setLoading(true); 
    const { data, ok, error } = await cellPhones(id);
    if (ok) {
      setCellPhonesData((prev: any) => ({ ...prev, [id]: data })); 
    }
    setLoading(false); 
  }

  const handleToggle = (index: number) => {
    if (activeIndex !== index) {
      getCellPhones(contacts[index].id); 
    }
    setActiveIndex(index); 
  };

  return (
    <Accordion allowMultiple className="accordion">
      {contacts.length > 0 ? (
        contacts.map((contact: any, index: number) => (
          <AccordionItem key={contact.id} className="accordion-item">
            <h2>
              <AccordionButton className="accordion-button" onClick={() => handleToggle(index)}>
                <div>
                  <Box as="span" flex="1" textAlign="left">
                    {contact.nome}
                  </Box>
                  <Box as="span" flex="1" textAlign="left">
                    Email: {contact.email}
                  </Box>
                  <Box as="span" flex="1" textAlign="left">
                    Endereço: {contact.endereco}
                  </Box>
                </div>
                <Box className="box-accordion">
                  <Link href={`/contatos/${contact.id}`} className="button-accordion">
                    Adicionar telefone
                  </Link>
                  <AccordionIcon className="accordion-icon" />
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} className="accordion-painel">
              <h2>Telefones:</h2>
              {cellPhonesData[contact.id]?.length > 0 ? (
                cellPhonesData[contact.id].map((cellPhone: any) => (
                  <Box key={cellPhone.id} mb={2}>
                    {cellPhone.numero}
                  </Box>
                ))
              ) : (
                <Box>Nenhum telefone cadastrado.</Box>
              )}
            </AccordionPanel>
          </AccordionItem>
        ))
      ) : (
        <Box className="no-contacts">Nenhum contato encontrado.</Box>
      )}
    </Accordion>
  );
}
