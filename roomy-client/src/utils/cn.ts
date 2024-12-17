// import clsx from "clsx";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));

// export const cn = (...classes: clsx.ClassValue[]) => twMerge(clsx(classes));
