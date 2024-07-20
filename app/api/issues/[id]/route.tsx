import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";
import { UpdateSchema } from "../schema";
import delay from "delay";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  const body = await request.json();

  const validation = UpdateSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const { assignedToUserId } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }
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
      assignedToUserId,
    },
  });

  return NextResponse.json({ updateIssue }, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
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
