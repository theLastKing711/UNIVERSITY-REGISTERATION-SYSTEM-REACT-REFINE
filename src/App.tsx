import { Authenticated, CanAccess, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineThemes,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp, ConfigProvider } from "antd";
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
  OPEN_COURSE_REGISTERATION_CREATE,
  OPEN_COURSE_REGISTERATION_EDIT,
  OPEN_COURSE_REGISTERATION_LIST,
  OPEN_COURSE_REGISTERATION_SHOW,
  OPEN_COURSE_REGISTERATION_URI,
  STUDENT_CREATE,
  STUDENT_EDIT,
  STUDENT_LIST,
  STUDENT_SHOW,
} from "./constants";
import Login from "./pages/auth/login/Login";
import {
  AdminCreate,
  AdminEdit,
  AdminList,
  AdminShow,
} from "./pages/admins/admins";
import {
  StudentsList,
  StudentsCreate,
  StudentsShow,
  StudentsEdit,
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
import { ClassroomList } from "./pages/classrooms/list";
import {
  ClassroomCreate,
  ClassroomEdit,
  ClassroomShow,
} from "./pages/classrooms";
import {
  ClassroomCourseTeacherCreate,
  ClassroomCourseTeacherEdit,
  ClassroomCourseTeacherList,
  ClassroomCourseTeacherShow,
} from "./pages/classroom-course-teachers";
import { ExamList, ExamCreate, ExamShow, ExamEdit } from "./pages/exams";
import {
  LectureCreate,
  LectureEdit,
  LectureList,
  LectureShow,
} from "./pages/lectures";
import { pdfjs } from "react-pdf";
import { accessControlProvider } from "./pages/access-control-provider";

const theme: ThemeConfig = {
  components: {
    Form: {
      marginLG: 44, // Customizes the default large margin for form items
    },
  },
};

// const CustomRouterProvider = () => {
//   const navigate = useNavigate();

//   return {
//     go: ({ to, query, hash, type }) => {
//       const defaultQueryParam = { defaultParam: "defaultValue" }; // Your default parameter

//       let newQuery = { ...defaultQueryParam, ...query };

//       // Stringify the query object (you might use a library like 'qs')
//       const queryString = Object.keys(newQuery)
//         .map((key) => `${key}=${newQuery[key]}`)
//         .join("&");

//       const url = `${to}${queryString ? `?${queryString}` : ""}${
//         hash ? `#${hash}` : ""
//       }`;

//       if (type === "push") {
//         navigate(url);
//       } else if (type === "replace") {
//         navigate(url, { replace: true });
//       } else if (type === "path") {
//         return url;
//       }
//     },
//     // ... other router provider methods (parse, etc.)
//   };
// };

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function App() {
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
                  accessControlProvider={accessControlProvider}
                  resources={[
                    // {
                    //   name: "categories",
                    //   list: "/categories",
                    //   create: "/categories/create",
                    //   edit: "/categories/edit/:id",
                    //   show: "/categories/show/:id",
                    //   meta: {
                    //     canDelete: true,
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
                        canDelete: true,
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
                        canDelete: true,
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
                        canDelete: true,
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
                        canDelete: true,
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
                        canDelete: true,
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
                        canDelete: true,
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
                        canDelete: true,
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
                        canDelete: true,
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
                        canDelete: true,
                      },
                    },
                  ]}
                  options={{
                    syncWithLocation: false,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "BsRq8M-JCn5LZ-y3rY11",
                  }}
                >
                  <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route
                      element={
                        // <CanAccess>
                        <Authenticated
                          key="authenticated-outer"
                          fallback={<CatchAllNavigate to="/login" />}
                        >
                          <ThemedLayoutV2>
                            <Header />
                            <Outlet />
                          </ThemedLayoutV2>
                        </Authenticated>

                        // </CanAccess>
                      }
                    >
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
                        <Route index element={<StudentsList />} />
                        <Route path="create" element={<StudentsCreate />} />
                        <Route path="show/:id" element={<StudentsShow />} />
                        <Route path="edit/:id" element={<StudentsEdit />} />

                        {/* <Route path="create" element={<BlogPostCreate />} />
                        <Route path="edit/:id" element={<BlogPostEdit />} />
                        <Route path="show/:id" element={<BlogPostShow />} /> */}
                      </Route>

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

                      <Route path={COURSE_URI}>
                        <Route index element={<CourseList />} />
                        <Route path="create" element={<CourseCreate />} />
                        <Route path="show/:id" element={<CourseShow />} />
                        <Route path="edit/:id" element={<CourseEdit />} />
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

                      <Route path={LECTURE_URI}>
                        <Route index element={<LectureList />} />
                        <Route path="create" element={<LectureCreate />} />
                        <Route path="show/:id" element={<LectureShow />} />
                        <Route path="edit/:id" element={<LectureEdit />} />
                      </Route>
                    </Route>

                    <Route
                      element={
                        <Authenticated
                          key="authenticated-inner"
                          fallback={<CatchAllNavigate to="/login" />}
                        >
                          {/* <ThemedLayoutV2
                            Header={Header}
                            Sider={(props) => (
                              <ThemedSiderV2 {...props} fixed />
                            )}
                          >
                            <Outlet />
                          </ThemedLayoutV2> */}
                        </Authenticated>
                      }
                    >
                      <Route path="/login" element={<Login />} />
                      {/* <Route
                        index
                        element={<NavigateToResource resource="blog_posts" />}
                      /> */}
                      {/* <Route path="/blog-posts">
                        <Route index element={<BlogPostList />} />
                        <Route path="create" element={<BlogPostCreate />} />
                        <Route path="edit/:id" element={<BlogPostEdit />} />
                        <Route path="show/:id" element={<BlogPostShow />} />
                      </Route>
                      <Route path="/categories">
                        <Route index element={<CategoryList />} />
                        <Route path="create" element={<CategoryCreate />} />
                        <Route path="edit/:id" element={<CategoryEdit />} />
                        <Route path="show/:id" element={<CategoryShow />} />
                      </Route> */}
                      <Route path="*" element={<ErrorComponent />} />
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
