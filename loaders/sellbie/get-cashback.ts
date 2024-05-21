import { AppContext } from "$store/apps/site.ts";
import type { Secret } from "apps/website/loaders/secret.ts";

export interface Props {
  storeToken: Secret;
  cpf: string;
}

async function fetchAuthToken(
  storeToken: Secret,
  ctx: AppContext,
): Promise<string | null> {
  try {
    const response = await ctx.invoke["deco-sites/abracasa"].loaders.sellbie
      ["get-auth-token"]({ storeToken });
    return response?.resultado.accessToken || null;
  } catch (error) {
    console.error("Failed to fetch auth token:", error);
    return null;
  }
}

async function fetchCashback(token: string, cpf: string) {
  try {
    const response = await fetch(
      "https://motor.sellbie.com.br/api/cashback/obtersaldocashback",
      {
        method: "POST",
        body: JSON.stringify(cpf),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cashback: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch cashback:", error);
    throw error;
  }
}

export default async function SellbieCashback(
  { storeToken, cpf }: Props,
  _req: Request,
  ctx: AppContext,
) {
  const token = await fetchAuthToken(storeToken, ctx);

  if (!token) {
    throw new Error("Unable to obtain auth token.");
  }

  const cashback = await fetchCashback(token, cpf);

  return cashback;
}
