import { Secret } from "apps/website/loaders/secret.ts";

export interface Props {
  email: string;
  appKey: Secret;
  appToken: Secret;
}

export type APIResponse = [
  { document: string | null },
];

export default async function getPersonalInfo(
  props: Props,
): Promise<string | null> {
  const { email } = props;

  const appKey = await props?.appKey?.get?.();
  const appToken = await props?.appKey?.get?.();

  if (!appKey || !appToken) return null;

  const requestOptions = {
    method: "GET",
    headers: {
      "Accept": "application/vnd.vtex.ds.v10+json",
      "Content-Type": "application/json",
      "X-VTEX-API-AppKey": appKey,
      "X-VTEX-API-AppToken": appToken,
    },
  };

  const response = await fetch(
    `https://novaabracasa.vtexcommercestable.com.br/api/dataentities/CL/search?email=${email}&_fields=document`,
    requestOptions,
  ).then((res) => res.json()) as APIResponse;

  return response?.[0]?.document;
}
