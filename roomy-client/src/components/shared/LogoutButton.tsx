"use client";
import { logout } from "@/store/slices/auth";
import { AppDispatch, useAppSelector } from "@/store/store";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  function handleLogout() {
    console.log("Logging out");
    dispatch(logout());
    router.push("/login");
  }

  return (
    <>
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
