import { parseCookie } from "apps/vtex/utils/vtexId.ts";
import { createGraphqlClient } from "apps/utils/graphql.ts";
import { fetchSafe } from "apps/vtex/utils/fetchVTEX.ts";

interface User {
  document?: string;
}

async function loader(
  _props: unknown,
  req: Request,
): Promise<{ document?: string } | null> {
  const io = createGraphqlClient({
    endpoint:
      `https://novaabracasa.vtexcommercestable.com.br/api/io/_v/private/graphql/v1`,
    fetcher: fetchSafe,
  });

  const { cookie } = parseCookie(req.headers, "novaabracasa");

  const query = "query getUserProfile { profile { document } }";

  try {
    const { profile: user } = await io.query<{ profile: User }, null>(
      { query },
      { headers: { cookie } },
    );

    return {
      document: user.document,
    };
  } catch (_) {
    return null;
  }
}

export default loader;
