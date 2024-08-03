"use client";
import { useEmailMarketing } from "@/hooks/email-marketing/use-email-marketing";
import React from "react";
import { CustomerTable } from "./customer-table";
import { Button } from "../ui/button";
import { CalendarIcon, ContactIcon, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Loader } from "../loader";
import FormGenerator from "../forms/form-generator";
import Modal from "../custom-modal/modal";
import { cn, getMonthName } from "@/lib/utils";
import EditEmail from "./edit-mail";

type Props = {
  domains: {
    customer: {
      Domain: {
        name: string;
      } | null;
      id: string;
      email: string | null;
    }[];
  }[];
  campaign: {
    name: string;
    id: string;
    customers: string[];
    createdAt: Date;
  }[];
  subscription: {
    plan: "STANDARD" | "PRO" | "ULTIMATE";
    credits: number;
  } | null;
};
const EmailMarketing = ({ domains, campaign, subscription }: Props) => {
  const {
    onSelectedEmails,
    isSelected,
    onCreateCampaign,
    register,
    errors,
    loading,
    onSelectCampaign,
    processing,
    campaignId,
    onAddCustomersToCampaign,
    onBulkEmail,
    onSetAnswersId,
    isId,
    registerEmail,
    emailErrors,
    onCreateEmailTemplate,
    editing,
    setValue
  } = useEmailMarketing();
  return (
    <div className="w-full flex-1 h-0 grid grid-cols-1 lg:grid-cols-2 gap-10 pr-8">
      <CustomerTable
        domains={domains}
        onId={onSetAnswersId}
        onSelect={onSelectedEmails}
        select={isSelected}
        id={isId}
      />
      <div>
        <div className="flex gap-3 justify-end">
          <Button
            disabled={isSelected.length == 0}
            onClick={onAddCustomersToCampaign}
          >
            <Plus />
            Add to campaign
          </Button>
          <Modal
            title="Create a new Campaign"
            description="Add your customers and create marketing campaign"
            trigger={
              <Card className="flex gap-2 items-center px-3 cursor-pointer">
                <Loader loading={false}>
                  <Plus /> Create Campaign
                </Loader>
              </Card>
            }
          >
            <form className="flex flex-col gap-4" onSubmit={onCreateCampaign}>
              <FormGenerator
                name="name"
                register={register}
                errors={errors}
                inputType="input"
                placeholder="Campaign Name"
                type="text"
              />
              <Button type="submit" disabled={loading} className="w-full">
                <Loader loading={loading}>Create Campaign</Loader>
              </Button>
            </form>
          </Modal>

          <Card className="p-2 border-[1px] border-grandis shadow-inner">
            <CardDescription className="font-bold">
              {subscription?.credits} Credits
            </CardDescription>
          </Card>
        </div>
        <div className="flex flex-col items-center mt-5 gap-3">
          {campaign &&
            campaign.map((camp, idx) => (
              <Card
                key={camp.id}
                className={cn(
                  "p-5 w-full cursor-pointer",
                  campaignId == camp.id ? "bg-gray-50" : ""
                )}
                onClick={() => onSelectCampaign(camp.id)}
              >
                <Loader loading={processing}>
                  <CardContent className="p-0 flex flex-col items-center gap-3">
                    <div className="flex w-full justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <CalendarIcon />
                        <CardDescription>
                          Created {getMonthName(camp.createdAt.getMonth())}{" "}
                          {camp.createdAt.getUTCDate()}th
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <ContactIcon />
                        <CardDescription>
                          {camp.customers.length} Customers added
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <CardTitle className="text-xl">{camp.name}</CardTitle>
                      <div className="flex gap-3">
                        <Modal
                          title="Edit Email"
                          description="This email will be sent to the campaign memebers"
                          trigger={
                            <Card className="rounded-lg curose-pointer bg-grandis py-2 px-5 font-semibold text-sm hover:bg-grandis text-gray-700">
                              Edit Email
                            </Card>
                          }
                        >
                          <EditEmail
                            register={registerEmail}
                            errors={emailErrors}
                            setDefault={setValue}
                            id={camp.id}
                            onCreate={onCreateEmailTemplate}
                          />
                        </Modal>
                        <Button
                          variant={"default"}
                          className="rounded-lg"
                          onClick={() => {
                            onBulkEmail(
                              campaign[idx].customers.map((c) => c),
                              camp.id
                            );
                          }}
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Loader>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmailMarketing;
