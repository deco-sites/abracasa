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
    e.currentTarget?.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      dataLayer.push(
        {
          event: "newsletter",
          email: email,
          name: name,
        },
      );
      const status = "true";
      await invoke.vtex.actions.masterdata.createDocument({
        data: { email, status },
        acronym: "NW",
      });
      // await invoke.vtex.actions.newsletter.subscribe({ email, name });
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
            <h1 class="text-2xl font-normal my-0 mt-1.5">
              {title ?? "Newsletter"}
            </h1>

            <p class="text-lg my-[14px] my:mb-6 font-light">
              {subtitle ??
                "Cadastre-se e receba novidades, ofertas e conteúdos exclusivos."}
            </p>

            <form
              onSubmit={handleSubmit}
              class="w-full max-w-[440px] h-full flex flex-col items-center justify-center pb-5"
            >
              <input
                name="name"
                type="text"
                placeholder="Seu nome"
                class="border-b border-[#D9D9D9] w-full min-h-[50px] text-base font-light focus:outline-none focus:border-white text-[#555555] bg-transparent"
              />
              <input
                name="email"
                type="email"
                placeholder="Seu e-mail"
                class="mt-8 mb-6 border-b border-[#D9D9D9] w-full min-h-[50px] text-base font-light focus:outline-none focus:border-white text-[#555555] bg-transparent"
              />
              {!loading.value
                ? (
                  <button
                    type="submit"
                    id="newsletter"
                    class="btn bg-white hover:bg-dimgray hover:text-white w-full border border-solid border-[#555555] text-[#555555] min-w-[140px] min-h-[48px] px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#B9154C]focus:ring-opacity-50 tracking-[0.1em]"
                  >
                    CADASTRAR
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
