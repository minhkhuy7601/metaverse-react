import { Button, Dropdown } from "antd";
import { getAntdDropdownMenu, getAntdItem } from "./video-footer-utils";
const { Button: DropdownButton } = Dropdown;
interface LeaveButtonProps {
  onLeaveClick: () => void;
  onEndClick: () => void;
  isHost: boolean;
}

const LeaveButton = (props: LeaveButtonProps) => {
  const { onLeaveClick, onEndClick, isHost } = props;

  return isHost ? (
    <Dropdown
      className="!text-white"
      menu={getAntdDropdownMenu(
        [getAntdItem("End session", "end")],
        onEndClick
      )}
      placement="topRight">
      <Button
        size="large"
        className="!bg-red-500 !font-bold !text-white"
        onClick={onLeaveClick}>
        End
      </Button>
    </Dropdown>
  ) : (
    <Button
      className="!bg-red-500 !rounded-md !px-4 !font-bold"
      ghost={true}
      shape="circle"
      size="large"
      onClick={onLeaveClick}
      title="Leave session">
      End
    </Button>
  );
};

export { LeaveButton };
