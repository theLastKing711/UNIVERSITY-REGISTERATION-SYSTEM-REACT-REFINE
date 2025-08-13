import { Typography } from "antd";
import React from "react";

const { Title } = Typography;

export type FormSectionProps = {
  children: React.ReactNode;
  title: string;
};

const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <section style={{ marginTop: 48 }}>
      <Title level={5} style={{ marginBottom: 16 }}>
        {title}
      </Title>
      {children}
    </section>
  );
};

export default FormSection;
