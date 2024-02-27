import { asset } from "$fresh/runtime.ts";

import { useUser } from "apps/vtex/hooks/useUser.ts";

export default function LoginElement() {
  const { user } = useUser();

  return (
    <div class="inline-flex items-center gap-1 group text-xs">
      <img
        src={asset("/image/user.svg")}
        width={32}
        height={32}
        alt="User icon"
        class="group-hover:text-firebrick"
      />
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
    </div>
  );
}
