"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { useRegisterMutation } from "@/store/services/auth";
import { redirect } from "next/navigation";
interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function NEWRegisterForm() {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [
    registerMutation,
    { data: registerData, error: registerError, isLoading: registerLoading, isSuccess: isRegisterSuccess },
  ] = useRegisterMutation();

  useEffect(() => {
    if (registerError) {
      toast.success("You already have an account. Please login.");
      //wait for 2 seconds
      setTimeout(() => {
        redirect("/login");
      }, 2000);
    }
  }, [registerError]);

  useEffect(() => {
    if (registerData?.success || isRegisterSuccess) {
      redirect("/login");
    }
  }, [registerData, isRegisterSuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data:", formData);
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const { confirmPassword, ...dataWithoutConfirmPassword } = formData;
    console.log("Data without confirm password:", dataWithoutConfirmPassword);
    registerMutation(dataWithoutConfirmPassword);
  };

  return (
    <>
      <Toaster></Toaster>
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2 p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name:</Label>
            <Input
              onChange={handleChange}
              id="name"
              name="name"
              placeholder="Enter your name"
              type="text"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email:</Label>
            <Input
              onChange={handleChange}
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password:</Label>
            <Input
              onChange={handleChange}
              id="password"
              name="password"
              placeholder="Enter your password"
              type="password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password:</Label>
            <Input
              onChange={handleChange}
              id="confirm-password"
              name="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </div>
      </form>
    </>
  );
}
