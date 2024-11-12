import { AppContext } from "$store/apps/site.ts";

export type CashbackAPIResponse = {
  "resultado": {
    "SaldoTotalDisponivel": number | null;
    "SaldoTotalAcumulado": number | null;
    "CashbackTotalPendente": number | null;
  } | null;
};

export interface Props {
  cpf: string;
}

async function fetchAuthToken(
  ctx: AppContext,
): Promise<string | null> {
  try {
    const response = await ctx.invoke["site"].loaders.sellbie
      ["get-auth-token"]();
    return response?.resultado?.accessToken || null;
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

    const cashback = await response.json() as CashbackAPIResponse;

    return cashback;
  } catch (error) {
    console.error("Failed to fetch cashback:", error);
    throw error;
  }
}

export default async function SellbieCashback(
  { cpf }: Props,
  _req: Request,
  ctx: AppContext,
) {
  const token = await fetchAuthToken(ctx);

  if (!token) {
    throw new Error("Unable to obtain auth token.");
  }

  const cashback = await fetchCashback(token, cpf);

  return cashback;
}
