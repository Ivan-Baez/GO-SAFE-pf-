"use client"
import { toast } from "react-toastify";

export const toastSuccess = (message) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  });

export const toastError = (message) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
  });
