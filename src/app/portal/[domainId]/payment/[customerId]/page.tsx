import { onDomainCustomerResponses } from "@/actions/appointment";
import { onGetDomainProductAndConnectedAccountId } from "@/actions/payments";
import PortalForm from "@/components/forms/portal/portal-form";
import React from "react";

type Props = {
  params: {
    domainId: string;
    customerId: string;
  };
};

const Page = async ({ params }: Props) => {
  const questions = await onDomainCustomerResponses(params.customerId);
  const products = await onGetDomainProductAndConnectedAccountId(
    params.domainId
  );

  if (!questions) return null;

  return (
    <PortalForm
      email={questions.email!}
      products={products?.products}
      amount={products?.amount}
      domainId={params.domainId}
      customerId={params.customerId}
      questions={questions.questions}
      stripeId={products?.stripeId!}
      type="Payment"
    />
  );
};

export default Page;
