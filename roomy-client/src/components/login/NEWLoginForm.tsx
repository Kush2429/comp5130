"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLoginMutation } from "@/store/services/auth";
import toast, { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import { setAuthToken } from "@/lib/cookies";
import Link from "next/link";

export default function NEWLoginForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setLoginData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [login, { data: loginServerData, error: loginError, isLoading: loginLoading }] = useLoginMutation();
  useEffect(() => {
    if (loginError) {
      toast.error("Please register");
    }
  }, [loginError]);

  useEffect(() => {
    if (loginServerData?.success) {
      setAuthToken(loginServerData.token);
      redirect("/");
    }
  }, [loginServerData]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(loginData);
    login(loginData);
  };

  return (
    <>
      <Toaster></Toaster>
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2 pl-12 p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              type="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              type="password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" name="rememberMe" checked={false} onChange={handleChange} />
              <label className="text-sm font-medium leading-none" htmlFor="remember-me">
                Remember Me
              </label>
            </div>
            <Button className="text-sm" variant="ghost">
              Forgot Password?
            </Button>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="text-center">
            <p className="text-sm">
              Don't have an account?
              <Link href={"/register"}>
                <Button className="font-medium text-blue-600" variant="ghost">
                  Sign Up
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
