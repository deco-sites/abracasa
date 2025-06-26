import { useUser } from "apps/vtex/hooks/useUser.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuProps } from "deco-sites/abracasa/components/header/Header.tsx";

export interface Props {
  items: MenuProps[];
}

function MenuItem({ item }: { item: MenuProps }) {
  const component = item?.children?.length
    ? (
      <div class="collapse collapse-plus">
        <input type="checkbox" />
        <div class="collapse-title min-h-0 p-0 py-2.5 font-bold text-sm px-4 flex items-center justify-between text-[#585858] hover:text-[#b9154c] duration-300 transition-colors">
          {item.name}
        </div>
        <div class="collapse-content px-0">
          <div class="px-0 pb-2">
            <a class="pb-[14px] pl-4 text-[#A5A5A5] font-bold text-[12px]" href={item.url}>+ Ver Tudo</a>
            {item.children?.map(({ name, url }) => (
              <ul class="pl-4 gap-1">
                <li>
                  <a
                    href={url}
                    class="w-full block font-normal text-sm text-[#585858] py-0.5 leading-[48px] hover:font-bold"
                  >
                    {name}
                  </a>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    )
    : (
      <a
        href={item.url}
        title={item.name}
        class="px-4 pt-2.5 text-xs font-bold text-[#b9154c] leading-[46px]"
      >
        {item.name}
      </a>
    );
    if (item.activeStyle && item?.children?.length) {
      return (
        <div>
         {item.children?.map(({ name, url }) => (
              <ul class="pl-4 gap-1">
                <li>
                  <a
                    href={url}
                    class="w-full block font-semibold text-sm text-[#585858] py-0.5 leading-[48px] hover:font-bold"
                  >
                    {name}
                  </a>
                </li>
              </ul>
            ))}
        </div>
      )
    }

  return component;
}

function Menu({ items }: Props) {
  const { user } = useUser();

  return (
    <div class="flex flex-col h-full max-h-full overflow-y-scroll">
      <ul class="flex flex-col py-2 gap-2">
        <li class="flex flex-col gap-4 pb-2">
          <a
            class="flex items-center gap-4 px-4"
            href="/user-login "
          >
            <Icon
              id="UserIcon"
              width={32}
              height={32}
              alt="User icon"
              class="group-hover:text-firebrick"
            />
            <p class="text-sm font-semibold">
              <span>
                <a href={user.value ? "/logout" : "/user-login "}>
                  {user.value ? "Sair " : "Entrar "}
                </a>
                ou {" "}
                {user.value ? `${user.value.email}` : "Registrar"}
              </span>
            </p>
          </a>

          <a
            href={`${
              user.value
                ? "/user-myaccount"
                : "login?ReturnUrl=%2F_secure%2Faccount "
            }`}
            class="pl-16 uppercase text-sm font-light text-[#585858]"
          >
            Minha Conta
          </a>
          <a
            href={`${
              user.value
                ? "/user-orders"
                : "login?ReturnUrl=%2F_secure%2Faccount "
            }`}
            class="pl-16 uppercase text-sm font-light text-[#585858]"
          >
            Meus Pedidos
          </a>
        </li>

        {
          /* <li class="border-t">
          <a
            class="flex items-center gap-4 px-4 py-3"
            href="/wishlist"
          >
            <Icon id="Heart" size={32} strokeWidth={0.75} fill="none" />
            <span class="text-sm">favoritos</span>
          </a>
        </li> */
        }
      </ul>

      <ul class="flex-grow flex flex-col">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
