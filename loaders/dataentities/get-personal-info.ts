import { getCookies } from "std/http/mod.ts";

export interface Props {
  email: string;
}

export type APIResponse = [
  { document: string | null },
];

export default async function getPersonalInfo(
  props: Props,
  req: Request,
): Promise<string | null> {
  const { email } = props;
  const cookies = getCookies(req.headers);
  const cookie = cookies["VtexIdclientAutCookie_novaabracasa"];

  const requestOptions = {
    method: "GET",
    headers: {
      "Accept": "application/vnd.vtex.ds.v10+json",
      "Content-Type": "application/json",
      "VtexIdclientAutCookie": cookie,
    },
  };

  const response = await fetch(
    `https://novaabracasa.vtexcommercestable.com.br/api/dataentities/CL/search?email=${email}&_fields=document`,
    requestOptions,
  ).then((res) => res.json()) as APIResponse;

  return response?.[0]?.document;
}
