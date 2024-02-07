export default function SellerButton() {
  return (
    <button
      aria-label="call seller"
      class="px-3 py-1 leading-3 text-[13px] w-[280px] h-10 flex items-center bg-[#E7E7E7CC] text-black gap-1.5"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.62492 13.1667H9.20825V10.7917H11.5833V9.20834H9.20825V6.83334H7.62492V9.20834H5.24992V10.7917H7.62492V13.1667ZM3.66659 16.3333C3.23117 16.3333 2.85843 16.1783 2.54836 15.8682C2.23829 15.5582 2.08325 15.1854 2.08325 14.75V5.25001C2.08325 4.81459 2.23829 4.44185 2.54836 4.13178C2.85843 3.82171 3.23117 3.66667 3.66659 3.66667H13.1666C13.602 3.66667 13.9747 3.82171 14.2848 4.13178C14.5949 4.44185 14.7499 4.81459 14.7499 5.25001V8.81251L17.9166 5.64584V14.3542L14.7499 11.1875V14.75C14.7499 15.1854 14.5949 15.5582 14.2848 15.8682C13.9747 16.1783 13.602 16.3333 13.1666 16.3333H3.66659ZM3.66659 14.75H13.1666V5.25001H3.66659V14.75Z"
          fill="#212121"
        />
      </svg>

      <span>Fazer chamada com um vendedor</span>
    </button>
  );
}