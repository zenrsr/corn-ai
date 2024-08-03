import { ongetSubscriptionPlan } from "@/actions/settings";
import React from "react";
import Section from "../section-label";
import { Card, CardContent, CardDescription } from "../ui/card";
import { CheckCircle2, Plus } from "lucide-react";
import { pricingCards } from "@/constants/landing-page";
import Modal from "../custom-modal/modal";
import SubscriptionForm from "../forms/settings/subscription-form";
import Image from "next/image";

type Props = {};

const BillingSettings = async (props: Props) => {
  const plan = await ongetSubscriptionPlan();
  const currentPlanFeatures = pricingCards.find(
    (card) => card.title.toUpperCase() === plan?.toUpperCase()
  )?.features;

  if (!currentPlanFeatures) return;

  return (
    <div className="grid gird-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Billing Settings"
          message="Add payment information, upgrade and modify your plan"
        />
      </div>
      <div className="lg:col-span-2 flex justify-start lg:justify-center">
        <Modal
          title="Choose a plan"
          description="Tell us about your business and yourself, so we can recommend the right plan for you."
          trigger={
            plan && plan === "STANDARD" ? (
              <Card className="border-dashed bg-cream border-gray-400 w-full cursor-pointer h-[270px] flex justify-center items-center">
                <CardContent className="flex gap-2 items-center">
                  <div className="rounded-full border-2 p-1">
                    <Plus className="text-gray-400" />
                  </div>
                  <CardDescription className="font-semibold">
                    Upgrade Plan
                  </CardDescription>
                </CardContent>
              </Card>
            ) : (
              <Image
                src={"/images/creditcard.png"}
                width={400}
                height={400}
                alt="payment-card"
              />
            )
          }
        >
          <SubscriptionForm plan={plan!} />
        </Modal>
      </div>
      <div className="lg:col-span-2">
        <h3 className="text-xl font-bold mb-2">Current Plan</h3>
        <p className="text-lg hover:cursor-pointer font-bold">{plan}</p>
        <div className="flex flex-col gap-2 my-2">
          {currentPlanFeatures.map((feature, index) => (
            <div className="flex gap-2" key={index}>
              <CheckCircle2 className="text-muted-foreground" />
              <p className="text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
