"use client";
import { USER_LOGIN_FORM } from "@/constants/forms";
import React from "react";
import { useFormContext } from "react-hook-form";
import FormGenerator from "../form-generator";

type Props = {};

const LoginForm = (props: Props) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Login</h2>
      <p className="text-iridium">You will receive a one time passwords </p>
      {USER_LOGIN_FORM.map((f) => (
        <FormGenerator
          key={f.id}
          {...f}
          errors={errors}
          register={register}
          name={f.name}
        />
      ))}
    </>
  );
};

export default LoginForm;
