"use client";
import { useChangePassword } from "@/hooks/settings/use-settings";
import React from "react";
import Section from "../section-label";
import FormGenerator from "../forms/form-generator";
import { Button } from "../ui/button";
import { Loader } from "../loader";

type Props = {};

const ChangePassword = (props: Props) => {
  const { register, errors, onChangePassword, loading } = useChangePassword();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section label="Change Password" message="Reset your password." />
        <form onSubmit={onChangePassword} className="lg:cols-span-4 mt-4">
          <div className="lg:w-[500px] flex flex-col gap-3">
            <FormGenerator
              register={register}
              errors={errors}
              name="password"
              placeholder="New password"
              type="text"
              inputType="input"
            />
            <FormGenerator
              register={register}
              errors={errors}
              name="confirmPassword"
              placeholder="Confirm password"
              type="text"
              inputType="input"
            />
            <Button className="bg-grandis text-gray-700 font-semibold hover:bg-brandis hover:bg-opacity-75">
              <Loader loading={loading}>Change Password</Loader>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChangePassword;
