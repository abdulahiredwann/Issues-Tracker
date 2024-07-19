import React from "react";
import dynamic from "next/dynamic";
import IssueFormSkeloten from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeloten></IssueFormSkeloten>,
});
const NewIssue = () => {
  return <IssueForm />;
};

export default NewIssue;
