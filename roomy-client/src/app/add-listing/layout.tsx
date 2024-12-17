import NEWFixedBar from "@/components/add-listing/NEWFixedBar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* <NEWFixedBar></NEWFixedBar> */}
      {children}
    </>
  );
}
