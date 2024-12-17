// import { PropertyCardList } from "@/components/all-listings/PropertyCardList";

// export default function Component() {
//   return (
//     <div className="flex flex-col min-h-[100dvh]">
//       <main className="flex-1">{PropertyCardList()}</main>
//     </div>
//   );
// }
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-700">
      <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
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
                <Input defaultValue="John Doe" id="name" />
                <Button className="bg-gray-800 hover:bg-gray-900 text-white" size="sm">
                  Update
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input defaultValue="john@example.com" disabled id="email" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex items-center gap-2">
                <Input defaultValue="+1 (555) 123-4567" id="phone" />
                <Button className="bg-gray-800 hover:bg-gray-900 text-white" size="sm">
                  Update
                </Button>
              </div>
            </div>
          </div>
          <Button className="bg-gray-800 hover:bg-gray-900 text-white w-full">Logout</Button>
        </div>
      </div>
    </div>
  )
}

