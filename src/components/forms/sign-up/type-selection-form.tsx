import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import UserTypeCard from "./user-type-card";

type Props = {
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
};

const TypeSelectionForm = ({ register, userType, setUserType }: Props) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Create an account</h2>
      <p className="text-iridium md:text-sm">
        Tell us about yourself! what do you do? Let&apos;s tailor your
        <br /> experience to your needs
      </p>
      <UserTypeCard
        register={register}
        userType={userType}
        setUserType={setUserType}
        value="owner"
        title="I own a business"
        text="Setting up an account for my company"
      />
      <UserTypeCard
        register={register}
        userType={userType}
        setUserType={setUserType}
        value="student"
        title="I am an Individual"
        text="Looking to learn and explore a bit"
      />
    </>
  );
};

export default TypeSelectionForm;
