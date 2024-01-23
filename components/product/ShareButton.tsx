import Icon from "$store/components/ui/Icon.tsx";

export default function ShareButton({ url }: { url: string }) {
  return (
    <>
      <a href="#share" aria-label="share icon">
        <Icon
          id="Share"
          size={24}
          strokeWidth={1}
          fill="none"
        />
      </a>

      <div
        class="modal z-[9999999999]"
        role="dialog"
        id="share"
        aria-label="modal"
      >
        <div class="modal-box place-items-center lg:w-[325px] border border-black/40 rounded-none bg-ice-cube">
          <span class="flex items-center justify-center text-center text-lg font-light font-univers-next-pro-light">
            compartilhar
          </span>

          <div class="flex items-center justify-center gap-1.5 mt-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              target="_blank"
              class="bg-[#3b5998] hover:bg-opacity-60 transition-opacity duration-150 text-white p-1 rounded-full shadow-lg"
              aria-label="Chat on Facebook"
            >
              <Icon id="Facebook" size={20} loading="lazy" />
            </a>

            <a
              href={`https://wa.me/?text=${url}`}
              target="_blank"
              class="bg-[#45D268] hover:bg-opacity-60 transition-opacity duration-150 text-white p-1 rounded-full shadow-lg"
              aria-label="Chat on WhatsApp"
            >
              <Icon id="WhatsApp" size={20} loading="lazy" />
            </a>

            <a
              href={`https://twitter.com/home?status=${url}`}
              target="_blank"
              class="bg-[#00aced] hover:bg-opacity-60 transition-opacity duration-150 text-white p-1 rounded-full shadow-lg"
              aria-label="Chat on Twitter"
            >
              <Icon id="Twitter" size={20} loading="lazy" />
            </a>
          </div>

          <div class="modal-action absolute top-[-15px] right-3">
            <a href="#">X</a>
          </div>
        </div>
      </div>
    </>
  );
}
