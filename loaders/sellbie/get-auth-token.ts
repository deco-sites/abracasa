import type { Secret } from "apps/website/loaders/secret.ts";

export interface Props {
  storeToken: Secret;
}

export type APIResponse = {
  "sucesso": boolean;
  "resultado": {
    "accessToken": string;
    "dtCriacao": string;
    "dtValidade": string;
    "roleId": number;
  };
};

export default async function AuthorizationToken(
  { storeToken }: Props,
): Promise<APIResponse | null> {
  const token = storeToken?.get?.();

  if (!token) return null;

  const accessToken: APIResponse = await fetch(
    "https://motor.sellbie.com.br/api/Auth",
    {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then((data) => data.json());

  return accessToken;
}
