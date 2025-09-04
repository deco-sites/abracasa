import Avatar from "$store/components/ui/Avatar.tsx";

interface Props {
  value: string;
  link?: string;
  isActive: boolean;
}

export default function VariantButton({ value, link, isActive }: Props) {
  const handleClick = () => {
    if (!link) return;

    try {
      const skuId = new URL(link, window.location.origin).searchParams.get(
        "skuId"
      );
      if (skuId) {
        window.history.replaceState({}, "", `?skuId=${skuId}`);
        console.log("Selecionou SKU:", skuId);
      }
    } catch (err) {
      console.warn("Link inválido:", link, err);
    }
  };

  return (
    <button f-partial={link} f-client-nav onClick={handleClick}>
      <Avatar content={value} variant={isActive ? "active" : "default"} />
    </button>
  );
}
