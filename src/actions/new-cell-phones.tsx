'use server'
import apiError from "@/functions/api-error";
import { CELLPHONE_POST } from "@/functions/api/api-cell-phone";

import { cookies } from "next/headers";

type CellPhone = {
  numeros: string[],
  contatoId: number 
}

export default async function newCellPhone(cellPhone: CellPhone) {
  const { url } = CELLPHONE_POST();

  const tokenCookie = cookies().get("token")?.value;
  if (!tokenCookie) {
    throw new Error("Token not found");
  }

  const { token } = JSON.parse(tokenCookie);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(cellPhone),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    return {ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
