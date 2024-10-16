'use server'
import apiError from "@/functions/api-error";
import { USER_POST } from "@/functions/api/api-user";

export type User = {
  nome: string;
  email: string;
  senha: string;
}

export default async function userPost(user: User) {
  const { url } = USER_POST();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
