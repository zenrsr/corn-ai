"use client";
import { Loader } from "@/components/loader";
import SubscriptionCard from "@/components/settings/subscription-card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/billings/use-billings";
import React from "react";
import { StripeElements } from "./stripe-elements";

type Props = {
  plan: "STANDARD" | "PRO" | "ULTIMATE";
};

const SubscriptionForm = ({ plan }: Props) => {
  const { loading, onSetPayment, payment, onUpdateToFreeTier } =
    useSubscription(plan);
  return (
    <Loader loading={loading}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <SubscriptionCard
            title="STANDARD"
            description="The standard plan is perfect for small businesses and startups"
            price="0.5"
            payment={payment}
            onPayment={(p) =>
              onSetPayment(p as "STANDARD" | "PRO" | "ULTIMATE")
            }
            id="STANDARD"
          />
          <SubscriptionCard
            title="PRO"
            description="The pro plan, for businesses that are growing and need more features"
            price="5"
            payment={payment}
            onPayment={(p) =>
              onSetPayment(p as "STANDARD" | "PRO" | "ULTIMATE")
            }
            id="PRO"
          />
          <SubscriptionCard
            title="ULTIMATE"
            description="The ultimate plan, for enterprises that need the best features"
            price="25"
            payment={payment}
            onPayment={(p) =>
              onSetPayment(p as "STANDARD" | "PRO" | "ULTIMATE")
            }
            id="ULTIMATE"
          />
        </div>
        <StripeElements payment={payment} />
        {payment === "STANDARD" && (
          <Button onClick={onUpdateToFreeTier}>
            <Loader loading={loading}>Confirm</Loader>
          </Button>
        )}
      </div>
    </Loader>
  );
};

export default SubscriptionForm;
