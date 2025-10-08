import {
  Authenticated,
  CanAccess,
  I18nProvider,
  Refine,
  ResourceProps,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  RefineThemes,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp, Button, ConfigProvider } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

import {
  ADMIN_ACADEMIC_YEAR_SEMESTER_CREATE,
  ADMIN_ACADEMIC_YEAR_SEMESTER_EDIT,
  ADMIN_ACADEMIC_YEAR_SEMESTER_LIST,
  ADMIN_ACADEMIC_YEAR_SEMESTER_SHOW,
  ADMIN_ACADEMIC_YEAR_SEMESTER_URI,
  ADMIN_ADMIN_URI,
  ADMIN_CREATE,
  ADMIN_EDIT,
  ADMIN_LIST_URI,
  ADMIN_SHOW,
  ADMIN_STUDENT_URI,
  ADMIN_TEACHER_URI,
  AUDIT_LOG_CREATE,
  AUDIT_LOG_EDIT,
  AUDIT_LOG_LIST,
  AUDIT_LOG_SHOW,
  AUDIT_LOG_URI,
  BASE_URI,
  CLASSROOM_COURSE_TEACHER_CREATE,
  CLASSROOM_COURSE_TEACHER_EDIT,
  CLASSROOM_COURSE_TEACHER_LIST,
  CLASSROOM_COURSE_TEACHER_SHOW,
  CLASSROOM_COURSE_TEACHER_URI,
  CLASSROOM_CREATE,
  CLASSROOM_EDIT,
  CLASSROOM_LIST,
  CLASSROOM_SHOW,
  CLASSROOM_URI,
  COURSE_CREATE,
  COURSE_EDIT,
  COURSE_LIST,
  COURSE_SHOW,
  COURSE_URI,
  DEPARTMENT_CREATE,
  DEPARTMENT_EDIT,
  DEPARTMENT_LIST,
  DEPARTMENT_LIST_LIST,
  DEPARTMENT_SHOW,
  DEPARTMENT_URI,
  EXAM_CREATE,
  EXAM_EDIT,
  EXAM_LIST,
  EXAM_SHOW,
  EXAM_URI,
  LECTURE_CREATE,
  LECTURE_EDIT,
  LECTURE_LIST,
  LECTURE_SHOW,
  LECTURE_URI,
  MEETING_CREATE,
  MEETING_EDIT,
  MEETING_LIST,
  MEETING_SHOW,
  MEETING_URI,
  OPEN_COURSE_REGISTERATION_CREATE,
  OPEN_COURSE_REGISTERATION_EDIT,
  OPEN_COURSE_REGISTERATION_LIST,
  OPEN_COURSE_REGISTERATION_SHOW,
  OPEN_COURSE_REGISTERATION_URI,
  STUDENT_CREATE,
  STUDENT_EDIT,
  STUDENT_LIST,
  STUDENT_OPEN_COURSE_REGISTERATION_MARKS_LIST,
  STUDENT_OPEN_COURSE_REGISTERATION_MARKS_URI,
  STUDENT_OPEN_COURSE_REGISTERATION_REGISTERATION_CANCELED_URI,
  STUDENT_OPEN_COURSE_REGISTERATION_REGISTERATION_SUCCESS_URI,
  STUDENT_OPEN_COURSE_REGISTERATION_THIS_SEMESTER_LIST,
  STUDENT_OPEN_COURSE_REGISTERATION_THIS_SEMESTER_MARKS_LIST,
  STUDENT_OPEN_COURSE_REGISTERATION_THIS_SEMESTER_MARKS_URI,
  STUDENT_OPEN_COURSE_REGISTERATION_URI,
  STUDENT_SHOW,
  TEACHER_CREATE,
  TEACHER_EDIT,
  TEACHER_LIST,
  TEACHER_SHOW,
} from "./constants";
import Login from "./pages/auth/login/Login";
import {
  AdminCreate,
  AdminEdit,
  AdminList,
  AdminShow,
} from "./pages/admins/admins";
import {
  StudentCreate,
  StudentEdit,
  StudentList,
  StudentShow,
} from "./pages/admins/students";
import { dataProvider } from "./data-provider";
import { ThemeConfig } from "antd/lib";
import {
  AcademicYearSemesterList,
  AcademicYearSemesterCreate,
  AcademicYearSemesterShow,
  AcademicYearSemesterEdit,
} from "./pages/admins/academic-year-semesters";
import {
  CourseCreate,
  CourseEdit,
  CourseList,
  CourseShow,
} from "./pages/admins/courses";
import {
  OpenCourseRegisterationsCreate,
  OpenCourseRegisterationsEdit,
  OpenCourseRegisterationsList,
  OpenCourseRegisterationsShow,
} from "./pages/admins/open-course-registerations";
import { ClassroomList } from "./pages/admins/classrooms/list";
import {
  ClassroomCreate,
  ClassroomEdit,
  ClassroomShow,
} from "./pages/admins/classrooms";
import {
  ClassroomCourseTeacherCreate,
  ClassroomCourseTeacherEdit,
  ClassroomCourseTeacherList,
  ClassroomCourseTeacherShow,
} from "./pages/admins/classroom-course-teachers";
import { ExamList, ExamCreate, ExamShow, ExamEdit } from "./pages/admins/exams";
import {
  LectureCreate,
  LectureEdit,
  LectureList,
  LectureShow,
} from "./pages/admins/lectures";
import { pdfjs } from "react-pdf";
import { useMemo } from "react";
import {
  DepartmentList,
  DepartmentCreate,
  DepartmentShow,
  DepartmentEdit,
} from "./pages/admins/departments";
import {
  TeacherList,
  TeacherCreate,
  TeacherShow,
  TeacherEdit,
} from "./pages/admins/teachers";
import {
  StudentOpenCourseRegisterationsMarksList,
  StudentOpenCourseRegisterationsMarksThisSemesterList,
  StudentOpenCourseRegisterationsThisSemesterList,
} from "./pages/students/open-course-registerations";
import { accessControlProvider } from "./pages/access-control-provider";
import { liveProvider } from "./live-provider";
import {
  MeetingList,
  MeetingCreate,
  MeetingShow,
  MeetingEdit,
} from "./pages/admins/meetings";
import {
  AuditLogList,
  AuditLogsCreate,
  AuditLogsShow,
} from "./pages/admins/audit-logs";
import { auditLogProvider } from "./audit-log-provider";
import i18n from "./i18/config";
import { useTranslation } from "react-i18next";
import StudentOpenCourseRegisterationsRegisterationSuccess from "./pages/students/open-course-registerations/register-in-open-course-success";
import StudentOpenCourseRegisterationsRegisterationCanceled from "./pages/students/open-course-registerations/register-in-open-course-canceled";

const theme: ThemeConfig = {
  components: {
    Form: {
      marginLG: 44, // Customizes the default large margin for form items
    },
  },
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider: I18nProvider = {
    translate: (key: string, options?: any) => t(key, options),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const resources: ResourceProps[] | undefined = useMemo(
    () => [
      // {
      //   name: "categories",
      //   list: "/categories",
      //   create: "/categories/create",
      //   edit: "/categories/edit/:id",
      //   show: "/categories/show/:id",
      //   meta: {
      // canDelete: true,
      //   },
      // },
      {
        name: ADMIN_ADMIN_URI,
        list: ADMIN_LIST_URI,
        create: ADMIN_CREATE,
        edit: ADMIN_EDIT,
        show: ADMIN_SHOW,
        meta: {
          label: "الإداريين",
          audit: [],
          // canDelete: true,
        },
      },
      {
        name: ADMIN_ACADEMIC_YEAR_SEMESTER_URI,
        list: ADMIN_ACADEMIC_YEAR_SEMESTER_LIST,
        create: ADMIN_ACADEMIC_YEAR_SEMESTER_CREATE,
        edit: ADMIN_ACADEMIC_YEAR_SEMESTER_EDIT,
        show: ADMIN_ACADEMIC_YEAR_SEMESTER_SHOW,
        meta: {
          label: "الفصول الدراسية",
          audit: [],
        },
      },
      {
        name: AUDIT_LOG_URI,
        list: AUDIT_LOG_LIST,
        create: AUDIT_LOG_CREATE,
        edit: AUDIT_LOG_EDIT,
        show: AUDIT_LOG_SHOW,
        meta: {
          label: "سجل الأحداث",
          audit: [],
        },
      },
      {
        name: COURSE_URI,
        list: COURSE_LIST,
        create: COURSE_CREATE,
        edit: COURSE_EDIT,
        show: COURSE_SHOW,
        meta: {
          label: "المواد الدراسية",
          audit: [],
        },
      },
      {
        name: DEPARTMENT_URI,
        list: DEPARTMENT_LIST,
        create: DEPARTMENT_CREATE,
        edit: DEPARTMENT_EDIT,
        show: DEPARTMENT_SHOW,
        meta: {
          label: "الأقسام",
          audit: [],
        },
      },
      {
        name: OPEN_COURSE_REGISTERATION_URI,
        list: OPEN_COURSE_REGISTERATION_LIST,
        create: OPEN_COURSE_REGISTERATION_CREATE,
        edit: OPEN_COURSE_REGISTERATION_EDIT,
        show: OPEN_COURSE_REGISTERATION_SHOW,
        meta: {
          label: "فتح مواد دراسية",
          audit: ["create", "update", "delete"],
        },
      },
      {
        name: ADMIN_ACADEMIC_YEAR_SEMESTER_URI,
        list: ADMIN_ACADEMIC_YEAR_SEMESTER_LIST,
        create: ADMIN_ACADEMIC_YEAR_SEMESTER_CREATE,
        edit: ADMIN_ACADEMIC_YEAR_SEMESTER_EDIT,
        show: ADMIN_ACADEMIC_YEAR_SEMESTER_SHOW,
      },
      {
        name: CLASSROOM_URI,
        list: CLASSROOM_LIST,
        create: CLASSROOM_CREATE,
        edit: CLASSROOM_EDIT,
        show: CLASSROOM_SHOW,
        meta: {
          label: "الصفوف",
          audit: [],
        },
      },
      {
        name: CLASSROOM_COURSE_TEACHER_URI,
        list: CLASSROOM_COURSE_TEACHER_LIST,
        create: CLASSROOM_COURSE_TEACHER_CREATE,
        edit: CLASSROOM_COURSE_TEACHER_EDIT,
        show: CLASSROOM_COURSE_TEACHER_SHOW,
        meta: {
          label: "أوقات المحاضرات",
          audit: [],
        },
      },
      {
        name: EXAM_URI,
        list: EXAM_LIST,
        create: EXAM_CREATE,
        edit: EXAM_EDIT,
        show: EXAM_SHOW,
        meta: {
          label: "الامتحانات",
          audit: [],
        },
      },
      {
        name: MEETING_URI,
        list: MEETING_LIST,
        create: MEETING_CREATE,
        edit: MEETING_EDIT,
        show: MEETING_SHOW,
        meta: {
          label: "التقويم",
          audit: [],
        },
      },
      {
        name: LECTURE_URI,
        list: LECTURE_LIST,
        create: LECTURE_CREATE,
        edit: LECTURE_EDIT,
        show: LECTURE_SHOW,
        meta: {
          label: "تسجيل الحضور",
          audit: [],
        },
      },
      {
        name: ADMIN_STUDENT_URI,
        list: STUDENT_LIST,
        create: STUDENT_CREATE,
        edit: STUDENT_EDIT,
        show: STUDENT_SHOW,
        meta: {
          label: "التلاميذ",
          audit: [],
        },
      },
      {
        name: ADMIN_TEACHER_URI,
        list: TEACHER_LIST,
        create: TEACHER_CREATE,
        edit: TEACHER_EDIT,
        show: TEACHER_SHOW,
        meta: {
          label: "الأساتذة",
          audit: ["create", "update", "delete"],
        },
      },
      {
        name: STUDENT_OPEN_COURSE_REGISTERATION_URI,
        list: STUDENT_OPEN_COURSE_REGISTERATION_THIS_SEMESTER_LIST,
        meta: {
          label: "تسجيل مواد",
          audit: [],
        },
      },
      {
        name: STUDENT_OPEN_COURSE_REGISTERATION_THIS_SEMESTER_MARKS_URI,
        list: STUDENT_OPEN_COURSE_REGISTERATION_THIS_SEMESTER_MARKS_LIST,
        meta: {
          label: "علامات الفصل الحالي",
          audit: [],
        },
      },
      {
        name: STUDENT_OPEN_COURSE_REGISTERATION_MARKS_URI,
        list: STUDENT_OPEN_COURSE_REGISTERATION_MARKS_LIST,
        meta: {
          label: "العلامات",
          audit: [],
        },
      },
      {
        name: STUDENT_OPEN_COURSE_REGISTERATION_MARKS_URI,
        list: STUDENT_OPEN_COURSE_REGISTERATION_MARKS_LIST,
        meta: {
          label: "جدول الدوام",
          audit: [],
        },
      },
    ],
    []
  );

  return (
    <BrowserRouter>
      <ConfigProvider direction={"rtl"} theme={RefineThemes.Blue}>
        <RefineKbarProvider>
          <ColorModeContextProvider>
            <AntdApp>
              <DevtoolsProvider>
                <Refine
                  dataProvider={dataProvider(BASE_URI)}
                  notificationProvider={useNotificationProvider}
                  routerProvider={routerBindings}
                  authProvider={authProvider}
                  auditLogProvider={auditLogProvider}
                  // accessControlProvider={accessControlProvider}
                  liveProvider={liveProvider(window.Echo)}
                  i18nProvider={i18nProvider}
                  resources={[...resources]}
                  options={{
                    syncWithLocation: false,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "BsRq8M-JCn5LZ-y3rY11",
                    // is independent (has below settings) from accessControlProvider queryOptions
                    // reactQuery: {
                    //   clientConfig: {
                    //     defaultOptions: {
                    //       queries: {
                    //         staleTime: 1000 * 5 * 30,
                    //         refetchOnWindowFocus: false,
                    //       },
                    //     },
                    //   },
                    // },
                  }}
                >
                  <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route
                      element={
                        <Authenticated
                          key="authenticated-outer"
                          fallback={<CatchAllNavigate to="/login" />}
                        >
                          <ThemedLayoutV2>
                            <CanAccess
                              resource={DEPARTMENT_LIST_LIST}
                              action="list"
                            >
                              <Header />
                            </CanAccess>
                            <Outlet />
                          </ThemedLayoutV2>
                        </Authenticated>
                      }
                    >
                      <Route
                        path={
                          STUDENT_OPEN_COURSE_REGISTERATION_REGISTERATION_SUCCESS_URI
                        }
                      >
                        <Route
                          index
                          element={
                            <StudentOpenCourseRegisterationsRegisterationSuccess />
                          }
                        />
                      </Route>

                      <Route
                        path={
                          STUDENT_OPEN_COURSE_REGISTERATION_REGISTERATION_CANCELED_URI
                        }
                      >
                        <Route
                          index
                          element={
                            <StudentOpenCourseRegisterationsRegisterationCanceled />
                          }
                        />
                      </Route>

                      <Route path={STUDENT_OPEN_COURSE_REGISTERATION_URI}>
                        <Route
                          index
                          element={
                            <StudentOpenCourseRegisterationsThisSemesterList />
                          }
                        />
                      </Route>

                      <Route
                        path={
                          STUDENT_OPEN_COURSE_REGISTERATION_THIS_SEMESTER_MARKS_URI
                        }
                      >
                        <Route
                          index
                          element={
                            <StudentOpenCourseRegisterationsMarksThisSemesterList />
                          }
                        />
                      </Route>

                      <Route path={STUDENT_OPEN_COURSE_REGISTERATION_MARKS_URI}>
                        <Route
                          index
                          element={<StudentOpenCourseRegisterationsMarksList />}
                        />
                      </Route>

                      <Route path={ADMIN_ADMIN_URI}>
                        <Route index element={<AdminList />} />
                        <Route path="create" element={<AdminCreate />} />
                        <Route path="show/:id" element={<AdminShow />} />
                        <Route path="edit/:id" element={<AdminEdit />} />

                        {/* <Route path="create" element={<BlogPostCreate />} />
                        <Route path="edit/:id" element={<BlogPostEdit />} />
                        <Route path="show/:id" element={<BlogPostShow />} /> */}
                      </Route>

                      <Route path={ADMIN_STUDENT_URI}>
                        <Route index element={<StudentList />} />
                        <Route path="create" element={<StudentCreate />} />
                        <Route path="show/:id" element={<StudentShow />} />
                        <Route path="edit/:id" element={<StudentEdit />} />
                      </Route>

                      {/* <Route path="create" element={<BlogPostCreate />} />
                        <Route path="edit/:id" element={<BlogPostEdit />} />
                        <Route path="show/:id" element={<BlogPostShow />} /> */}

                      <Route path={ADMIN_ACADEMIC_YEAR_SEMESTER_URI}>
                        <Route index element={<AcademicYearSemesterList />} />
                        <Route
                          path="create"
                          element={<AcademicYearSemesterCreate />}
                        />
                        <Route
                          path="show/:id"
                          element={<AcademicYearSemesterShow />}
                        />
                        <Route
                          path="edit/:id"
                          element={<AcademicYearSemesterEdit />}
                        />
                      </Route>

                      <Route path={AUDIT_LOG_URI}>
                        <Route index element={<AuditLogList />} />
                        <Route path="create" element={<AuditLogsCreate />} />
                        <Route path="show/:id" element={<AuditLogsShow />} />
                        <Route path="edit/:id" element={<AuditLogsShow />} />
                      </Route>

                      <Route path={COURSE_URI}>
                        <Route index element={<CourseList />} />
                        <Route path="create" element={<CourseCreate />} />
                        <Route path="show/:id" element={<CourseShow />} />
                        <Route path="edit/:id" element={<CourseEdit />} />
                      </Route>

                      <Route path={DEPARTMENT_URI}>
                        <Route index element={<DepartmentList />} />
                        <Route path="create" element={<DepartmentCreate />} />
                        <Route path="show/:id" element={<DepartmentShow />} />
                        <Route path="edit/:id" element={<DepartmentEdit />} />
                      </Route>

                      <Route path={OPEN_COURSE_REGISTERATION_URI}>
                        <Route
                          index
                          element={<OpenCourseRegisterationsList />}
                        />
                        <Route
                          path="create"
                          element={<OpenCourseRegisterationsCreate />}
                        />
                        <Route
                          path="show/:id"
                          element={<OpenCourseRegisterationsShow />}
                        />
                        <Route
                          path="edit/:id"
                          element={<OpenCourseRegisterationsEdit />}
                        />
                      </Route>
                      <Route path={CLASSROOM_URI}>
                        <Route index element={<ClassroomList />} />
                        <Route path="create" element={<ClassroomCreate />} />
                        <Route path="show/:id" element={<ClassroomShow />} />
                        <Route path="edit/:id" element={<ClassroomEdit />} />
                      </Route>
                      <Route path={CLASSROOM_COURSE_TEACHER_URI}>
                        <Route index element={<ClassroomCourseTeacherList />} />
                        <Route
                          path="create"
                          element={<ClassroomCourseTeacherCreate />}
                        />
                        <Route
                          path="show/:id"
                          element={<ClassroomCourseTeacherShow />}
                        />
                        <Route
                          path="edit/:id"
                          element={<ClassroomCourseTeacherEdit />}
                        />
                      </Route>
                      <Route path={EXAM_URI}>
                        <Route index element={<ExamList />} />
                        <Route path="create" element={<ExamCreate />} />
                        <Route path="show/:id" element={<ExamShow />} />
                        <Route path="edit/:id" element={<ExamEdit />} />
                      </Route>
                      <Route path={ADMIN_TEACHER_URI}>
                        <Route index element={<TeacherList />} />
                        <Route path="create" element={<TeacherCreate />} />
                        <Route path="show/:id" element={<TeacherShow />} />
                        <Route path="edit/:id" element={<TeacherEdit />} />
                      </Route>
                      <Route path={MEETING_URI}>
                        <Route index element={<MeetingList />} />
                        <Route path="create" element={<MeetingCreate />} />
                        <Route path="show/:id" element={<MeetingShow />} />
                        <Route path="edit/:id" element={<MeetingEdit />} />
                      </Route>
                      <Route path={LECTURE_URI}>
                        <Route index element={<LectureList />} />
                        <Route path="create" element={<LectureCreate />} />
                        <Route path="show/:id" element={<LectureShow />} />
                        <Route path="edit/:id" element={<LectureEdit />} />
                      </Route>
                    </Route>
                    <Route path={ADMIN_STUDENT_URI}>
                      <Route index element={<StudentList />} />
                      <Route path="create" element={<StudentCreate />} />
                      <Route path="show/:id" element={<StudentShow />} />
                      <Route path="edit/:id" element={<StudentEdit />} />
                    </Route>

                    {/* <Route
                      element={
                        <Authenticated
                          key="authenticated-outer"
                          fallback={<Outlet />}
                        >
                          <NavigateToResource />
                        </Authenticated>
                      }
                    >
                      
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      />
                    </Route>*/}
                  </Routes>
                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler />
                </Refine>
                <DevtoolsPanel />
              </DevtoolsProvider>
            </AntdApp>
          </ColorModeContextProvider>
        </RefineKbarProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;

// <Route
//               element={
//                 <Authenticated
//                   key="authenticated-inner"
//                   fallback={<CatchAllNavigate to="/login" />}
//                 >
//                   {/* <ThemedLayoutV2
//                     Header={Header}
//                     Sider={(props) => (
//                       <ThemedSiderV2 {...props} fixed />
//                     )}
//                   >
//                     <Outlet />
//                   </ThemedLayoutV2> */}
//                 </Authenticated>
//               }
//             >
//               <Route path="/login" element={<Login />} />
//               {/* <Route
//                 index
//                 element={<NavigateToResource resource="blog_posts" />}
//               /> */}
//               {/* <Route path="/blog-posts">
//                 <Route index element={<BlogPostList />} />
//                 <Route path="create" element={<BlogPostCreate />} />
//                 <Route path="edit/:id" element={<BlogPostEdit />} />
//                 <Route path="show/:id" element={<BlogPostShow />} />
//               </Route>
//               <Route path="/categories">
//                 <Route index element={<CategoryList />} />
//                 <Route path="create" element={<CategoryCreate />} />
//                 <Route path="edit/:id" element={<CategoryEdit />} />
//                 <Route path="show/:id" element={<CategoryShow />} />
//               </Route> */}
//               <Route path="*" element={<ErrorComponent />} />
//             </Route>
