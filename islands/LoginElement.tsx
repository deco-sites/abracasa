import { useUser } from "apps/vtex/hooks/useUser.ts";
import Icon from "$store/components/ui/Icon.tsx";

import { sendEvent } from "$store/sdk/analytics.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/compat";

export default function LoginElement() {
  const { user } = useUser();

  useEffect(() => {
    if (!user.value) return;

    const { email, name } = user.value;

    if (IS_BROWSER && globalThis.window.dataLayer) {
      const dataLayer = globalThis.window.dataLayer as Array<
        { event?: string }
      >;

      const hasUserInfoEvent = dataLayer.some(
        (item) => item.event === "user_info",
      );

      if (!hasUserInfoEvent) {
        sendEvent({
          name: "user_info",
          params: {
            email,
            name,
          },
        });
      }
    }
  }, [user.value]);

  return (
    <a
      href={user.value ? "/user-myaccount" : "/login?ReturnUrl=%2F_secure%2Faccount "}
      class="inline-flex items-center gap-1 text-xs"
      aria-label="Log in"
    >
      <Icon
        id="UserIcon"
        width={32}
        height={32}
        alt="User icon"
      />
      <span class="truncate tracking-[0.05em]">
        {user.value ? (user.value.givenName ?? "Conta") : "Entrar"}
      </span>
    </a>
  );
}
