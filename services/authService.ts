// const API_URL = "http://192.168.1.16:3000/api";
//const API_URL = "http://192.168.1.137:3000/api";
const API_URL = "http://192.168.0.14:3000/api";

type LoginResponse = {
  token: string;
};

type RegisterData = {
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  password: string;
};

export const loginRequest = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message ||
        errorData.errors?.[0] ||
        errorData.error ||
        "Login failed",
    );
  }

  return response.json();
};

export const registerRequest = async (data: RegisterData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);

    throw new Error(
      errorData.message ||
        errorData.errors?.[0] ||
        errorData.error ||
        "Register failed",
    );
  }

  return response.json();
};
