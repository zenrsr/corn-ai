"use client";
import React from "react";
import { Button } from "../ui/button";
import { Loader } from "../loader";
import { useStripe } from "@/hooks/billings/use-billings";

type Props = {
  connected: boolean;
};

const StripeConnect = ({ connected }: Props) => {
  const { onStripeConnect, onStripeAccountPending } = useStripe();
  return (
    <Button disabled={connected} onClick={onStripeConnect}>
      <Loader loading={onStripeAccountPending}>
        {connected ? "Connected" : "Connect to Stripe"}
      </Loader>
    </Button>
  );
};

export default StripeConnect;
