import { useUser } from "apps/vtex/hooks/useUser.ts";
import Icon from "$store/components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  items: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  const component = item?.children?.length
    ? (
      <div class="collapse collapse-arrow">
        <input type="checkbox" />
        <div class="collapse-title min-h-0 p-0 py-2.5 font-bold text-xs px-4 flex items-center justify-between text-black hover:text-[#b9154c] duration-300 transition-colors">
          {item.name}
        </div>
        <div class="collapse-content px-0">
          <div class="px-0 bg-[#b9154c] py-2">
            {item.children?.map(({ name, url }) => (
              <ul class="pl-4 gap-1">
                <li>
                  <a
                    href={url}
                    class="w-full block font-normal text-sm text-white py-0.5 leading-[48px] hover:font-bold"
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
            href="/login"
          >
            <Icon
              id="UserIcon"
              width={32}
              height={32}
              alt="User icon"
              class="group-hover:text-firebrick"
            />
            <p class="text-sm">
              <span>
                OLÁ {user.value ? `${user.value.email}` : "registrar"} |{" "}
                <a href={user.value ? "/logout" : "/login"}>
                  {user.value ? "sair" : "entrar"}
                </a>
              </span>
            </p>
          </a>

          <a href="/account" class="pl-16 uppercase text-sm">Minha Conta</a>
          <a href="/account#/orders" class="pl-16 uppercase text-sm">
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

        <li class="border-y">
          <a
            class="flex items-center gap-4 px-4 py-3"
            href="/institucional/nossas-lojas"
          >
            <Icon
              id="OurStores"
              width={32}
              height={32}
              alt="Store icon"
              class="group-hover:text-firebrick"
            />
            <span class="text-sm">Nossas lojas</span>
          </a>
        </li>
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
