import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string().min(5),
});

export type IssueType = z.infer<typeof IssueSchema>;