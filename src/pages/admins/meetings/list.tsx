import { List } from "@refinedev/antd";
import { useList } from "@refinedev/core";
import { Calendar } from "antd";
import { GetMeetingsResponseData } from "../../../types/admins/meetings";
import dayjs, { Dayjs } from "dayjs";
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
          console.log("date", date);

          const meetingDate = data?.data.find((meeting) => {
            const meetingDate = meeting.happens_at;

            return (
              dayjs(meetingDate).isSame(date, "year") &&
              dayjs(meetingDate).isSame(date, "month") &&
              dayjs(meetingDate).isSame(date, "day")
            );
          });

          if (meetingDate) {
            return <div>{meetingDate.happens_at}</div>;
          }

          return <div></div>;
        }}
      />
    </List>
  );
};
