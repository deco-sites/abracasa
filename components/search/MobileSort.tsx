import { StateUpdater, useEffect, useRef } from "preact/hooks";

import Sort from "$store/components/search/Sort.tsx";

import { ProductListingPage } from "apps/commerce/types.ts";

export type Props = Pick<ProductListingPage, "sortOptions"> & {
  sortParam?: "legacy" | "intelligent";
};

export default function MobileSort(
  { sortOptions, sortParam, setOpen }: Props & { setOpen: StateUpdater<boolean> },
) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current && !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <div
        class="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[9999999]"
        onClick={() => setOpen(false)}
      />

      <div
        ref={modalRef}
        class="block w-full fixed bottom-0 left-0 z-[99999999] h-[45%] bg-white border-t move-to-up"
      >
        <div class="flex flex-col gap-4 items-center justify-center w-full h-full overflow-y-scroll py-1">
          <Sort sortParam={sortParam} sortOptions={sortOptions} isMobile={true} />
        </div>
      </div>
    </>
  );
}
