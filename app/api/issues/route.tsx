import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { IssueSchema } from "./schema";

// Define the schema for issue validation

// Define the type for the request body based on the schema
type IssueType = z.infer<typeof IssueSchema>;

export async function POST(request: NextRequest) {
  const body: IssueType = await request.json();

  // Validate the request body
  const validation = IssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // Create a new issue in the database
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
