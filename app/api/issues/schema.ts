import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string().min(5),
});


export const UpdateSchema = z.object({
  title: z.string().min(5).max(255).optional(),
  description: z.string().min(5).optional(),
  assignedToUserId: z.string().min(1).max(255).optional().nullable()
})
export type IssueType = z.infer<typeof IssueSchema>;