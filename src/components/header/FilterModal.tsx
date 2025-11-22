import React from "react";
import { Button, Modal } from "antd";
import { useTranslation } from "@refinedev/core";
import FilterForm from "./FilterForm";

export type FilterModalProps = {
  onClose: () => void;
};

const FilterModal = ({ onClose }: FilterModalProps) => {
  const { translate } = useTranslation();
  return (
    <Modal
      open={true}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={() => onClose()}>
          {translate("buttons.close")}
        </Button>,
      ]}
    >
      <FilterForm containerProps={{ size: "middle", direction: "vertical" }} />
    </Modal>
  );
};

export default FilterModal;
