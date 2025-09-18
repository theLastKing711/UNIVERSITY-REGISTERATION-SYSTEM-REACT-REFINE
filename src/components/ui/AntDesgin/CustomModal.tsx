import { DeleteButton } from "@refinedev/antd";
import { Button, Modal, ModalProps } from "antd";
import React from "react";

export type CustomModalProsp = {
  resourseTitle: string;
  title: ModalProps["title"];
  onCancel: ModalProps["onCancel"];
  onClose: () => void;
  id: number;
  submitLoading: boolean;
  onSubmit: () => void;
  children: React.ReactNode;
  onDeleteSuccessMessage: string;
};

const CustomModal = ({
  title,
  resourseTitle,
  children,
  submitLoading,
  id,
  onDeleteSuccessMessage,
  onSubmit,
  onClose,
}: CustomModalProsp) => {
  return (
    <Modal
      open={true}
      footer={[
        <Button key="back" onClick={() => onClose()}>
          رجوع
        </Button>,
        <DeleteButton
          recordItemId={id}
          onSuccess={() => onClose()}
          successNotification={{
            type: "success",
            // message: onDeleteSuccessMessage,
            // message: `تم حذف ${resourseTitle}
            message: onDeleteSuccessMessage,
          }}
        >
          حذف
        </DeleteButton>,
        <Button
          key="submit"
          type="primary"
          loading={submitLoading}
          onClick={() => onSubmit()}
        >
          إرسال
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
