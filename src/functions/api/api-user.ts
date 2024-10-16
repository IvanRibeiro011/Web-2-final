
export const API_URL = 'http://localhost:8080/usuario';

export function USER_POST() {
  return {
    url: API_URL + "/salvar"
  };
}

export function LOGIN_POST() {
  return {
    url: API_URL + "/login"
  };
}

export function USER_GET() {
  return {
    url: API_URL
  };
}

export function USER_ALTER_PASSWORD() {
  return {
    url: API_URL + "/atualizar-senha"
  };
}

