import { Edit, List } from "@refinedev/antd";
import { useForm, useList, useModal, useNavigation } from "@refinedev/core";
import {
  Avatar,
  Button,
  Calendar,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Tooltip,
} from "antd";
import { GetMeetingsResponseData } from "../../../types/admins/meetings";
import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import { areDatesEqual, formatDateTime } from "../../../helpers";
import { useState } from "react";
import { useGetAdminList } from "../../../hooks/API/select/useGetAdminList";
import EditModal from "./components/EditModal";

const currentYear = dayjs().year();

const currentMonth = dayjs().month() + 1;

export const MeetingList = () => {
  const [modalMeetingId, setModalMeetingId] = useState<number | null>(null);

  const [yearFilter, setYearFilter] = useState<number>(currentYear);

  const [monthFilter, setMonthFilter] = useState<number>(currentMonth);

  const {
    formProps,
    saveButtonProps,
    mutation: mutationResult,
    query,
  } = useForm({
    successNotification: (data, values, resourses) => ({
      message: "تعديل مستخدم",
      description: "تم تعديل المستخدم بنجاح",
      type: "success",
    }),
  });

  const { data } = useList<GetMeetingsResponseData>({
    filters: [
      {
        field: "year",
        operator: "eq",
        value: yearFilter,
      },
      {
        field: "month",
        operator: "eq",
        value: monthFilter,
      },
    ],
  });

  return (
    <>
      <List>
        <Calendar
          onPanelChange={(date, mode) => {
            setYearFilter(date.year());

            setMonthFilter(date.month() + 1);
          }}
          cellRender={(date) => {
            const currentDateMeetings = data?.data.filter((meeeing) =>
              areDatesEqual(dayjs(meeeing.happens_at), date)
            );

            return (
              <div>
                {currentDateMeetings?.map((meeting) => (
                  <div
                    style={{ marginBottom: "0.5rem" }}
                    onClick={() => {
                      // edit("admins/meetings", meeting.id);
                      setModalMeetingId(meeting.id);
                    }}
                  >
                    <Space>
                      <Avatar.Group>
                        {meeting?.attendances.map((attendance) => (
                          <Tooltip title={attendance.name} placement="top">
                            <Avatar icon={<UserOutlined />} />
                          </Tooltip>
                        ))}
                      </Avatar.Group>
                      <span>{formatDateTime(dayjs(meeting.happens_at))}</span>
                    </Space>
                  </div>
                ))}
              </div>
            );
          }}
        />

        {modalMeetingId && (
          <EditModal
            id={modalMeetingId}
            onClose={() => {
              setModalMeetingId(null);
            }}
          />
        )}
      </List>
    </>
  );
};
