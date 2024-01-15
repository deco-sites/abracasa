import { headerHeight } from "$store/components/header/constants.ts";
import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";
import DesktopSearchbar from "$store/components/search/DesktopSearchbar.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  searchbar?: SearchbarProps;
  type?: "mobile" | "desktop";
}

function SearchbarModal({ searchbar, type = "desktop" }: Props) {
  const { displaySearchPopup } = useUI();

  if (!searchbar) {
    return null;
  }

  if (type === "mobile") {
    return (
      <Modal
        loading="lazy"
        open={displaySearchPopup.value}
        onClose={() => displaySearchPopup.value = false}
      >
        <div
          class="absolute top-0 bg-base-100 container"
          style={{ marginTop: headerHeight }}
        >
          <Searchbar {...searchbar} />
        </div>
      </Modal>
    );
  }

  return (
    <div class="w-full lg:max-w-[600px]">
      <DesktopSearchbar {...searchbar} />
    </div>
  );
}

export default SearchbarModal;
