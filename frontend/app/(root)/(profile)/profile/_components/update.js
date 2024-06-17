import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "@/components/ui/input"
import { axiosInstance } from "@/lib/axios"
import { toast } from "sonner"

export const UpdateProfile = ({ user }) => {

  const token = localStorage.getItem('token')

  const updateHanddle = async (e) => {
    e.preventDefault()

    const payload = {
      profilePicture: e.target.profilePicture.value,
      name: e.target.name.value,
      address: e.target.address.value
    }

    try {
      await axiosInstance.patch(`${process.env.NEXT_PUBLIC_SERVER}/users/current`, payload, { headers: {Authorization: `bearer ${token}`} })
      window.location.reload()
    } catch (e) {
      if (e.response) toast.error(e.response.data.errors)
      console.log(e);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="mt-4">
          Update Profile
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={updateHanddle} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={user?.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profilePicture" className="text-right">
              Profile Picture
            </Label>
            <Input id="profilePicture" value={user?.profilePicture} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input id="address" value={user?.address} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" name="email" value={user?.email} className="col-span-3" />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
