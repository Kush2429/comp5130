"use client";

import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
import Subscribe from "@/components/homepage/Subscribe";
import Image from "next/image";
import AddressSearch from "@/components/homepage/AddressSearch";

export default function Component() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28">
        <div className="grid grid-cols-12 gap-8">
          {/* Column layout for small devices */}
          <div className="col-span-12 md:col-span-6">
            <div className="text-center py-16 md:py-24">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                Rooms for Rent
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Find and rent your perfect room
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-full max-w-md">
                  <AddressSearch></AddressSearch>
                </div>
              </div>
            </div>
          </div>
          {/* Column layout for medium and large devices */}
          <div className="hidden md:block md:col-span-6">
            <img
              src="https://cdn-assets.roomster.com/dist/65a6ebfefa0cf4b3afe8346a5d4d8fac.svg"
              alt="Placeholder"
              className="w-full h-auto"
              style={{ maxWidth: "100%", height: "auto", maxHeight: "350px" }}
            />
          </div>
        </div>
        {/* Full-width image for small devices */}
        <img
          src="https://cdn-assets.roomster.com/dist/65a6ebfefa0cf4b3afe8346a5d4d8fac.svg"
          alt="Placeholder"
          className="block md:hidden w-full h-auto"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 mt-40">
        <Card className="md:col-span-1">
          <CardContent
            style={{
              backgroundImage: `url('https://cdn-assets.roomster.com/dist/c83dfbcd25508573fb5efac548702beb.png')`,
              backgroundRepeat: "no-repeat center 49% / 100% !important",
              height: "300px",
              width: "100%",
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "100px",
              borderBottomRightRadius: "0px",
              borderBottomLeftRadius: "100px",
              backgroundPositionX: "center",
              backgroundPositionY: "100%",
              backgroundSize: "102%",
              backgroundAttachment: "initial",
              backgroundOrigin: "initial",
              backgroundClip: "initial",
              backgroundColor: "rgb(211, 211, 211)",
            }}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-md"
          >
            <div className="flex items-center justify-center space-x-4">
              <Badge
                className="h-16 w-16 rounded-full bg-[#f3f4f6] flex items-center justify-center"
                variant="secondary"
              >
                <HomeIcon className="h-8 w-8 text-gray-500" />
              </Badge>
              <h2 className="text-lg font-semibold">List a place</h2>
            </div>
            <Link href="/add-listing">
              <Button className="mt-4 text-lg font-semibold border rounded-lg">
                List a place
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardContent
            style={{
              backgroundImage: `url('https://cdn-assets.roomster.com/dist/3bc37a2da21ca15523d031141ed4535b.png')`,
              backgroundRepeat: "no-repeat center 49% / 100% !important",
              height: "300px",
              width: "100%",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "100px",
              borderBottomLeftRadius: "0px",
              backgroundPositionX: "center",
              backgroundPositionY: "49%",
              backgroundSize: "100%",
              backgroundAttachment: "initial",
              backgroundOrigin: "initial",
              backgroundClip: "initial",
              backgroundColor: "rgb(211, 211, 211)",
            }}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-md"
          >
            <div className="flex items-center justify-center space-x-4">
              <Badge
                className="h-16 w-16 rounded-full bg-[#f3f4f6] flex items-center justify-center"
                variant="secondary"
              >
                <SearchIcon className="h-8 w-8 text-gray-500" />
              </Badge>
              <h2 className="text-lg font-semibold">Find a place</h2>
            </div>
            <Link href="/all-listings">
              <Button className="mt-4 text-lg font-semibold border rounded-lg">
                Find a place
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Subscribe />

      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-24 lg:px-6 ">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">
            Frequently asked questions
          </h2>
          <div className="max-w-screen-md mx-auto">
            <div
              id="accordion-flush"
              data-accordion="collapse"
              data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              data-inactive-classes="text-gray-500 dark:text-gray-400"
            >
              <h3 id="accordion-flush-heading-1">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  data-accordion-target="#accordion-flush-body-1"
                  aria-expanded="true"
                  aria-controls="accordion-flush-body-1"
                  onClick={() => {
                    const body = document.getElementById(
                      "accordion-flush-body-1"
                    );
                    if (body) {
                      body.classList.toggle("hidden");
                    }
                  }}
                >
                  <span>Can post a listing for free?</span>
                  <svg
                    data-accordion-icon=""
                    className="w-6 h-6 rotate-180 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h3>
              <div
                id="accordion-flush-body-1"
                className=""
                aria-labelledby="accordion-flush-heading-1"
              >
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Yes, you can post a listing for free. We offer a free plan
                    that allows you to post a listing with basic information
                    about the property. You can also upgrade to a paid plan to
                    get more features.
                  </p>
                </div>
              </div>
              <h3 id="accordion-flush-heading-2">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                  data-accordion-target="#accordion-flush-body-2"
                  aria-expanded="false"
                  aria-controls="accordion-flush-body-2"
                  onClick={() => {
                    const body = document.getElementById(
                      "accordion-flush-body-2"
                    );
                    if (body) {
                      body.classList.toggle("hidden");
                    }
                  }}
                >
                  <span>Can I contact the listing owner?</span>
                  <svg
                    data-accordion-icon=""
                    className="w-6 h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h3>
              <div
                id="accordion-flush-body-2"
                className="hidden"
                aria-labelledby="accordion-flush-heading-2"
              >
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    You need to create an account and be subscribed to a paid
                    plan to contact the listing owner. Once you are subscribed,
                    you can send a message to the owner through our platform.
                  </p>
                </div>
              </div>
              <h3 id="accordion-flush-heading-3">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                  data-accordion-target="#accordion-flush-body-3"
                  aria-expanded="false"
                  aria-controls="accordion-flush-body-3"
                  onClick={() => {
                    const body = document.getElementById(
                      "accordion-flush-body-3"
                    );
                    if (body) {
                      body.classList.toggle("hidden");
                    }
                  }}
                >
                  <span>
                    Is there an enterprise version of Roomy available?
                  </span>
                  <svg
                    data-accordion-icon=""
                    className="w-6 h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h3>
              <div
                id="accordion-flush-body-3"
                className="hidden"
                aria-labelledby="accordion-flush-heading-3"
              >
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Yes, we offer an enterprise version of Roomy. This version
                    includes additional features, such as custom branding,
                    single sign-on, and dedicated support. Contact us for more
                    information.
                  </p>
                </div>
              </div>
              <h3 id="accordion-flush-heading-4">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                  data-accordion-target="#accordion-flush-body-4"
                  aria-expanded="false"
                  aria-controls="accordion-flush-body-4"
                  onClick={() => {
                    const body = document.getElementById(
                      "accordion-flush-body-4"
                    );
                    if (body) {
                      body.classList.toggle("hidden");
                    }
                  }}
                >
                  <span>Can the user upload photos of the property?</span>
                  <svg
                    data-accordion-icon=""
                    className="w-6 h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h3>
              <div
                id="accordion-flush-body-4"
                className="hidden"
                aria-labelledby="accordion-flush-heading-4"
              >
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Yes, users can upload photos of the property when creating a
                    listing. We recommend uploading high-quality images to
                    showcase the property to potential tenants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="text-center">
            <a
              href="#"
              className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <Image
                width={36}
                height={36}
                src="https://demo.themesberg.com/landwind/images/logo.svg"
                className="h-6 mr-3 sm:h-9"
                alt="Landwind Logo"
              />
              Roomy
            </a>
            <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
              © 2024 Roomy™. All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
