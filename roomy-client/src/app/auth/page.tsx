// import LoginForm from "@/components/login/LoginForm";

// export default function LoginPage() {
//   return <LoginForm></LoginForm>;
// }
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: '#202020' }}>
      <div className="flex w-full max-w-4xl  bg-white rounded-lg shadow-md">
        <div className="w-full lg:w-1/2 lg:flex-shrink-0" style={{ backgroundImage: `url('https://d1tgh8fmlzexmh.cloudfront.net/ccbp-static-website/hotelbg.png')`, backgroundSize: 'cover', backgroundPosition: 'center', padding: 0 }}>
        </div>
        <div className="w-full lg:w-1/2 pl-12 p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email:</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password:</Label>
              <Input id="password" placeholder="Enter your password" type="password" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <label className="text-sm font-medium leading-none" htmlFor="remember-me">
                  Remember Me
                </label>
              </div>
              <Button className="text-sm" variant="ghost">
                Forgot Password?
              </Button>
            </div>
            <Button className="w-full">Login</Button>
            <div className="text-center">
              <p className="text-sm">
                Don't have an account?
                <Button className="font-medium text-blue-600" variant="ghost">
                  Sign Up
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
