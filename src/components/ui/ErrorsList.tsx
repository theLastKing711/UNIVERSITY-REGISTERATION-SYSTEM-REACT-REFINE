import { ErrorListProps } from "antd/es/form";
import React from "react";

export type ErrorsListProps = {
  errors: [];
};

const ErrorsList = ({ errors }: ErrorListProps) => {
  return <div>ErrorsList</div>;
};

export default ErrorsList;
