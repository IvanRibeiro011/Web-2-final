'use server'
import apiError from "@/functions/api-error";
import { USER_GET } from "@/functions/api/api-user";
import { cookies } from "next/headers";

export default async function userGet() {
  const { url } = USER_GET();

  try {
    const tokenCookie = cookies().get("token")?.value;
    if (!tokenCookie) {
      throw new Error("Token not found");
    }

    const { token, userId } = JSON.parse(tokenCookie);

    const response = await fetch(url + "/" + userId, {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
      cache: "no-store"
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();

    return { data, ok: response.ok, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
