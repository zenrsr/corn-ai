import { CheckCircle2Icon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import StripeConnect from "../stripe/stripe-connect";

type Props = {
  type: string;
  connections: {
    [key: string]: boolean;
  };
};

const IntegrationModalBody = ({ type, connections }: Props) => {
  switch (type) {
    case "stripe":
      return (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Stripe would like to access</h2>
          {[
            "Payment and bank information",
            "Products and services you sell",
            "Business and tax information",
            "Create and update Products"
          ].map((item, key) => (
            <div className="flex gap-2 items-center pl-3" key={key}>
              <CheckCircle2Icon />
              <p>{item}</p>
            </div>
          ))}
          <div className="flex justify-between mt-10">
            <Button variant={"outline"}>Learn More</Button>
            <StripeConnect connected={connections[type]} />
          </div>
        </div>
      );

    default:
      return <></>;
  }
};

export default IntegrationModalBody;
