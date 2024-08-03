import { onGetPaymentConnected } from "@/actions/integrations";
import InfoBar from "@/components/infobar";
import IntegrationList from "@/components/integrations";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  const payment = await onGetPaymentConnected();

  const connections = {
    stripe: payment ? true : false
  };
  return (
    <>
      <InfoBar />
      <IntegrationList connections={connections} />
    </>
  );
};

export default Page;
