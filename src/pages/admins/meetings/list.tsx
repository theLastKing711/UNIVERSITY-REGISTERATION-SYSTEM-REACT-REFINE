import { List } from "@refinedev/antd";
import { useList } from "@refinedev/core";
import { Avatar, Calendar, Space, Tooltip } from "antd";
import { GetMeetingsResponseData } from "../../../types/admins/meetings";
import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import { areDatesEqual, formatDateTime } from "../../../helpers";
import { useState } from "react";

const currentYear = dayjs().year();

const currentMonth = dayjs().month() + 1;

export const MeetingList = () => {
  const [yearFilter, setYearFilter] = useState<number>(currentYear);

  const [monthFilter, setMonthFilter] = useState<number>(currentMonth);

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

  console.log("data", data);

  return (
    <List>
      <Calendar
        onPanelChange={(date, mode) => {
          console.log(date.year());

          console.log(date.month() + 1);

          setYearFilter(date.year());

          setMonthFilter(date.month() + 1);
        }}
        cellRender={(date) => {
          const meetingDate = data?.data.find((meeting) => {
            const meetingDate = meeting.happens_at;

            return areDatesEqual(dayjs(meetingDate), date);
          });

          const currentDateMeetings = data?.data.flatMap((meeeing) =>
            areDatesEqual(dayjs(meeeing.happens_at), date) ? meeeing : []
          );

          return (
            <div>
              {currentDateMeetings?.map((meeting) => (
                <div style={{ marginBottom: "0.5rem" }}>
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
    </List>
  );
};
