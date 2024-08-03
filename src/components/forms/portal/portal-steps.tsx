import React from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormHandleSubmit
} from "react-hook-form";
import QuestionsForm from "./question-form";
import BookAppointmentDate from "./book-appointment-date";
import PaymentCheckout from "./payment-checkout";

type Props = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  type: "Appointment" | "Payment";
  register: UseFormRegister<FieldValues>;
  error: FieldErrors<FieldValues>;
  onNext(): void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  step: number;
  date: Date | undefined;
  onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>;
  onBack(): void;
  onSlot(slot: string): void;
  slot?: string;
  loading: boolean;
  bookings?:
    | {
        date: Date;
        slot: string;
      }[]
    | undefined;
  products?:
    | {
        name: string;
        image: string;
        price: number;
      }[]
    | undefined;
  amount?: number;
  stripeId?: string;
};

const PortalSteps = ({
  questions,
  type,
  register,
  error,
  onNext,
  handleSubmit,
  step,
  onBooking,
  date,
  onBack,
  onSlot,
  loading,
  slot,
  products,
  bookings,
  amount,
  stripeId
}: Props) => {
  console.log({ questions });
  if (step == 1) {
    return (
      <QuestionsForm
        register={register}
        error={error}
        onNext={onNext}
        handleSubmit={handleSubmit}
        questions={questions}
      />
    );
  }

  if (step == 2 && type === "Appointment") {
    return (
      <BookAppointmentDate
        date={date}
        bookings={bookings}
        currentSlot={slot}
        register={register}
        onBack={onBack}
        onBooking={onBooking}
        onSlot={onSlot}
        loading={loading}
      />
    );
  }

  if (step == 2 && type === "Payment") {
    return (
      <PaymentCheckout
        products={products}
        stripeId={stripeId}
        onBack={onBack}
        onNext={onNext}
        amount={amount}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="font-bold text-gray-600 text-4xl">Thank You</h2>
      <p className="text-center">
        We appreciate you taking the time to complete this form. We are excited
        to
        <br /> connect with you in the near future.
      </p>
    </div>
  );
};

export default PortalSteps;
