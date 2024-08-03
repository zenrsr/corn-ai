"use client";
import React from "react";

import { Button } from "../ui/button";
import { Loader } from "../loader";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form";
import FormGenerator from "../forms/form-generator";
import { useEditEmail } from "@/hooks/email-marketing/use-email-marketing";

type EditEmailProps = {
  id: string;
  onCreate(): void;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setDefault: UseFormSetValue<FieldValues>;
};

const EditEmail = ({
  id,
  onCreate,
  errors,
  register,
  setDefault
}: EditEmailProps) => {
  const { loading, template } = useEditEmail(id);
  setDefault(
    "description",
    template && template.trim() ? JSON.parse(template) : ""
  );
  return (
    <form onSubmit={onCreate} className="flex flex-col gap-3">
      <Loader loading={loading}>
        <FormGenerator
          name="description"
          label="Message"
          register={register}
          errors={errors}
          inputType="textarea"
          lines={10}
          placeholder="your email description"
          type="text"
        />
        <Button>Save</Button>
      </Loader>
    </form>
  );
};

export default EditEmail;
