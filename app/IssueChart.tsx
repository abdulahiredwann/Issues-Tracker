"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  close: number;
}

function CustomYAxis(props: any) {
  return <YAxis {...props} />;
}

function CustomXAxis(props: any) {
  return <XAxis {...props} />;
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
          <CustomXAxis dataKey="label" />
          <CustomYAxis />
          <Bar
            style={{ fill: "var(--accent-9)" }}
            barSize={60}
            dataKey="value"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default IssueChart;
