"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}
function NewIssue() {
  const { register, handleSubmit, control } = useForm<IssueForm>();
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
        placeholder="Title "
        {...register("title")}
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      ></Controller>

      <Button>Submit</Button>
    </form>
  );
}

export default NewIssue;
