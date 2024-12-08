import { invoke } from "$store/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Props {
  title: string;
  subtitle?: string;
}

export default function NewsletterForm({ title, subtitle }: Props) {
  const loading = useSignal(false);
  const isSubmitted = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      dataLayer.push(
        {
          event:"newsletter",
          email:email,
          name:name
        }
      )
      await invoke.vtex.actions.newsletter.subscribe({ email, name });
    } finally {
      loading.value = false;
      isSubmitted.value = true;
    }
  };

  return (
    <>
      {!isSubmitted.value
        ? (
          <>
            <h1 class="text-xl font-bold my-0 mt-1.5">
              {title ?? "Receba novidades, ofertas e conteúdos exclusivos!"}
            </h1>

            <p class="text-xs mb-4">
              {subtitle ??
                "Enviaremos por e-mail novidades e promoções exclusivas"}
            </p>

            <form
              onSubmit={handleSubmit}
              class="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-7 pb-5"
            >
              <input
                name="name"
                type="text"
                placeholder="Seu nome"
                class="border border-gray-200 min-w-[320px] min-h-[32px] text-xs px-4 focus:outline-none focus:border-white text-black"
              />
              <input
                name="email"
                type="email"
                placeholder="Seu e-mail"
                class="border border-gray-200 min-w-[320px] min-h-[32px] text-xs px-4 focus:outline-none focus:border-white text-black"
              />
              {!loading.value
                ? (
                  <button
                    type="submit"
                    id="newsletter"
                    class="border border-solid border-[#B9154C] min-w-[140px] min-h-[32px] bg-[#2C2C2C] px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#B9154C]focus:ring-opacity-50"
                  >
                    Enviar
                  </button>
                )
                : <span class="loading loading-spinner loading-md" />}
            </form>
          </>
        )
        : (
          <>
            <h1 class="text-xl font-bold my-0 mt-1.5">
              E-mail cadastrado com sucesso!
            </h1>

            <p class="text-xs mb-4">
              Em breve você receberá promoções e novidades.
            </p>

            <button
              aria-label="cadastrar novo email"
              onClick={() => {
                isSubmitted.value = false;
              }}
              class="flex items-center justify-center font-bold border border-solid border-white hover:border-[#2c2c2c] hover:bg-[#2c2c2c] text-white py-1.5 px-3 transition-all duration-200"
            >
              Cadastrar novo?
            </button>
          </>
        )}
    </>
  );
}
