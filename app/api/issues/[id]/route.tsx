import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";
import { IssueSchema } from "../schema";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validation = IssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updateIssue = await prisma.issue.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json({ updateIssue }, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Not FOund" });
  }
  const deleteIssue = await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({});
}
