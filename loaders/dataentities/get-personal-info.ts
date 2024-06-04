import { AppContext } from "apps/vtex/mod.ts";
import { parseCookie } from "apps/vtex/utils/vtexId.ts";

export interface Props {
  email: string;
}

export type APIResponse = [
  { document: string | null },
];

export default async function getPersonalInfo(
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<string | null> {
  const { email } = props;
  const { cookie } = parseCookie(req.headers, ctx.account);

  const requestOptions = {
    method: "GET",
    headers: {
      "Accept": "application/vnd.vtex.ds.v10+json",
      "Content-Type": "application/json",
      cookie,
    },
  };

  const response = await fetch(
    `https://abracasa.vtexcommercestable.com.br/api/dataentities/CL/search?_where=email=${email}&_fields=document`,
    requestOptions,
  ).then((res) => res.json()) as APIResponse;

  return response?.[0]?.document;
}
