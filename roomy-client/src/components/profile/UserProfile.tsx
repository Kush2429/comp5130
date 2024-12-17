"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UpdateUserReq, useGetUserQuery, useUpdateUserMutation } from "@/store/services/user-service";
import { use, useEffect, useState } from "react";
import { useCreateCheckoutSessionMutation } from "@/store/services/stripe-service";
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isPaymentSuccess = searchParams.get("success");
  const [createCheckoutSession, { data, isLoading, isError, error, isSuccess }] =
    useCreateCheckoutSessionMutation();
  function handlePayment() {
    createCheckoutSession();
  }
  useEffect(() => {
    if (isError) {
      if (error && "status" in error && error.status === 409) {
        toast.success("You already have an active subscription.");
        window.open((error as { data: { redirectUrl: string } }).data.redirectUrl, "_blank");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
    if (isSuccess) {
      toast.success("Checkout session created successfully.");
      const url = `https://checkout.stripe.com/c/pay/${data.id}#fidkdWxOYHwnPyd1blpxYHZxWjA0VTF8PDNMc3RzcURzQk1Kbn9Tbm5uYEt3NXxyNHNJcXUxaDNAajJhYz1kSjdjfTdQbG5XcnVdam9mNUNcZHBRUE5hc39HUjByMmw1dkd0NEtNaFxAVHFHNTU9fVNNSkIwQScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl`;
      router.push(url);
    }
    if (isPaymentSuccess == "true") {
      toast.success("Payment was successful.");
      router.push("/");
    }
    if (isPaymentSuccess == "false") {
      toast.error("Payment was not successful. Please try again.");
      router.push("/");
    }
  }, [isError, data, isSuccess, isPaymentSuccess, error, router]);

  const { data: userData, isLoading: userLoading, isError: isUserError } = useGetUserQuery();
  const [
    updateUser,
    { data: updatedUser, error: updateError, isLoading: updateLoading, isSuccess: updateSuccess },
  ] = useUpdateUserMutation();

  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (userData) {
      setPhone(userData.phone || "");
      setName(userData.name || "");
    }
    if (updateLoading) {
      toast.loading("Loading...");
    }
    if (updatedUser) {
      toast.dismiss();
      toast.success("User updated successfully.");
    }
  }, [userData, updatedUser, updateLoading]);
  if (userLoading) {
    return <ProfileSkeleton />;
  }
  if (isUserError) {
    return <ErrorComponent message={"Cannot Fetch User...Please try again"} />;
  }

  function handleUpdateUser(): void {
    const updateUserDetails: UpdateUserReq = {
      phone: phone,
      name: name,
    };
    console.log(updateUserDetails, "updateUserDetails");
    updateUser(updateUserDetails);
  }

  return (
    <>
      <Toaster></Toaster>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6 my-12">
          <div className="flex items-center justify-center">
            <Avatar className="h-20 w-20">
              <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <div className="flex items-center gap-2">
                  <Input onChange={(e) => setName(e.target.value)} defaultValue={userData?.name} id="name" />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input defaultValue={userData?.email} disabled id="email" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                  <Input onChange={(e) => setPhone(e.target.value)} defaultValue={userData?.phone} id="phone" />
                  <Button
                    onClick={handleUpdateUser}
                    className="bg-pink-500 hover:bg-pink-600 text-white"
                    size="sm"
                  >
                    {updateLoading ? "Updating..." : "Update"}
                  </Button>
                </div>
              </div>
            </div>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full" onClick={handlePayment}>
              Manage Subscription Plans
            </Button>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full">Logout</Button>
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6 my-12 animate-pulse">
      <div className="flex items-center justify-center">
        <div className="h-20 w-20 bg-gray-300 rounded-full"></div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <label className="block text-sm text-gray-300" htmlFor="name">
              Name
            </label>
            <div className="flex items-center gap-2">
              <div className="h-8 bg-gray-300 w-40 rounded-md"></div>
              <div className="h-8 bg-pink-500 hover:bg-pink-600 text-white rounded-md cursor-pointer w-20"></div>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-gray-300" htmlFor="email">
            Email
          </label>
          <div className="h-8 bg-gray-300 rounded-md"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <label className="block text-sm text-gray-300" htmlFor="phone">
              Phone Number
            </label>
            <div className="flex items-center gap-2">
              <div className="h-8 bg-gray-300 w-40 rounded-md"></div>
              <div className="h-8 bg-pink-500 hover:bg-pink-600 text-white rounded-md cursor-pointer w-20"></div>
            </div>
          </div>
        </div>
        <div className="h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-md cursor-pointer w-full"></div>
      </div>
    </div>
  );
}

export function ErrorComponent({ message }: { message: string }) {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-red-100 rounded-lg shadow-lg space-y-6 my-12">
      <div className="text-red-700 font-semibold text-lg">{message}</div>
    </div>
  );
}
