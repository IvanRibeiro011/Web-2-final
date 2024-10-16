'use server'
import apiError from "@/functions/api-error";
import { CELLPHONES_GET } from "@/functions/api/api-cell-phone";
import { cookies } from "next/headers";

export default async function cellPhones(id: number) {
  const { url } = CELLPHONES_GET();

  try {
    const tokenCookie = cookies().get("token")?.value;
    if (!tokenCookie) {
      throw new Error("Token not found");
    }

    const { token } = JSON.parse(tokenCookie);

    const response = await fetch(url + `/${id}` , {
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
