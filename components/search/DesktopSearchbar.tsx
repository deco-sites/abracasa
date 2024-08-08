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

import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { useEffect, useRef, useState } from "preact/compat";

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

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  loader,
}: Props) {
  const id = useId();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};

  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const notFound = !hasProducts && !hasTerms &&
    (searchInputRef.current && searchInputRef.current.value.length > 0);

  const searchTerm = searchInputRef.current ? searchInputRef.current.value : "";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modal.current && !modal.current.contains(event.target as HTMLElement) &&
        (searchInputRef.current !== event.target as HTMLInputElement)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal, searchTerm]);

  return (
    <div class="flex-grow flex flex-col relative z-[70]">
      <form
        id="search-form"
        action={action}
        class="flex flex-grow relative h-[40px] px-2 border border-white group-hover/nav:border-black group-data-[scrolling='true']/nav:border-black"
      >
        <input
          ref={searchInputRef}
          id="input-form"
          class="flex-grow w-[80%] outline-none placeholder-shown:sibling:hidden placeholder:text-sm text-sm placeholder:text-white group-hover/nav:placeholder:text-gray-dark text-white group-hover/nav:text-gray-dark group-data-[scrolling='true']/nav:text-gray-dark group-data-[scrolling='true']/nav:placeholder:text-gray-dark bg-transparent"
          aria-label="Barra de pesquisa"
          aria-expanded={showSuggestions ? "true" : "false"}
          name={name}
          defaultValue=""
          onClick={() => setShowSuggestions(true)}
          onFocus={() => setShowSuggestions(true)}
          onInput={(e) => {
            setShowSuggestions(true);
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

        <button
          type="submit"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : (
              <Icon
                id="MagnifyingGlass"
                size={24}
                strokeWidth={0.01}
                fill="none"
                class="text-white group-hover/nav:text-gray-dark group-data-[scrolling='true']/nav:text-gray-dark transition duration-150 ease-in"
              />
            )}
        </button>
      </form>

      {showSuggestions && (
        <div
          ref={modal}
          class="flex flex-col w-full gap-6 absolute flex-grow top-10 lg:top-[52px] px-[15px] pt-2 lg:pt-0 rounded-md max-h-[525px] bg-white lg:shadow-lg overflow-y-auto z-[9999999]"
        >
          {notFound
            ? (
              <span
                class="py-2"
                role="heading"
                aria-level={3}
              >
                Sem sugestões
              </span>
            )
            : (
              <>
                <div
                  class={hasProducts
                    ? "flex flex-col pt-6 pb-2.5 md:pt-1 gap-6 lg:pl-3"
                    : "hidden"}
                >
                  {products?.map(({ isVariantOf, image: images, url }) => {
                    const [front] = images ?? [];

                    return (
                      <a
                        href={url || "#"}
                        class="flex items-center w-full h-full gap-3"
                      >
                        <Image
                          src={front.url?.replace("-25-25", "-60-60") || ""}
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
              </>
            )}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
