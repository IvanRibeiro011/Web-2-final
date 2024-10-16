'use server'
import apiError from "@/functions/api-error";
import { USER_ALTER_PASSWORD } from "@/functions/api/api-user";
import { cookies } from "next/headers";

export type NewPassword = {
  email: string;
  senha: string;
  novaSenha: string;
}

export default async function newPassword(user: NewPassword) {
  const { url } = USER_ALTER_PASSWORD();

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
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    return {ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
