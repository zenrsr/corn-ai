"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useStripeCustomer } from "@/hooks/billings/use-billings";
import { Elements } from "@stripe/react-stripe-js";
import { Loader } from "@/components/loader";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import CustomerPaymentsForm from "./customer-payment-form";
import { CircleCheckIcon } from "lucide-react";

type Props = {
  onBack(): void;
  products:
    | {
        name: string;
        image: string;
        price: number;
      }[]
    | undefined;
  amount?: number;
  onNext(): void;
  stripeId?: string;
};

const PaymentCheckout = ({
  onBack,
  onNext,
  products,
  amount,
  stripeId
}: Props) => {
  const StripePromsie = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!,
    {
      stripeAccount: stripeId!
    }
  );
  const { stripeSecret, loadForm } = useStripeCustomer(amount!, stripeId!);
  return (
    <Loader loading={loadForm}>
      <div className="flex flex-col gap-5 justify-center">
        <div className="flex justify-center">
          <h2 className="text-4xl font-bold mb-5">Payment Checkout</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="cols-span-1 border-r-2 pr-5 flex flex-col">
            <h2 className="text-3xl font-bold mb-5">Total Amount: ${amount}</h2>
            <p>Enter your payment details:</p>
            <ul className="text-sm">
              <li className="text-xs flex-wrap p-2 flex items-center">
                <CircleCheckIcon className="text-green-500" />
                Securely process payments using Stripe.
              </li>
              <li className="text-xs flex-wrap p-2 flex items-center">
                <CircleCheckIcon className="text-green-500" />
                Accept major credit cards, including Visa & Mastercard
              </li>
              <li className="text-xs flex-wrap p-2 flex items-center">
                <CircleCheckIcon className="text-green-500" />
                Support for popular payment methods like Apple Pay and Google
                Pay.
              </li>
              <li className="text-xs flex-wrap p-2 flex items-center">
                <CircleCheckIcon className="text-green-500" />
                Real-time validation of payment information to prevent errors.
              </li>
              <li className="text-xs flex-wrap p-2 flex items-center">
                <CircleCheckIcon className="text-green-500" />
                Automatic currency conversion for international transactions.
              </li>
            </ul>

            {products &&
              products.map((product, key) => (
                <Card key={key} className="w-full flex gap-2 p-3">
                  <div className="aspect-square w-2/12 relative">
                    <Image
                      src={`https://ucarecdn.com/${product.image}/`}
                      alt="product"
                      fill
                    />
                  </div>
                  <div className="flex-1 flex justify-between">
                    <p className="text-xl font-semibold">{product.name}</p>
                    <p className="text-xl font-bold">{product.price}</p>
                  </div>
                </Card>
              ))}
          </div>
          <div className="cols-span-1 pl-5">
            {stripeSecret && StripePromsie && (
              <Elements
                stripe={StripePromsie}
                options={{ clientSecret: stripeSecret }}
              >
                <CustomerPaymentsForm onNext={onNext} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default PaymentCheckout;
