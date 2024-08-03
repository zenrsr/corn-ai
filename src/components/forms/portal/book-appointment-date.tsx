import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APPOINTMENT_TABLE_HEADER } from "@/constants/menu";
import { APPOINTMENT_TIME_SLOTS } from "@/constants/time-slots";
import { cn } from "@/lib/utils";
import { setDate } from "date-fns";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  bookings?:
    | {
        date: Date;
        slot: string;
      }[]
    | undefined;
  date: Date | undefined;
  currentSlot?: string;
  register: UseFormRegister<FieldValues>;
  onBack(): void;
  onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>;
  onSlot(slot: string): void;
  loading: boolean;
};

const BookAppointmentDate = ({
  bookings,
  date,
  currentSlot,
  register,
  onBack,
  onBooking,
  onSlot,
  loading
}: Props) => {
  return (
    <div className="flex flex-col gap-5 justify-center">
      <div className="flex justify-center">
        <h2 className="text-4xl font-extrabold mb-5">Schedule a Meeting</h2>
      </div>
      <div className="flex gap-10 flex-col sm:flex-row">
        <div className="w-[300px] gap-4">
          <h6 className="font-semibold text-2xl">Strategy Demo Session</h6>
          <CardDescription>
            Our strategy session is a deep dive into your business goals and
            objectives. We will work together to develop a comprehensive
            strategy that aligns with your vision and sets you up for success.
          </CardDescription>
        </div>
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={onBooking}
            className="rounded-md border"
          />
        </div>

        <div className="flex flex-col gap-5">
          {APPOINTMENT_TIME_SLOTS.map((slot, key) => (
            <Label htmlFor={`slot-${key}`} key={key}>
              <Card
                onClick={() => onSlot(slot.slot)}
                className={cn(
                  currentSlot == slot.slot ? "bg-grandis" : "bg-peach",
                  "px-10 py-4",
                  bookings &&
                    bookings.some(
                      (booking) =>
                        `${booking.date.getDate()}/${booking.date.getMonth()}` ===
                          `${date?.getDate()}/${date?.getMonth()}` &&
                        booking.slot == slot.slot
                    )
                    ? "bg-gray-300"
                    : "cursor-pointer border-orange hover:bg-grandis dark:text-black transition duration-150 ease-in-out"
                )}
              >
                <Input
                  {...(bookings &&
                  bookings.some(
                    (booking) =>
                      booking.date == date && booking.slot == slot.slot
                  )
                    ? { disabled: true }
                    : { disabled: false })}
                  className="hidden"
                  type="radio"
                  value={slot.slot}
                  {...register("slot")}
                  id={`slot-${key}`}
                />
                {slot.slot}
              </Card>
            </Label>
          ))}
        </div>
      </div>
      <div className="flex gap-5 justify-center mt-5">
        <Button type="button" onClick={onBack} variant={"outline"}>
          Edit Questions?
        </Button>
        <Button type="submit">
          <Loader loading={loading}>Book Now</Loader>
        </Button>
      </div>
    </div>
  );
};

export default BookAppointmentDate;
