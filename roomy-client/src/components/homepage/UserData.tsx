"use client";
import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { isLoggedIn } from "@/lib/cookies";
import { useGetUserContextQuery } from "@/store/services/auth";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/store";

export default function UserData() {
  const isLoggedInState = isLoggedIn();
  const { data: user, isLoading, error } = useGetUserContextQuery({}, { skip: !isLoggedInState });
  const router = useRouter();

  useEffect(() => {
    console.log("User data:", user);
  }, [user]);

  function handleLogin() {
    router.push("/login");
  }

  if (isLoading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (!isLoggedInState) {
    return (
      <>
        <Button color="inherit" onClick={handleLogin}>
          Login
        </Button>
      </>
    );
  }

  return (
    <>
      <Typography variant="h6">Welcome, {user?.email}</Typography>
      <Button color="inherit" onClick={handleLogin}>
        Logout
      </Button>
    </>
  );
}
