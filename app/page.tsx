"use client";
import React from "react";
import Pagination from "@/app/Components/Pagination"; // Ensure correct path
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const currentPage = page ? parseInt(page, 10) : 1;

  return (
    <>
      <Pagination itemCount={100} pageSize={10} currentPage={currentPage} />
    </>
  );
}
