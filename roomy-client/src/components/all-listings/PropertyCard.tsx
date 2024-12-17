"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UpdatePostRequest, useDeletePostMutation, useUpdatePostMutation } from "@/store/services/post-service";
import toast, { Toaster } from "react-hot-toast";
import { Label } from "../ui/label";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Input } from "../ui/input";
import { useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "../ui/icon";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { setAll } from "@/store/slices/editListing-slice";
import { closeModalOnClick, setIsModalOpen } from "@/store/slices/addListing-slice";

interface CardProps {
  key: string;
  propertyId: string;
  title: string;
  description: string;
  price: string;
  bedCount?: number;
  bathCount?: number;
  movindate?: Date;
  imageSrc: string;
  isTag?: string;
  isApproved?: boolean;
}

export function PropertyCard({
  propertyId,
  title,
  description,
  price,
  bedCount,
  bathCount,
  movindate,
  imageSrc,
  isTag,
  isApproved,
}: CardProps) {
  const isModalOpen = useAppSelector((state) => state.addListingSlice.isModalOpen);
  const dispatch = useDispatch();
  return (
    <>
      <Toaster></Toaster>
      <div className="relative group overflow-hidden rounded-lg shadow-lg">
        {(isTag != "true" && (
          <Link className="absolute inset-0 z-10" href={`/all-listings/${propertyId}`}>
            <span className="sr-only">View property</span>
          </Link>
        )) || <div></div>}

        <img
          alt="Property 2"
          className="object-cover w-full h-60"
          height={300}
          src={imageSrc}
          style={{
            aspectRatio: "400/300",
            objectFit: "cover",
          }}
          width={400}
        />

        <div className="bg-white p-4 dark:bg-gray-950 relative flex items-center">
          <div>
            <h3 className="font-semibold text-lg md:text-xl">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{price}</p>
          </div>
          {isTag == "true" && (
            <>
              <Button
                onClick={() => {
                  // handleEdit(!isModalOpen);
                  console.log("clicked", propertyId);
                  dispatch(setIsModalOpen(!isModalOpen));
                  dispatch(
                    setAll({
                      propertyId: propertyId,
                      price: parseInt(price.replace("$", "")) || 0,
                      bathCount: bathCount || 0,
                      bedCount: bedCount || 0,
                      movinDate: movindate || new Date(),
                    })
                  );
                }}
                style={{
                  backgroundColor: "white",
                  marginLeft: "148px",
                }}
              >
                <span
                  className={`${
                    isApproved ? "bg-green-500" : "bg-red-500"
                  } text-white text-xs font-semibold px-2 py-1 rounded-full ml-auto`}
                >
                  {isApproved ? "Approved" : "Pending"}
                </span>
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export function PopUpConfirmation() {
  const [
    deletePost,
    {
      data: deleteData,
      error: deleteError,
      isLoading: deleteLoading,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeletePostMutation();
  const editData = useAppSelector((state) => state.editListingSlice);

  function handleDelete() {
    deletePost(editData.propertyId);
    console.log(editData.propertyId, "propertyId from handle");
  }
  const isModalOpen = useAppSelector((state) => state.addListingSlice.isModalOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isDeleteError) {
      toast.error("Error deleting post");
      dispatch(closeModalOnClick());
    }
    if (deleteData || isDeleteSuccess) {
      toast.success("Post deleted successfully");
      dispatch(closeModalOnClick());
    }
  }, [isDeleteError, deleteData]);

  function handleEdit(isOpen: boolean) {
    dispatch(setIsModalOpen(isOpen));
  }

  return (
    <>
      <AlertDialog open={isModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be able to edit or delete this post. Deleting post can be undone and you'll have to recreate
              it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleDelete()}>
              {deleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogCancel>
            <EditDrawer />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function EditDrawer() {
  const editData = useAppSelector((state) => state.editListingSlice);
  const isModalOpen = useAppSelector((state) => state.addListingSlice.isModalOpen);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    price: editData.price,
    bathCount: editData.bathCount,
    bedCount: editData.bedCount,
    startDateRange: editData.movinDate,
  });
  const [date, setDate] = useState<any>(editData.movinDate);

  const [
    updatePost,
    {
      data: updateData,
      error: updateError,
      isLoading: updateLoading,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdatePostMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdateError) {
      toast.error("Error updating post");
      dispatch(closeModalOnClick());
    }
    if (updateData || isUpdateSuccess) {
      toast.success("Post updated successfully");
      dispatch(closeModalOnClick());
    }
  }, [isUpdateError, updateData]);

  function handleClose(e: any) {
    e.preventDefault();
    dispatch(setIsModalOpen(!isModalOpen));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatePostData: UpdatePostRequest = {
      id: editData.propertyId,
      startDateRange: date
        ? date.toISOString().split("T")[0]
        : formData.startDateRange.toISOString().split("T")[0],
      price: formData.price,
      bathCount: formData.bathCount,
      bedCount: formData.bedCount,
    };
    console.log(updatePostData, "updatePostData from editDrawer");
    updatePost(updatePostData);
  };
  return (
    <>
      <Drawer open={isOpen}>
        <DrawerTrigger>
          <div
            onClick={() => {
              setIsOpen(true);
            }}
            style={{
              backgroundColor: "#5c4cda",
              border: "1px solid #5c4cda",
              borderRadius: "4px",
              padding: "6px 16px",
              color: "white",
            }}
          >
            Edit
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex items-center justify-center">
            <DrawerTitle>Edit Property Details</DrawerTitle>
          </DrawerHeader>

          <div
            className="p-4 flex flex-col items-center justify-center"
            style={{ width: "200px", margin: "0 auto" }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="items-center justify-center">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} />
              </div>
              <div className="items-center justify-center">
                <Label htmlFor="bathcount">Bath Count</Label>
                <Input
                  id="bathcount"
                  name="bathCount"
                  type="number"
                  value={formData.bathCount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="items-center justify-center">
                <Label htmlFor="bedcount">Bed Count</Label>
                <Input
                  id="bedcount"
                  name="bedCount"
                  type="number"
                  value={formData.bedCount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="move-in-date">Move-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={editData.movinDate} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center ">
                <Button type="submit" style={{ marginRight: "8px" }}>
                  Submit
                </Button>
                <Button onClick={handleClose} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
