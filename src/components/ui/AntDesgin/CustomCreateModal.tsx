import { useTranslation } from "@refinedev/core";
import { Button, Modal, ModalProps } from "antd";
import React from "react";

export type CustomCreateModalProps = {
  resourseTitle: string;
  title: ModalProps["title"];
  onCancel: ModalProps["onCancel"];
  onClose: () => void;
  submitLoading: boolean;
  onSubmit: () => void;
  children: React.ReactNode;
};

const CustomCreateModal = ({
  title,
  resourseTitle,
  children,
  submitLoading,
  onSubmit,
  onClose,
}: CustomCreateModalProps) => {
  const { translate } = useTranslation();

  return (
    <Modal
      open={true}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={() => onClose()}>
          {translate("buttons.cancel")}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitLoading}
          onClick={() => onSubmit()}
        >
          {translate("buttons.save")}
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default CustomCreateModal;
