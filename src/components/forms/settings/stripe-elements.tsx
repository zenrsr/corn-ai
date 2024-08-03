"use client";

import { Loader } from "@/components/loader";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { PaymentForm } from "./payments-form";
import { useStripeElements } from "@/hooks/billings/use-billings";
import Stripe from "stripe";

type StripeElementsProps = {
  payment: "STANDARD" | "PRO" | "ULTIMATE";
};

export const StripeElements = ({ payment }: StripeElementsProps) => {
  const StripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);
  const { stripeSecret, loadForm } = useStripeElements(payment);
  return (
    stripeSecret &&
    StripePromise &&
    (payment == "PRO" || payment == "ULTIMATE") && (
      <Loader loading={loadForm}>
        <Elements
          stripe={StripePromise}
          options={{
            clientSecret: stripeSecret
          }}
        >
          <PaymentForm plan={payment} />
        </Elements>
      </Loader>
    )
  );
};
