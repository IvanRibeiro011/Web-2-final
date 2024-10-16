export const API_URL = 'http://localhost:8080/telefone';

export function CELLPHONE_POST() {
  return {
    url: API_URL + "/salvar"
  };
}

export function CELLPHONES_GET() {
  return {
    url: API_URL + "/contato"
  };
}