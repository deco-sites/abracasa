import { asset } from "$fresh/runtime.ts";

import { useUser } from "apps/vtex/hooks/useUser.ts";

export default function LoginElement() {
  const { user } = useUser();

  return (
    <span>
      <a
        href={user.value ? "/logout" : "/login"}
        aria-label="Log in"
      >
        {user.value ? "sair" : "entrar"}
      </a>

      <br />

      <a
        href={user.value ? "/account#/orders" : "/login"}
      >
        meus pedidos
      </a>
    </span>
  );
}
