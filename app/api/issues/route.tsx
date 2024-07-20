import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { IssueSchema } from "./schema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

// Define the schema for issue validation

// Define the type for the request body based on the schema
type IssueType = z.infer<typeof IssueSchema>;

export async function POST(request: NextRequest) {
  const body: IssueType = await request.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

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
