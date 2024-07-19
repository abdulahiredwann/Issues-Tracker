"use client";
import { Spinner } from "@/app/Components";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMdeReact from "react-simplemde-editor";

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
            router.push("/issues/list");
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
            <SimpleMdeReact placeholder="Description" {...field} />
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
