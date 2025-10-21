import React from "react";
import { useGetGlobalQueryFilters } from "../../hooks/useGetGlobalQueryFilters";
import { Space, Button, Form, Modal } from "antd";
import CustomSearchSelect from "../ui/AntDesgin/CustomSearchSelect";
import { useGetDepratments } from "../../hooks/API/select/useGetDepartments";
import { useGetAcademicYearSemesters } from "../../hooks/API/select/useGetAcademicYearSemesters";
import { useGo, useParsed, useTranslation } from "@refinedev/core";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export type FilterModalProps = {
  onClose: () => void;
};

const FilterModal = ({ onClose }: FilterModalProps) => {
  const { translate } = useTranslation();

  const { departmentSelectProps } = useGetDepratments();

  const { academicYearSemestersSelectProps } = useGetAcademicYearSemesters();

  const go = useGo();

  const {
    department_id_query_parameter,
    academic_year_semester_id_query_parameter,
  } = useGetGlobalQueryFilters();

  const { resource } = useParsed();

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
      <Space size="middle" direction="vertical">
        <Form.Item label="القسم" style={{ marginBottom: 0 }}>
          <CustomSearchSelect
            {...departmentSelectProps}
            placeholder="اختر قسم"
            allowClear
            onClear={() => {
              go({
                // to: currentPath,
                to: resource?.name,
              });
            }}
            style={{ width: 300 }}
            value={department_id_query_parameter}
            onChange={(department_id) => {
              localStorage.setItem(
                "department_id_query_parameter",
                department_id as unknown as string
              );
              go({
                // to: currentPath,
                to: resource?.name,
                query: {
                  department_id: department_id,
                },
                options: {
                  keepQuery: true,
                  keepHash: true,
                },
              });
            }}
          />
        </Form.Item>
        <Form.Item label="السنةوالفصل الدراسي" style={{ marginBottom: 0 }}>
          <CustomSearchSelect
            {...academicYearSemestersSelectProps}
            placeholder="اختر السنة والفصل الدراسي "
            allowClear
            onClear={() => {
              go({
                // to: currentPath,
                to: resource?.name,
              });
            }}
            style={{ width: 300 }}
            value={academic_year_semester_id_query_parameter}
            onChange={(academic_year_semester_id) => {
              localStorage.setItem(
                "academic_year_semester_id_query_parameter",
                academic_year_semester_id as unknown as string
              );
              go({
                // to: currentPath,
                to: resource?.name,
                query: {
                  academic_year_semester_id,
                },
                options: {
                  keepQuery: true,
                  keepHash: true,
                },
              });
            }}
          />
        </Form.Item>
      </Space>
    </Modal>
  );
};

export default FilterModal;
