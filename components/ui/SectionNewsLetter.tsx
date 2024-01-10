export default function SectionNewsLetter() {
  return (
    <div class="bg-[#B9154C] text-white max-w-full flex items-center justify-center">
      <div class="w-full h-full bg-[#B9154C] text-center my-2 py-2 px-6">
        <h1 class="text-xl font-bold">
          Receba novidades, ofertas e conteúdos exclusivos!
        </h1>
        <p class="text-xs mb-4">
          Enviaremos por e-mail novidades e promoções exclusivas
        </p>
        <form
          action=""
          class="w-full h-full flex flex-col md:flex-row items-center justify-center gap-7 pb-5"
        >
          <input
            type="text"
            placeholder="Seu nome"
            class="border border-gray-200 min-w-[320px] min-h-[32px] tsxt-xs px-4 focus:outline-none focus:border-white"
          />
          <input
            type="email"
            placeholder="Seu e-mail"
            class="border border-gray-200 min-w-[320px] min-h-[32px] text-xs px-4 focus:outline-none focus:border-white"
          />
          <button
            type="submit"
            class="border border-solid border-[#B9154C] min-w-[140px] min-h-[32px] bg-[#2C2C2C] px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#B9154C]focus:ring-opacity-50"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
