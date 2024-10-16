'use server'
import apiError from "@/functions/api-error";
import { CONTACT_POST } from "@/functions/api/api-contact";

import { cookies } from "next/headers";

export type NewContact = {
  nome: string;
  email: string;
  endereco: string;
  usuarioId: number;
}

export default async function userPost(contato: NewContact) {
  const { url } = CONTACT_POST();

  const tokenCookie = cookies().get("token")?.value;
  if (!tokenCookie) {
    throw new Error("Token not found");
  }

  const { token, userId } = JSON.parse(tokenCookie);
  contato.usuarioId = userId;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(contato),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    return {ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
