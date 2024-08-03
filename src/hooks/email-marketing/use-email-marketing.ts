/* eslint-disable react-hooks/exhaustive-deps */
import {
  onAddCustomerToEmail,
  onBulkMailer,
  onCreateMarketingCampaign,
  onGetAllCustomerResponses,
  onGetEmailTemplate,
  onSaveEmailTemplate
} from "@/actions/email-marketing";
import { useToast } from "@/components/ui/use-toast";
import {
  EmailMarketingBodySchema,
  EmailMarketingSchema
} from "@/schemas/email.marketing.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useEmailMarketing = () => {
  const [isSelected, setIsSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [campaignId, setCampaignId] = useState<string | undefined>();
  const [processing, setProcessing] = useState<boolean>(false);
  const [isId, setIsId] = useState<string | undefined>(undefined);
  const [editing, setEditing] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm({
    resolver: zodResolver(EmailMarketingSchema)
  });

  const {
    register: registerEmail,
    formState: { errors: emailErrors },
    setValue,
    handleSubmit: submitEmail
  } = useForm({
    resolver: zodResolver(EmailMarketingBodySchema)
  });

  const { toast } = useToast();
  const router = useRouter();

  const onCreateCampaign = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const campaign = await onCreateMarketingCampaign(values.name);
      if (campaign) {
        reset();
        toast({
          title: "Campaign created successfully",
          description: campaign.message
        });
        setLoading(false);
        router.refresh();
      }
    } catch (error) {
      console.log({ error });
    }
  });

  const onCreateEmailTemplate = submitEmail(async (values) => {
    try {
      setEditing(true);
      const template = JSON.stringify(values.description);
      const emailTemplate = await onSaveEmailTemplate(template, campaignId!);
      if (emailTemplate) {
        toast({
          title: "Email template saved successfully",
          description: emailTemplate.message
        });
        setEditing(false);
      }
    } catch (error) {
      console.log({ error });
    }
  });

  const onSelectCampaign = (id: string) => setCampaignId(id);

  const onAddCustomersToCampaign = async () => {
    try {
      setProcessing(true);
      const customerAdd = await onAddCustomerToEmail(isSelected, campaignId!);
      if (customerAdd) {
        toast({
          title: "Customer added successfully",
          description: customerAdd.message
        });
        setProcessing(false);
        setCampaignId(undefined);
        router.refresh();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onSelectedEmails = (email: string) => {
    const duplicate = isSelected.find((e) => e == email);

    if (duplicate) {
      setIsSelected(isSelected.filter((e) => e !== email));
    } else {
      setIsSelected((prev) => [...prev, email]);
    }
  };

  const onBulkEmail = async (emails: string[], campaignId: string) => {
    try {
      const mails = await onBulkMailer(emails, campaignId);
      if (mails) {
        toast({
          title: "Emails sent successfully",
          description: mails.message
        });
        router.refresh();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onSetAnswersId = (id: string) => setIsId(id);

  return {
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
  };
};

export const useAnswers = (id: string) => {
  const [answers, setAnswers] = useState<
    {
      customer: {
        questions: { question: string; answered: string | null }[];
      }[];
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onGetCustomersAnswers = async () => {
    try {
      setLoading(true);
      const answer = await onGetAllCustomerResponses(id);
      console.log({ answer });
      setLoading(false);
      if (answer) {
        setAnswers(answer);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    onGetCustomersAnswers();
  }, []);

  return { answers, loading };
};

export const useEditEmail = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [template, setTemplate] = useState<string>(" ");

  const onGetTemplate = async (id: string) => {
    try {
      setLoading(true);
      const email = await onGetEmailTemplate(id);
      if (email) {
        setTemplate(email);
      }
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    onGetTemplate(id);
  }, []);

  return { loading, template };
};
