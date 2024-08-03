import { onBookNewAppointment, SaveAnswers } from "@/actions/appointment";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const usePortal = (
  customerId: string,
  domainId: string,
  email: string
) => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm();
  const { toast } = useToast();
  const [step, setStep] = useState<number>(2);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);

  setValue("date", date);

  const onNext = () => setStep((prev) => prev + 1);

  const onPrev = () => setStep((prev) => prev - 1);

  const onBookAppointment = handleSubmit(async (values) => {
    console.log("Form Values: ", values);
    try {
      setLoading(true);
      // console.log("Starting booking process");

      const questions = Object.keys(values)
        .filter((key) => key.startsWith("question"))
        .reduce((obj: any, key) => {
          obj[key.split("question-")[1]] = values[key];
          return obj;
        }, {});

      const savedAnswers = await SaveAnswers(questions, customerId);
      // console.log("SaveAnswers Response: ", savedAnswers);

      if (!savedAnswers) {
        toast({
          title: "Saving Answers ..."
        });
      }
      const booked = await onBookNewAppointment(
        domainId,
        customerId,
        values.slot,
        values.date,
        email
      );

      if (booked && booked.status === 200) {
        // console.log("Booking successful, about to show success toast");
        toast({
          title: "Success",
          description: booked.message
        });
        setStep(3);
      } else {
        // console.log("Booking unsuccessful, about to show error toast");
        toast({
          title: "Error",
          description: "Booking was not successful. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      // console.log("Caught an error, about to show error toast", error);
      toast({
        title: "Error",
        description: "An error occurred while booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      // console.log("Setting loading to false");
      setLoading(false);
    }
  });

  const onSelectedTimeSlot = (slot: string) => setSelectedSlot(slot);

  return {
    step,
    onNext,
    onPrev,
    register,
    errors,
    loading,
    onBookAppointment,
    setDate,
    date,
    onSelectedTimeSlot,
    selectedSlot,
    handleSubmit
  };
};
