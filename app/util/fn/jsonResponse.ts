import { json, ResponseInit } from "@remix-run/node";

export type ActionJsonResponse = JsonResponse;

export interface JsonResponse {
  target: "toast";
  type: "success" | "error";
  message?: string;
}

export const toastResponse = (
  type: "success" | "error",
  message?: string,
  init?: ResponseInit
) => json({ target: "toast", message, type }, init);
