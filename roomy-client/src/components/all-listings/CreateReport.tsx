"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import {
  CreateReportRequest,
  useCreateReportMutation,
} from "@/store/services/report-service";
import { useEffect, useState } from "react"; // Import useState hook
import { LoadingSpinner } from "../ui/loading";
import toast, { Toaster } from "react-hot-toast";
import { FileTextIcon } from "../ui/icon";

export interface CreateReportProps {
  postId: string;
}

export function CreateReport(props: CreateReportProps) {
  console.log(props.postId, "props.postId");
  const [
    createReport,
    {
      data: report,
      error: reportError,
      isLoading: reportLoading,
      isError: isReportError,
      isSuccess: isReportSuccess,
    },
  ] = useCreateReportMutation();

  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (reportError) {
      console.log(reportError, "reportError");
      if ("data" in reportError) {
        console.log(
          (reportError.data as { message: unknown })?.message?.toString(),
          "reportError.data"
        );
        toast.error(
          (reportError.data as { message: unknown })?.message?.toString() ||
            "An error occurred."
        );
      } else {
        toast.error("An error occurred.");
      }
    }
    if (isReportSuccess) {
      toast.success("Successfully Reported!");
    }
    setIsOpen(false);
  }, [isReportError, isReportSuccess]);

  useEffect(() => {
    console.log(isOpen, "isOpen");
  }, [isOpen]);

  function handleCreatePost() {
    const reportData: CreateReportRequest = {
      postId: props.postId,
      description: description,
    };
    console.log(reportData, "reportData");
    createReport(reportData);
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Report</DialogTitle>
            <DialogDescription>
              If you think this property has some issue please report with
              description
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Input
                id="name"
                className="col-span-3"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreatePost}>
              {reportLoading ? <LoadingSpinner /> : "Report"}
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        size="lg"
        onClick={() => setIsOpen(true)}
        style={{ minWidth: "200px", maxWidth: "200px" }}
      >
        <FileTextIcon className="h-4 w-4 mr-2" />
        Report Property
      </Button>{" "}
    </>
  );
}
