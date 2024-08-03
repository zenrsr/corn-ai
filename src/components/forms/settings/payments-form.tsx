"use client";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { useCompletePayment } from "@/hooks/billings/use-billings";
import { PaymentElement } from "@stripe/react-stripe-js";
import React from "react";

type PaymentFormProps = {
  plan: "STANDARD" | "PRO" | "ULTIMATE";
};

export const PaymentForm = ({ plan }: PaymentFormProps) => {
  const { processing, onMakePayment } = useCompletePayment(plan);
  return (
    <form onSubmit={onMakePayment} className="flex flex-col gap-5">
      <div>
        <h2 className="font-semibold text-xl text-black">Payment Method</h2>
        <CardDescription>Enter your card details</CardDescription>
      </div>
      <PaymentElement />
      <Button type="submit">
        <Loader loading={processing}>Pay</Loader>
      </Button>
    </form>
  );
};
