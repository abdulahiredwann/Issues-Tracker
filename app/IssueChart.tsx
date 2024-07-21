"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
interface Props {
  open: number;
  inProgress: number;
  close: number;
}
function IssueChart({ close, inProgress, open }: Props) {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: close },
  ];
  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <XAxis dataKey={"label"}></XAxis>
          <YAxis></YAxis>
          <Bar
            style={{ fill: "var(--accent-9)" }}
            barSize={"60"}
            dataKey={"value"}
          ></Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default IssueChart;
