import { useGetDynasties } from "@api/hooks"
import React from "react"
import { Dashboard } from "../components/Dashboard"

export const DashboardContainer = () => {
  const { data } = useGetDynasties();

  console.log(data);

  return <Dashboard />
}