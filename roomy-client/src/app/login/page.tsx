import NEWLoginForm from "@/components/login/NEWLoginForm";

export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: "#101010" }}>
      <div className="flex w-full max-w-5xl h-auto bg-white rounded-lg shadow-md ">
        <div
          className="w-full lg:w-1/2 lg:flex-shrink-0"
          style={{
            backgroundImage: `url('https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/hotelbg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: 0,
          }}
        >
          <button className="englishbutton">English</button>
          <button className="englishbutton button2">हिंदी</button>
          <button className="englishbutton button2">española</button>
        </div>
        <NEWLoginForm></NEWLoginForm>
      </div>
    </div>
  );
}
