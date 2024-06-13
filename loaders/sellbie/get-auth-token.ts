export type APIResponse = {
  sucesso: boolean;
  resultado: {
    accessToken: string;
    dtCriacao: string;
    dtValidade: string;
    roleId: number;
  };
};

export default async function AuthorizationToken(): Promise<
  APIResponse | null
> {
  try {
    const response = await fetch("https://motor.sellbie.com.br/api/Auth", {
      method: "POST",
      body: JSON.stringify({ token: "AV5LWI1P9GR" }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to authenticate: ${response.statusText}`);
    }

    const data = await response.json() as APIResponse;

    if (!data.sucesso) {
      throw new Error("Authentication failed.");
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch authorization token:", error);
    return null;
  }
}
