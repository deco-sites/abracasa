interface Props {
  installmentsBillingDuration: number | null;
  installmentsBillingIncrement: number | null;
}

const Installments = (
  { installmentsBillingDuration, installmentsBillingIncrement }: Props,
) => {
  if (!installmentsBillingIncrement && !installmentsBillingDuration) {
    return null;
  }

  if (installmentsBillingDuration === 0 && installmentsBillingDuration === 0) {
    return null;
  }

  const formattedInstallmentsBillingIncrement = installmentsBillingIncrement
    ?.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  return (
    <div class="flex text-xs leading-[15px] text-black">
      <p class="flex gap-0.5">
        <span class="hidden lg:block">ou</span>
        <span>{installmentsBillingDuration}x</span>{" "}
        <span>R$ {formattedInstallmentsBillingIncrement}</span>
      </p>
    </div>
  );
};

export default Installments;
