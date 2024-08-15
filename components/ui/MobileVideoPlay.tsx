import { useScript } from "deco/hooks/useScript.ts";

export default function MobileVideoPlay() {
  const goToItem = (index: number) => {
    const mobilePlayButton = document.getElementById("mobilePlayButton");

    const ATTRIBUTES = {
      "data-slider": "data-slider",
      "data-slider-item": "data-slider-item",
      'data-slide="prev"': 'data-slide="prev"',
      'data-slide="next"': 'data-slide="next"',
      "data-dot": "data-dot",
    };

    mobilePlayButton?.addEventListener("click", () => {
      const root = document.getElementById("files-slider");
      const items = root?.querySelectorAll(
        `[${ATTRIBUTES["data-slider-item"]}]`,
      );

      const slider = root?.querySelector<HTMLElement>(
        `[${ATTRIBUTES["data-slider"]}]`,
      );

      if (!items || !slider) return;

      // as any are ok in typeguard functions
      const isHTMLElement = (x: Element): x is HTMLElement =>
        // deno-lint-ignore no-explicit-any
        typeof (x as any).offsetLeft === "number";

      const item = items.item(index);

      if (!isHTMLElement(item)) {
        console.warn(
          `Element at index ${index} is not an html element. Skipping carousel`,
        );

        return;
      }

      slider.scrollTo({
        top: 0,
        behavior: "smooth",
        left: item.offsetLeft - slider.offsetLeft,
      });
    });
  };

  return (
    <>
      <button
        id="mobilePlayButton"
        aria-label="go to slider item 2"
        class="absolute flex flex-col md:hidden gap-1 z-[4] bottom-3 left-2"
      >
        <svg
          class="playIcon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 30.5 32"
          style="enable-background:new 0 0 30.5 32;"
          xml:space="preserve"
          width="30.5"
          height="32"
        >
          <circle class="st9" cx="15.4" cy="16.9" r="14.3" fill="#565657">
          </circle>
          <polygon
            class="st8"
            points="22,16.9 12.7,11.5 12.7,22.2 "
            fill="#FFFFFF"
          >
          </polygon>
        </svg>
      </button>

      <script
        defer
        dangerouslySetInnerHTML={{ __html: useScript(goToItem, 1) }}
      />
    </>
  );
}
