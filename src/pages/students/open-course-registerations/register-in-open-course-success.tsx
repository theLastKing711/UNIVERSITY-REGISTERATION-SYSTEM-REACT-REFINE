import { Link, useOne, useParsed } from "@refinedev/core";
import React from "react";
import {
  STUDENT_OPEN_COURSE_REGISTERATION_REGISTERATION_SUCCESS_URI,
  STUDENT_OPEN_COURSE_REGISTERATION_URI,
} from "../../../constants";
import { Card, Typography } from "antd";

const StudentOpenCourseRegisterationsRegisterationSuccess = () => {
  const { params } = useParsed();

  const { data } = useOne({
    resource:
      STUDENT_OPEN_COURSE_REGISTERATION_REGISTERATION_SUCCESS_URI +
      `?session_id=${params?.session_id}`,
    id: -1,
    queryOptions: {},
  });

  return (
    <Card title="نجحت عملية الدفع" style={{ marginTop: "1rem" }}>
      <Typography style={{ marginBottom: "1rem" }}>
        شكر لتسجيلك بمادة{" "}
        <span style={{ fontWeight: "bold" }}>{data?.data?.name}.</span>
      </Typography>
      <Link to={"/" + STUDENT_OPEN_COURSE_REGISTERATION_URI}>
        العودة لتسجيل المواد
      </Link>
    </Card>
  );
};

export default StudentOpenCourseRegisterationsRegisterationSuccess;
