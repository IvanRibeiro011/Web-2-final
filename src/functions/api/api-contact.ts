export const API_URL = 'http://localhost:8080/contato';

export function CONTACT_POST() {
  return {
    url: API_URL + "/salvar"
  };
}

export function CONTACTS_GET() {
  return {
    url: API_URL 
  };
}

export function CONTACT_GET() {
  return {
    url: API_URL 
  };
}