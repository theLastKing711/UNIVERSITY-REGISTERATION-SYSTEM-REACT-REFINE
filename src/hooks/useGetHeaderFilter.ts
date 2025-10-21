import { useState } from "react";
import { CustomUploadFile } from "../types/shared";
import { useGo, useParsed } from "@refinedev/core";
import { useGetAcademicYearSemesters } from "./API/select/useGetAcademicYearSemesters";
import { useGetDepratments } from "./API/select/useGetDepartments";
import { useGetGlobalQueryFilters } from "./useGetGlobalQueryFilters";


export const useGetHeaderFilter = () => {

    const { departmentSelectProps } = useGetDepratments();
    
      const { academicYearSemestersSelectProps } = useGetAcademicYearSemesters();
    
      const go = useGo();
    
      const {
        department_id_query_parameter,
        academic_year_semester_id_query_parameter,
      } = useGetGlobalQueryFilters();
    
      const { resource } = useParsed();



    return {
       departmentSelectProps,
       academicYearSemestersSelectProps,
       go,
       department_id_query_parameter,
       academic_year_semester_id_query_parameter,
       resource

    }
}