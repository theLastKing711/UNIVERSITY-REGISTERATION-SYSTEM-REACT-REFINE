import { List } from "@refinedev/antd";
import { useList } from "@refinedev/core";
import { Avatar, Calendar, Space, Tooltip } from "antd";
import { GetMeetingsResponseData } from "../../../types/admins/meetings";
import dayjs, { Dayjs } from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import { areDatesEqual, formatDateTime } from "../../../helpers";
export const MeetingList = () => {
  //   const { tableProps } = useTable({
  //     syncWithLocation: false,
  //   });

  const { data } = useList<GetMeetingsResponseData>();

  console.log("data", data);

  return (
    <List>
      <Calendar
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
