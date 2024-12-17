"use client";
import React, { use, useEffect, useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import validator from "validator";
import { useRegisterMutation } from "@/store/services/auth";
import { RegisterReq } from "@/models/login/login";
import { redirect } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { data: registerData, error: registerError, isLoading: registerLoading }] =
    useRegisterMutation();

  useEffect(() => {
    if (registerError) {
      toast.error("An error occurred while registering");
    }
  }, [registerError]);

  useEffect(() => {
    if (registerData?.success) {
      redirect("/login");
    }
  }, [registerData]);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!name) {
      toast.error("Please enter your name");
      return;
    }
    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const registerData: RegisterReq = { name, email, password };
    const response = await register(registerData);
  };

  return (
    <>
      <Container maxWidth="xs">
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Container>
      <Toaster />
    </>
  );
}
