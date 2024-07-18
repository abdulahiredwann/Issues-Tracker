"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Issue } from "@prisma/client";

interface IssueFormData {
  title: string;
  description: string;
}

interface Props {
  issue?: Issue;
}
function IssueForm({ issue }: { issue?: Issue }) {
  const { register, handleSubmit, control } = useForm<IssueFormData>();
  const navigate = useRouter();
  const [errors, setError] = useState("");
  return (
    <form
      className="max-w-lg space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post("/api/issues", data);

          navigate.push("/issues");
        } catch (err) {
          setError("An expected error occure ");
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
        placeholder="Title "
        {...register("title")}
      ></TextField.Root>
      <Controller
        name="description"
        defaultValue={issue?.description}
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      ></Controller>

      <Button>Submit</Button>
    </form>
  );
}

export default IssueForm;
