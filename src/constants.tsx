import { Space, TableProps } from "antd";
import { OpenCourseRegisterationsCreate } from "./pages/admins/open-course-registerations/create";
import {
  GetAuditLogResposne,
  OpenCourseRegisterationAuditLog,
  OpenCourseRegisterationAuditLogWithTitle,
  OpenCourseRegisterationDeleteAuditLog,
  OpenCourseRegisterationUpdateAuditLog,
  TeacherAuditLog,
  TeacherDeleteAuditLog,
  TeacherUpdateAuditLog,
} from "./types/admins/audit-logs";
import { TimeInterval } from "./types/shared";
import { SelectProps } from "antd/lib";
import { ColumnType } from "antd/es/table";
import React from "react";

export const BASE_URI = "http://localhost:8000";

export const RESOURSES = {
  admins: "admins",
  auditLogs: "audit-logs",
  students: "students",
  departments: "departments",
  academic_year_semesters: "academic-year-semesters",
  courses: "courses",
  openCourseRegisterations: "open-course-registerations",
  classrooms: "classrooms",
  teachers: "teachers",
  classroomCourseTeachers: "classroom-course-teachers",
  exams: "exams",
  lectures: "lectures",
  meetings: "meetings",
  notifications: "notifications",
  images: "images",
};

export const ADMIN_ROLE = "admins";

export const ADMIN_URI = BASE_URI + "/" + RESOURSES.admins;

export const ADMIN_ADMIN_URI = ADMIN_ROLE + "/" + RESOURSES.admins;

export const ADMIN_LIST_URI = `/${ADMIN_ADMIN_URI}`;

export const ADMIN_CREATE = `/${ADMIN_ADMIN_URI}/create`;

export const ADMIN_EDIT = `/${ADMIN_ADMIN_URI}/edit/:id`;

export const ADMIN_SHOW = `/${ADMIN_ADMIN_URI}/show/:id`;

export const ADMIN_STUDENT_URI = ADMIN_ROLE + "/" + RESOURSES.students;

export const STUDENT_LIST = `/${ADMIN_STUDENT_URI}`;

export const STUDENT_CREATE = `/${ADMIN_STUDENT_URI}/create`;

export const STUDENT_EDIT = `/${ADMIN_STUDENT_URI}/edit/:id`;

export const STUDENT_SHOW = `/${ADMIN_STUDENT_URI}/show/:id`;

export const ADMIN_DEPARTMENT_URI = ADMIN_ROLE + "/" + RESOURSES.departments;

export const ADMIN_ACADEMIC_YEAR_SEMESTER_URI =
  ADMIN_ROLE + "/" + RESOURSES.academic_year_semesters;

export const ADMIN_ACADEMIC_YEAR_SEMESTER_LIST = `/${ADMIN_ACADEMIC_YEAR_SEMESTER_URI}`;

export const ADMIN_ACADEMIC_YEAR_SEMESTER_CREATE = `/${ADMIN_ACADEMIC_YEAR_SEMESTER_URI}/create`;

export const ADMIN_ACADEMIC_YEAR_SEMESTER_EDIT = `/${ADMIN_ACADEMIC_YEAR_SEMESTER_URI}/edit/:id`;

export const ADMIN_ACADEMIC_YEAR_SEMESTER_SHOW = `/${ADMIN_ACADEMIC_YEAR_SEMESTER_URI}/show/:id`;

export const AUDIT_LOG_URI = ADMIN_ROLE + "/" + RESOURSES.auditLogs;

export const AUDIT_LOG_LIST = `/${AUDIT_LOG_URI}`;

export const AUDIT_LOG_CREATE = `/${AUDIT_LOG_URI}/create`;

export const AUDIT_LOG_EDIT = `/${AUDIT_LOG_URI}/edit/:id`;

export const AUDIT_LOG_SHOW = `/${AUDIT_LOG_URI}/show/:id`;

export const COURSE_URI = ADMIN_ROLE + "/" + RESOURSES.courses;

export const COURSE_LIST = `/${COURSE_URI}`;

export const COURSE_CREATE = `/${COURSE_URI}/create`;

export const COURSE_EDIT = `/${COURSE_URI}/edit/:id`;

export const COURSE_SHOW = `/${COURSE_URI}/show/:id`;

export const DEPARTMENT_URI = ADMIN_ROLE + "/" + RESOURSES.departments;

export const DEPARTMENT_LIST = `/${DEPARTMENT_URI}`;

export const DEPARTMENT_CREATE = `/${DEPARTMENT_URI}/create`;

export const DEPARTMENT_EDIT = `/${DEPARTMENT_URI}/edit/:id`;

export const DEPARTMENT_SHOW = `/${DEPARTMENT_URI}/show/:id`;

export const OPEN_COURSE_REGISTERATION_URI =
  ADMIN_ROLE + "/" + RESOURSES.openCourseRegisterations;

export const OPEN_COURSE_REGISTERATION_LIST = `/${OPEN_COURSE_REGISTERATION_URI}`;

export const OPEN_COURSE_REGISTERATION_CREATE = `/${OPEN_COURSE_REGISTERATION_URI}/create`;

export const OPEN_COURSE_REGISTERATION_EDIT = `/${OPEN_COURSE_REGISTERATION_URI}/edit/:id`;

export const OPEN_COURSE_REGISTERATION_SHOW = `/${OPEN_COURSE_REGISTERATION_URI}/show/:id`;

export const CLASSROOM_URI = ADMIN_ROLE + "/" + RESOURSES.classrooms;

export const CLASSROOM_LIST = `/${CLASSROOM_URI}`;

export const CLASSROOM_CREATE = `/${CLASSROOM_URI}/create`;

export const CLASSROOM_EDIT = `/${CLASSROOM_URI}/edit/:id`;

export const CLASSROOM_SHOW = `/${CLASSROOM_URI}/show/:id`;

export const ADMIN_TEACHER_URI = ADMIN_ROLE + "/" + RESOURSES.teachers;

export const TEACHER_LIST = `/${ADMIN_TEACHER_URI}`;

export const TEACHER_CREATE = `/${ADMIN_TEACHER_URI}/create`;

export const TEACHER_EDIT = `/${ADMIN_TEACHER_URI}/edit/:id`;

export const TEACHER_SHOW = `/${ADMIN_TEACHER_URI}/show/:id`;

export const CLASSROOM_COURSE_TEACHER_URI =
  ADMIN_ROLE + "/" + RESOURSES.classroomCourseTeachers;

export const CLASSROOM_COURSE_TEACHER_LIST = `/${CLASSROOM_COURSE_TEACHER_URI}`;

export const CLASSROOM_COURSE_TEACHER_CREATE = `/${CLASSROOM_COURSE_TEACHER_URI}/create`;

export const CLASSROOM_COURSE_TEACHER_EDIT = `/${CLASSROOM_COURSE_TEACHER_URI}/edit/:id`;

export const CLASSROOM_COURSE_TEACHER_SHOW = `/${CLASSROOM_COURSE_TEACHER_URI}/show/:id`;

export const EXAM_URI = ADMIN_ROLE + "/" + RESOURSES.exams;

export const EXAM_LIST = `/${EXAM_URI}`;

export const EXAM_CREATE = `/${EXAM_URI}/create`;

export const EXAM_EDIT = `/${EXAM_URI}/edit/:id`;

export const EXAM_SHOW = `/${EXAM_URI}/show/:id`;

export const LECTURE_URI = ADMIN_ROLE + "/" + RESOURSES.lectures;

export const LECTURE_LIST = `/${LECTURE_URI}`;

export const LECTURE_CREATE = `/${LECTURE_URI}/create`;

export const LECTURE_EDIT = `/${LECTURE_URI}/edit/:id`;

export const LECTURE_SHOW = `/${LECTURE_URI}/show/:id`;

export const MEETING_URI = ADMIN_ROLE + "/" + RESOURSES.meetings;

export const MEETING_LIST = `/${MEETING_URI}`;

export const MEETING_CREATE = `/${MEETING_URI}/create`;

export const MEETING_EDIT = `/${MEETING_URI}/edit/:id`;

export const MEETING_SHOW = `/${MEETING_URI}/show/:id`;

export const STUDENT_RESOURSES = {
  openCourseRegisterations: "open-course-registerations",
};

export const NOTIFICATION_URI = ADMIN_ROLE + "/" + RESOURSES.notifications;

export const DEPARTMENT_LIST_LIST = `${ADMIN_DEPARTMENT_URI}/list`;

export const ACADEMIC_YEAR_SEMESTER_LIST_LIST = `${ADMIN_ACADEMIC_YEAR_SEMESTER_URI}/list`;

export const STUDENT_ROLE = "students";

export const STUDENT_OPEN_COURSE_REGISTERATION_URI =
  STUDENT_ROLE + "/" + STUDENT_RESOURSES.openCourseRegisterations;

export const STUDENT_OPEN_COURSE_REGISTERATION_THIS_SEMESTER_LIST = `/${STUDENT_OPEN_COURSE_REGISTERATION_URI}`;

export const STUDENT_OPEN_COURSE_REGISTERATION_THIS_SEMESTER_MARKS_URI = `${STUDENT_OPEN_COURSE_REGISTERATION_URI}/marks/this-semester`;

export const STUDENT_OPEN_COURSE_REGISTERATION_THIS_SEMESTER_MARKS_LIST = `/${STUDENT_OPEN_COURSE_REGISTERATION_THIS_SEMESTER_MARKS_URI}`;

export const STUDENT_OPEN_COURSE_REGISTERATION_MARKS_URI = `${STUDENT_OPEN_COURSE_REGISTERATION_URI}/marks`;

export const STUDENT_OPEN_COURSE_REGISTERATION_MARKS_LIST = `/${STUDENT_OPEN_COURSE_REGISTERATION_MARKS_URI}`;

export const STUDENT_OPEN_COURSE_REGISTERATION_SCHEDULE_URI = `${STUDENT_OPEN_COURSE_REGISTERATION_URI}/schedule`;

export const STUDENT_OPEN_COURSE_REGISTERATION_SCHEDULE_LIST = `/${STUDENT_OPEN_COURSE_REGISTERATION_SCHEDULE_URI}`;

export const STUDENT_OPEN_COURSE_REGISTERATION_REGISTERED_THIS_SEMESTER_URI = `${STUDENT_OPEN_COURSE_REGISTERATION_URI}/registered-courses/this-semester`;

export const PER_PAGE = 2;

export const ADMIN_UPLOAD_IMAGE_URI = `${BASE_URI}/${ADMIN_ROLE}/${RESOURSES.images}`;

export const DAYS: SelectProps["options"] = [
  {
    value: 0,
    label: "السبت",
  },
  {
    value: 1,
    label: "الأحد",
  },
  {
    value: 2,
    label: "الاثنين",
  },
  {
    value: 3,
    label: "الثلاثاء",
  },
  {
    value: 4,
    label: "الأربعاء",
  },
  {
    value: 5,
    label: "الخمسي",
  },
  {
    value: 6,
    label: "الجمعة",
  },
];

export const getDayOfWeek = (id: number) => {
  return DAYS.find((item) => item.value === id)?.label;
};

export const TIME_INTERVALS: TimeInterval[] = [
  {
    id: "08:00:00",
    title: "08:00:00",
  },
  {
    id: "10:00:00",
    title: "10:00:00",
  },
  {
    id: "12:00:00",
    title: "12:00:00",
  },
  {
    id: "14:00:00",
    title: "14:00:00",
  },
  {
    id: "16:00:00",
    title: "16:00:00",
  },
  {
    id: "18:00:00",
    title: "18:00:00",
  },
  {
    id: "18:00:00",
    title: "18:00:00",
  },
];

export const RESOURCE_EN_TO_AR = {
  "open-course-registerations": "فتح المواد الدراسية",
  teachers: "الأساتذة",
} as const;

export const ACTION_EN_TO_AR = {
  create: "إنشاء",
  update: "تعديل",
  delete: "حذف",
} as const;

export const ACTION_COLOR = {
  create: "green",
  update: "blue",
  delete: "red",
} as const;

export const getAuditLogDetailsTableColumns = (
  renderTitle: ColumnType["render"],
  data?: GetAuditLogResposne<unknown>
) => {
  if (!data) {
    return {
      datasource: [],
      columns: [],
    };
  }

  const columns: TableProps["columns"] =
    data.action === "update"
      ? [
          {
            title: "الحقل",
            dataIndex: "title",
            key: "title",
            render: renderTitle,
          },
          {
            title: "القيمة القديمة",
            dataIndex: "oldValue",
            key: "oldValue",
            // render: renderTitle,
          },
          {
            title: "القيمة الجديدة",
            dataIndex: "value",
            key: "value",
            // render: renderTitle,
          },
        ]
      : [
          {
            title: "الحقل",
            dataIndex: "title",
            key: "title",
            render: renderTitle,
          },
          {
            title: "القيمة الجديدة",
            dataIndex: "value",
            key: "value",
          },
        ];

  switch (data.resource) {
    case "open-course-registerations":
      {
        if (data.action === "delete") {
          const openCoruseData =
            data.details as OpenCourseRegisterationDeleteAuditLog;

          // const dataSource: TableProps<OpenCourseRegisterationAuditLogWithTitle>["dataSource"] =
          const dataSource: TableProps["dataSource"] = [
            {
              //every property corrspond to columns dataIndex
              title: "المعرف",
              value: openCoruseData.id,
              key: 0,
            },
          ];

          return {
            columns,
            dataSource: dataSource,
          };
        }

        if (data.action === "update") {
          const openCoruseData =
            data.details as OpenCourseRegisterationUpdateAuditLog;

          // const dataSource: TableProps<OpenCourseRegisterationAuditLogWithTitle>["dataSource"] =
          const dataSource: TableProps["dataSource"] = [
            {
              title: "المعرف",
              oldValue: openCoruseData.id,
              value: openCoruseData.id,
              key: 0,
            },
            {
              title: "معرف المادة",
              oldValue: openCoruseData.course_id,
              value: openCoruseData.updated_course_id,
              key: 1,
            },
            {
              title: "السعر بالدولار",
              oldValue: openCoruseData.updated_price_in_usd,
              value: openCoruseData.price_in_usd,
              key: 2,
            },
            {
              title: "المدرسين",
              oldValue: openCoruseData.teachers.map((item) => (
                <div style={{ marginBottom: "0.75rem" }}>
                  <div key={item.id}>
                    المعرف: {item.id}, أستاذ رئيسي:{" "}
                    {item.is_main_teacher ? "نعم" : "لا"}
                    {/* <div>الاسم: {item.name}</div> */}
                  </div>
                </div>
              )),
              value: openCoruseData.updated_teachers.map((item) => (
                <div style={{ marginBottom: "0.75rem" }}>
                  <Space key={item.id}>
                    <div>
                      المعرف: {item.id}, أستاذ رئيسي:{" "}
                      {item.is_main_teacher ? "نعم" : "لا"}
                    </div>
                    {/* <div>الاسم: {item.name}</div> */}
                  </Space>
                </div>
              )),
              key: 2,
            },
          ];

          return {
            dataSource,
            columns,
          };
        }

        const openCoruseData = data.details as OpenCourseRegisterationAuditLog;

        // const dataSource: TableProps<OpenCourseRegisterationAuditLogWithTitle>["dataSource"] =
        const dataSource: TableProps["dataSource"] = [
          {
            title: "المعرف",
            oldValue: openCoruseData.id,
            value: openCoruseData.id,
            key: 0,
          },
          {
            title: "معرف المادة",
            value: openCoruseData.course_id,
            key: 1,
          },
          {
            title: "السعر بالدولار",
            value: openCoruseData.price_in_usd,
            key: 2,
          },
          {
            title: "المدرسين",
            value: openCoruseData.teachers.map((item) => (
              <div>
                <Space key={item.id}>
                  <div>المعرف: {item.id}</div>
                  {/* <div>الاسم: {item.name}</div> */}
                </Space>
              </div>
            )),
            key: 2,
          },
        ];

        return {
          dataSource,
          columns,
        };
      }
      break;
    case "teachers":
      {
        if (data.action === "delete") {
          const teacher = data.details as TeacherDeleteAuditLog;

          // const dataSource: TableProps<OpenCourseRegisterationAuditLogWithTitle>["dataSource"] =
          const dataSource: TableProps["dataSource"] = [
            {
              //every property corrspond to columns dataIndex
              title: "المعرف",
              value: teacher.id,
              key: 0,
            },
          ];

          return {
            columns,
            dataSource: dataSource,
          };
        }

        if (data.action === "update") {
          const teacher = data.details as TeacherUpdateAuditLog;

          // const dataSource: TableProps<OpenCourseRegisterationAuditLogWithTitle>["dataSource"] =
          const dataSource: TableProps["dataSource"] = [
            {
              //every property corrspond to columns dataIndex
              title: "المعرف",
              oldValue: teacher.id,
              value: "",
              key: 0,
            },
            {
              title: "معرف القسم",
              oldValue: teacher.department_id,
              value: teacher.updated_department_id,
              key: 1,
            },
            {
              title: "اسم الأستاذ",
              oldValue: teacher.name,
              value: teacher.updated_name,
              key: 2,
            },
          ];

          return {
            columns,
            dataSource: dataSource,
          };
        }

        const teacher = data.details as TeacherAuditLog;

        // const dataSource: TableProps<OpenCourseRegisterationAuditLogWithTitle>["dataSource"] =
        const dataSource: TableProps["dataSource"] = [
          {
            //every property corrspond to columns dataIndex
            title: "المعرف",
            value: teacher.id,
            key: 0,
          },
          {
            title: "معرف القسم",
            value: teacher.department_id,
            key: 1,
          },
          {
            title: "اسم الأستاذ",
            value: teacher.name,
            key: 2,
          },
        ];

        // const columns: TableProps<OpenCourseRegisterationAuditLog>["columns"] =
        return {
          columns,
          dataSource: dataSource,
        };
      }
      break;
  }
};
