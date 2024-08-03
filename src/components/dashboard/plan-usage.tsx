import React from "react";
import { ProgressBar } from "../progress";

type Props = {
  plan: "STANDARD" | "PRO" | "ULTIMATE";
  credits: number;
  domains: number;
  clients: number;
};

const PlanUsage = ({ plan, clients, domains, credits }: Props) => {
  return (
    <div className="flex flex-col gap-5 py-5">
      <ProgressBar
        end={plan === "STANDARD" ? 10 : plan === "PRO" ? 50 : 500}
        label="Email Credits"
        credits={credits}
      />
      <ProgressBar
        end={plan === "STANDARD" ? 10 : plan === "PRO" ? 50 : 500}
        label="Domain"
        credits={domains}
      />
      <ProgressBar
        end={plan === "STANDARD" ? 10 : plan === "PRO" ? 50 : 500}
        label="Contacts"
        credits={clients}
      />
    </div>
  );
};

export default PlanUsage;
