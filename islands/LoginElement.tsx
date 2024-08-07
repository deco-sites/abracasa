import { useUser } from "apps/vtex/hooks/useUser.ts";
import Icon from "deco-sites/abracasa/components/ui/Icon.tsx";

export default function LoginElement() {
  const { user } = useUser();

  return (
    <a
      href={user.value ? "/logout" : "/login"}
      class="inline-flex items-center gap-1 text-xs"
      aria-label="Log in"
    >
      <Icon
        id="UserIcon"
        width={32}
        height={32}
        alt="User icon"
      />
      <span>
        {user.value ? "Sair" : "Entrar"}
      </span>
    </a>
  );
}
