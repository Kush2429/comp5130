"use client";
import { WhatsappShareButton } from "react-share";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  ClipboardIcon,
  HomeIcon,
  BathIcon,
  BedIcon,
  WalletIcon,
  StarIcon,
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  ShareIcon,
  FileTextIcon,
} from "@/components/ui/icon";
import { Button } from "../ui/button";
import Link from "next/link";
import { CreateReport } from "./CreateReport";
import { useLazyGetActiveSubscriptionQuery } from "@/store/services/stripe-service";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
export interface PropertyInfoProps {
  postId: string;
  title: string;
  description: string;
  streetAddress: string;
  unitNo: string;
  city: string;
  stateCode: string;
  zipCode: string;
  startDateRange: Date;
  price: number;
  bedCount: number;
  bathCount: number;
  utilities: string[];
  phoneNumber: string;
}

export default function ProertyBasicInfo({
  basicInfo,
}: {
  basicInfo: PropertyInfoProps;
}) {
  const router = useRouter();
  const [
    getActiveSubscription,
    {
      data: subData,
      isLoading: subscriptionLoading,
      isError: subscriptionError,
    },
  ] = useLazyGetActiveSubscriptionQuery();
  const [randomValue, setRandomValue] = useState<number>(0);
  function handleSubscription() {
    getActiveSubscription();
    setRandomValue(Math.random());
  }
  useEffect(() => {
    if (subscriptionError) {
      toast.error("An error occurred. Please try again.");
    }
    if (subData) {
      if (subData?.active) {
        router.push(`https://wa.me/${basicInfo.phoneNumber}`);
      }
      if (!subData?.active) {
        router.push("/#scrollsub");
        toast.error("You do not have an active subscription.");
      }
    }
  }, [subData, subscriptionError, randomValue]);
  return (
    <>
      <Toaster></Toaster>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
        <Card className="w-full border-2">
          <CardHeader>
            <CardTitle>{basicInfo.title}</CardTitle>
            <CardDescription>{basicInfo.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">
                <MapPinIcon className="h-5 w-5 inline-block mr-2" />
                Address
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                {basicInfo.streetAddress}, {basicInfo.unitNo}
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">
                <CalendarIcon className="h-5 w-5 inline-block mr-2" />
                Availability
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                {basicInfo.startDateRange.toDateString()}
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">
                <StarIcon className="h-5 w-5 inline-block mr-2" />
                Rating
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                4.8 (123 reviews)
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">
                <WalletIcon className="h-5 w-5 inline-block mr-2" />
                Price
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                ${basicInfo.price} per Month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full border-2">
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">
                <HomeIcon className="h-5 w-5 inline-block mr-2" />
                Rent
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                ${basicInfo.price} per month
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">
                <BathIcon className="h-5 w-5 inline-block mr-2" />
                Bath
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                {basicInfo.bathCount}
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">
                <BedIcon className="h-5 w-5 inline-block mr-2" />
                Bed
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                {basicInfo.bedCount}
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">
                <ClipboardIcon className="h-5 w-5 inline-block mr-2" />
                Facilities included within rent:
              </h4>
              <ul className="text-gray-500 dark:text-gray-400">
                {basicInfo.utilities.map((utility) => (
                  <li key={utility}>{utility}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
      <Card className="border-2 p-4 md:p-6 ml-6 mr-6">
        <CardContent className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          {/* <Link href={`https://wa.me/${basicInfo.phoneNumber}`} target="_blank" rel="noopener noreferrer"> */}

          <Button
            onClick={handleSubscription}
            size="lg"
            style={{ minWidth: "200px", maxWidth: "200px" }}
          >
            <PhoneIcon className="h-5 w-5 mr-2" />
            Contact Now
          </Button>
          {/* </Link> */}

          <div className="flex gap-2">
            <WhatsappShareButton
              url={window.location.href}
              title={basicInfo.title}
            >
              <Button
                size="lg"
                style={{ minWidth: "200px", maxWidth: "200px" }}
              >
                <ShareIcon className="h-4 w-4 mr-2" />
                Share
              </Button>
            </WhatsappShareButton>
            <CreateReport postId={basicInfo.postId}></CreateReport>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
