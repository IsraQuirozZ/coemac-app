const API_URL = "http://192.168.1.25:3000/api"; // Isra
// const API_URL = "http://192.168.0.14:3000/api"; // Cordova

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

export const verifyEmailRequest = async (token: string) => {
  const response = await fetch(`${API_URL}/auth/verify-email?token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || errorData.errors?.[0] || "Error verifying email",
    );
  }

  return response.json();
};

export const forgotPasswordRequest = async (identifier: string) => {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || errorData.errors?.[0] || "Error processing request",
    );
  }

  return response.json();
};

export const resetPasswordRequest = async (
  token: string,
  newPassword: string,
) => {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message ||
        errorData.errors?.[0] ||
        "Error al actualizar contraseña",
    );
  }

  return response.json();
};
