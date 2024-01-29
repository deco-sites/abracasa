export interface Props {
  productsCount?: number;
}

export default function SearchTitle({ productsCount }: Props) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const search = urlSearchParams.get("q");

  if (!search) return null;

  return (
    <div class="leading-[33px] text-[#828282] text-2xl container mx-auto px-4 mt-4">
      {productsCount ?? 0} produtos encontrados para: <b>"{search}"</b>
    </div>
  );
}
