'use server'
import apiError from "@/functions/api-error";
import { CONTACTS_GET } from "@/functions/api/api-contact";
import { cookies } from "next/headers";

export default async function contactsGet() {
  const { url } = CONTACTS_GET();

  try {
    const tokenCookie = cookies().get("token")?.value;
    if (!tokenCookie) {
      throw new Error("Token not found");
    }

    const { token, userId } = JSON.parse(tokenCookie);

    const response = await fetch(url + "/usuario/" + userId, {
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

    return {data, ok: response.ok, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
