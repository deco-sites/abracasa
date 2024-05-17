import { formatPrice } from "deco-sites/abracasa/sdk/format.ts";

const cashbacks = {
  Ativos: [
    { "valor": 10, "DataFim": "2024-05-31T23:59:59" },
    { "valor": 30, "DataFim": "2024-05-31T23:59:59" },
    { "valor": 50, "DataFim": "2024-05-31T23:59:59" },
  ],
};

function CustomizedButton({ label }: { label: string }) {
  return (
    <div class="relative px-5 py-2 font-medium text-white group mt-4 cursor-pointer">
      <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-orange-500 group-hover:bg-orange-700 group-hover:skew-x-12">
      </span>
      <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-orange-700 group-hover:bg-orange-500 group-hover:-skew-x-12">
      </span>
      <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-orange-600 -rotate-12">
      </span>
      <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-orange-400 -rotate-12">
      </span>
      <span class="relative">{label}</span>
    </div>
  );
}

function SellbieCashback() {
  return (
    <>
      <label
        for="cashback_modal"
        class="fixed bottom-24 right-6 z-30 animate-pulse"
      >
        <CustomizedButton label="Cashback disponível" />
      </label>

      <input type="checkbox" id="cashback_modal" class="modal-toggle" />
      <div class="modal z-[9999999999]" role="dialog">
        <div class="modal-box">
          <h3 class="text-lg font-bold mb-4">
            Acompanhe os seus cashbacks ativos abaixo:
          </h3>

          <div class="grid grid-cols-2 gap-y-5 gap-x-2.5">
            {cashbacks.Ativos.map((item) => {
              const date = new Date(item.DataFim);
              const formattedDate = date.toLocaleString("pt-BR", {
                timeZone: "America/Sao_Paulo",
              });

              return (
                <div class="flex flex-col gap-3.5 bg-gradient-to-br from-orange-500 to-orange-600 text-white text-center p-4 rounded-lg pointer-events-none">
                  <div class="flex flex-col items-center justify-center">
                    <span class="font-bold">Cashback Disponível</span>
                    <CustomizedButton label={formatPrice(item.valor) ?? ""} />
                  </div>

                  <p class="text-xs">Válido até: {formattedDate}</p>
                </div>
              );
            })}
          </div>
        </div>
        <label class="modal-backdrop" for="cashback_modal" />
      </div>
    </>
  );
}

export default SellbieCashback;
