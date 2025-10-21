import React from "react";
import { useGetDepratments } from "../../hooks/API/select/useGetDepartments";
import { useGetAcademicYearSemesters } from "../../hooks/API/select/useGetAcademicYearSemesters";
import { Form } from "antd";
import CustomSearchSelect from "../ui/AntDesgin/CustomSearchSelect";
import { useGo, useParsed } from "@refinedev/core";
import { useGetGlobalQueryFilters } from "../../hooks/useGetGlobalQueryFilters";

const FilterForm = () => {
  const {
    department_id_query_parameter,
    academic_year_semester_id_query_parameter,
  } = useGetGlobalQueryFilters();

  const { resource } = useParsed();

  const { departmentSelectProps } = useGetDepratments();

  const { academicYearSemestersSelectProps } = useGetAcademicYearSemesters();

  const go = useGo();

  return (
    <>
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
    </>
  );
};

export default FilterForm;
