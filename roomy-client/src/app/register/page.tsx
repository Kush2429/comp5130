import NEWRegisterForm from "@/components/register/NewRegisterForm";

export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: "#202020" }}>
      <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-md">
        <div
          className="w-full lg:w-1/2 lg:flex-shrink-0"
          style={{
            backgroundImage: `url('https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/hotelbg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: 0,
          }}
        ></div>
        <NEWRegisterForm></NEWRegisterForm>
      </div>
    </div>
  );
}
