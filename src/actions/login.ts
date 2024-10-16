'use server'
import apiError from "@/functions/api-error";
import { LOGIN_POST } from "@/functions/api/api-user";
import { cookies } from "next/headers";

export type Login = {
  email: string;
  senha: string;
}

export default async function loginPost(login: Login) {
  const { url } = LOGIN_POST();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    });

    
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const data = await response.json();
    cookies().set("token", JSON.stringify({ token: data.token, userId: data.usuario.id}), {
      httpOnly: true,
      secure: true
    })

    return {ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
