/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useAutocomplete } from "$store/hooks/useAutocomplete.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useEffect, useRef } from "preact/compat";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch: setQuery, suggestions, loading } = useAutocomplete();
  const { products = [], searches = [] } = suggestions.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  return (
    <div
      class="w-full grid gap-8 px-4 py-6 max-h-full"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form id={id} action={action} class="join">
        <Button
          type="submit"
          class="join-item btn-square"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01} />}
        </Button>
        <input
          ref={searchInputRef}
          id="search-input"
          class="input input-bordered join-item flex-grow"
          name={name}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setQuery(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />
        <Button
          type="button"
          class="join-item btn-ghost btn-square hidden sm:inline-flex"
          onClick={() => displaySearchPopup.value = false}
        >
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button>
      </form>

      <div
        class={`${!hasProducts && !hasTerms ? "hidden" : ""}`}
      >
        <div class="gap-4 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[150px_1fr]">
          <div class="flex flex-col gap-6">
            <span
              class="font-medium text-xl"
              role="heading"
              aria-level={3}
            >
              Sugestões
            </span>
            <ul id="search-suggestion" class="flex flex-col gap-6">
              {searches.map(({ term }) => (
                <li>
                  <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                    <span>
                      <Icon
                        id="MagnifyingGlass"
                        size={24}
                        strokeWidth={0.01}
                        loading="lazy"
                      />
                    </span>
                    <span
                      class="capitalize"
                      dangerouslySetInnerHTML={{ __html: term }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-col pt-6 md:pt-0 gap-3">
            <span
              class="font-medium text-xl"
              role="heading"
              aria-level={3}
            >
              Produtos sugeridos
            </span>
            <div class="flex flex-col pt-6 pb-2 gap-2">
              {products?.map(({ isVariantOf, image: images, url }) => {
                const [front] = images ?? [];

                return (
                  <a
                    href={url || "#"}
                    class="flex items-center w-full h-full gap-3"
                  >
                    <Image
                      src={front.url || ""}
                      alt={front.alternateName}
                      width={60}
                      height={60}
                      loading="lazy"
                      decoding="async"
                      preload={false}
                    />

                    <h2
                      class="truncate text-black uppercase font-semibold text-xs pt-1.5"
                      dangerouslySetInnerHTML={{
                        __html: isVariantOf?.name ?? name ??
                          "",
                      }}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
