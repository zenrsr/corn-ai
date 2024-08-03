import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useCompleteCustomerPayment } from "@/hooks/billings/use-billings";
import { PaymentElement } from "@stripe/react-stripe-js";
import React from "react";

type Props = {
  onNext(): void;
};

const CustomerPaymentsForm = ({ onNext }: Props) => {
  const { processing, onMakePayment } = useCompleteCustomerPayment(onNext);
  return (
    <div className="flex flex-col">
      <PaymentElement />
      <Button type="submit" className="w-full mt-5" onClick={onMakePayment}>
        <Loader loading={processing}>Pay</Loader>
      </Button>
    </div>
  );
};

export default CustomerPaymentsForm;
