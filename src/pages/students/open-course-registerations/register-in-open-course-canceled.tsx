import { Link, useOne, useParsed } from "@refinedev/core";
import React from "react";
import {
  STUDENT_OPEN_COURSE_REGISTERATION_REGISTERATION_CANCELED_URI,
  STUDENT_OPEN_COURSE_REGISTERATION_URI,
} from "../../../constants";
import { Card, Typography } from "antd";

const StudentOpenCourseRegisterationsRegisterationCanceled = () => {
  const { params } = useParsed();

  const { data } = useOne({
    resource:
      STUDENT_OPEN_COURSE_REGISTERATION_REGISTERATION_CANCELED_URI +
      `?session_id=${params?.session_id}`,
    id: -1,
    queryOptions: {},
  });

  return (
    <Card title="فشلت عملية الدفع" style={{ marginTop: "1rem" }}>
      <Typography style={{ marginBottom: "1rem" }}>
        فشلت عملية التسجيل بالمادة
        <span style={{ fontWeight: "bold" }}>{data?.data?.name}.</span>
      </Typography>
      <Link to={"/" + STUDENT_OPEN_COURSE_REGISTERATION_URI}>
        العودة لتسجيل المواد
      </Link>
    </Card>
  );
};

export default StudentOpenCourseRegisterationsRegisterationCanceled;
