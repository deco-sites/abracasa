import { AppContext } from "$store/apps/site.ts";
import type { Secret } from "apps/website/loaders/secret.ts";

export interface Props {
  storeToken: Secret;
  cpf: string;
}

export default async function SellbieCashback(
  { storeToken, cpf }: Props,
  _req: Request,
  ctx: AppContext,
) {
  let token = null;

  if (!token) {
    token = await ctx.invoke["deco-sites/abracasa"].loaders.sellbie
      ["get-auth-token"]({ storeToken }).then((response) =>
        response?.resultado.accessToken
      );
  }

  const cashback = await fetch(
    "https://motor.sellbie.com.br/api/cashback/obtersaldocashback",
    {
      method: "POST",
      body: JSON.stringify(cpf),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    },
  ).then((data) => data.json());

  return cashback;
}
