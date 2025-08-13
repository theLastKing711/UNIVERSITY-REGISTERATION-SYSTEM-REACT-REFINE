import React from "react";

export type FormItemsContainerProps = {
  children: React.ReactNode;
};

const FormItemsContainer = ({ children }: FormItemsContainerProps) => {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: 8,
        gap: "1rem",
      }}
    >
      {children}
    </div>
  );
};

export default FormItemsContainer;
