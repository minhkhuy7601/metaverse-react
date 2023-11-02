import { IconFont } from "@/components/zoomSdk/icon-font";
import { UpOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import classNames from "classnames";
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
    <DropdownButton
      className="vc-dropdown-button"
      size="large"
      menu={getAntdDropdownMenu(
        [getAntdItem("End session", "end")],
        onEndClick
      )}
      trigger={["click"]}
      onClick={onLeaveClick}
      icon={<UpOutlined />}
      placement="topRight">
      <IconFont type="icon-leave" />
    </DropdownButton>
  ) : (
    <Button
      className={classNames("vc-button")}
      icon={<IconFont type="icon-leave" />}
      ghost={true}
      shape="circle"
      size="large"
      onClick={onLeaveClick}
      title="Leave session"
    />
  );
};

export { LeaveButton };
