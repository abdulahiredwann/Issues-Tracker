"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Button, Callout, TextField } from "@radix-ui/themes";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Issue } from "@prisma/client";
import { Spinner } from "@/app/Components";

interface IssueFormData {
  title: string;
  description: string;
}

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const { register, handleSubmit, control } = useForm<IssueFormData>();
  const router = useRouter();
  const [errors, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <form
      className="max-w-lg space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          setSubmitting(true);
          if (issue) {
            await axios.put(`/api/issues/${issue.id}`, data);
          } else {
            await axios.post("/api/issues", data);
            router.push("/issues");
            router.refresh();
          }
        } catch (err) {
          setSubmitting(false);
          setError("An unexpected error occurred");
        }
      })}
    >
      {errors && (
        <Callout.Root color="red">
          <Callout.Text>{errors}</Callout.Text>
        </Callout.Root>
      )}
      <TextField.Root
        defaultValue={issue?.title}
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      {isClient && (
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        ></Controller>
      )}
      <Button disabled={isSubmitting}>
        {issue ? "Update Issue" : "Submit New Issue"}
        {isSubmitting && <Spinner></Spinner>}
      </Button>
    </form>
  );
};

export default IssueForm;
