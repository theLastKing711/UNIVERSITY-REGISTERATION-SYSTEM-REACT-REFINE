import React from "react";

import { Create, useForm, useSelect, getValueFromEvent } from "@refinedev/antd";

import { DatePicker, Form, Image, Input, Select, Space, Upload } from "antd";

import { GetDepartmentsResponseData } from "../../../types/admins/departments";
import { ADMIN_DEPARTMENT_URI } from "../../../constants";
import { RegisterStudentRequestData } from "../../../types/admins/students";
import { useImageUpload } from "../../../hooks/useUploadImage";
import { useImagePreview } from "../../../hooks/useImagePreview";
import {
  getIdFromCustomUploadFile,
  getIdsFromCustomUploadFiles,
} from "../../../helpers";
import CustomSearchSelect from "../../../components/ui/AntDesgin/CustomSearchSelect";

export const StudentCreate = () => {
  const {
    formProps,
    saveButtonProps,
    mutation: mutationResult,
    onFinish,
  } = useForm<RegisterStudentRequestData>({
    successNotification: (data, values, resourses) => ({
      message: "إنشاء مستخدم جديد",
      description: "تم إنشاء مستخدم جديد بنجاح",
      type: "success",
    }),
  });

  const { selectProps: departmentSelectProps } =
    useSelect<GetDepartmentsResponseData>({
      resource: ADMIN_DEPARTMENT_URI,
      optionValue: "id",
      optionLabel: "name",
    });

  const errorsList = mutationResult?.error?.errors?.data as [] | undefined;

  const {
    isPreviewImageOpen,
    onImagePreview,
    previewImage,
    setPreviewImage,
    setIsPreviewImageOpen,
  } = useImagePreview();

  const {
    uploadFiles: profilePictureUploadFiles,
    uploadFile: profilePictureUploadFile,
    onFileRemove: onProfilePictureFileRemove,
    upload: uploadProfilePictureFile,
  } = useImageUpload("profile_picture", "single");

  const {
    uploadFiles: schoolUploadFiles,
    onFileRemove: onSchoolFilesRemove,
    upload: uploadSchoolFiles,
  } = useImageUpload("school_files");

  const handleOnFinish = (values) => {
    const { schoolFiles, profilePicture, ...newValues } = values;

    onFinish({
      ...newValues,
      school_files_ids_to_add: getIdsFromCustomUploadFiles(schoolUploadFiles),
      temporary_profile_picture_id: getIdFromCustomUploadFile(
        profilePictureUploadFile
      ),
    });
  };

  return (
    <Create
      saveButtonProps={{ ...saveButtonProps, children: "حفظ" }}
      title="إنشاء مستخدم جديد"
    >
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
        <Form.Item
          label="القسم"
          name="department_id"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <CustomSearchSelect
            placeholder="اختر القسم"
            style={{ width: 300 }}
            {...departmentSelectProps}
          />
        </Form.Item>

        <Form.Item
          name="profilePicture"
          label="الصورة الشخصية"
          valuePropName="file"
          getValueFromEvent={getValueFromEvent}
        >
          <Upload.Dragger
            fileList={profilePictureUploadFiles}
            name="file"
            listType="picture"
            onPreview={onImagePreview}
            onRemove={onProfilePictureFileRemove}
            customRequest={uploadProfilePictureFile}
          >
            <p className="ant-upload-text">اسحب الصور لهذة المنطقة.</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item
          name="schoolFiles"
          label="صور المدرسة"
          valuePropName="file"
          getValueFromEvent={getValueFromEvent}
        >
          <Upload.Dragger
            fileList={schoolUploadFiles}
            name="file"
            listType="picture"
            maxCount={2}
            multiple
            onPreview={onImagePreview}
            onRemove={onSchoolFilesRemove}
            // onChange={({ fileList }) => setSchoolUploadFiles(fileList)}
            //it runs once per uploaded file
            customRequest={uploadSchoolFiles}
          >
            <p className="ant-upload-text">اسحب الصور لهذة المنطقة.</p>
          </Upload.Dragger>
        </Form.Item>

        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: isPreviewImageOpen,
              onVisibleChange: (visible) => setIsPreviewImageOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}

        <Form.Item
          label="اسم المستخدم"
          name="name"
          rules={[
            {
              required: true,
              message: "اسم المستخدم مطلوب",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="كلمة المرور"
          name="password"
          rules={[
            {
              required: true,
              message: "كلمة المرور مطلوبة",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="الرقم الوطني"
          name="national_id"
          rules={[
            {
              required: true,
              message: "الرقم الوطني مطلوب",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="رقم الهاتف"
          name="phone_number"
          rules={[
            {
              required: true,
              message: "رقم الهاتف مطلوب",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item label="تاريخ الميلاد" name="birthdate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="تاريخ التسجيل" name="enrollment_date">
          <DatePicker />
        </Form.Item>

        {errorsList && (
          <div style={{ color: "red" }}>
            {errorsList.map((error) => (
              <h5>{error}</h5>
            ))}
          </div>
        )}
      </Form>
    </Create>
  );
};
