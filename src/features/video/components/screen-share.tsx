/* eslint-disable */

import { IconFont } from "@/components/zoomSdk/icon-font";
import {
  CheckOutlined,
  LockOutlined,
  UnlockOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { SharePrivilege } from "@zoom/videosdk";
import { Button, Dropdown, Tooltip } from "antd";
import classNames from "classnames";
import { getAntdDropdownMenu, getAntdItem } from "./video-footer-utils";

const { Button: DropdownButton } = Dropdown;
interface ScreenShareButtonProps {
  sharePrivilege: SharePrivilege;
  isHostOrManager: boolean;
  onSharePrivilegeClick?: (privilege: SharePrivilege) => void;
  onScreenShareClick: () => void;
}

interface ScreenShareLockButtonProps {
  isLockedScreenShare: boolean;
  onScreenShareLockClick: () => void;
}

const ScreenShareButton = (props: ScreenShareButtonProps) => {
  const {
    sharePrivilege,
    isHostOrManager,
    onScreenShareClick,
    onSharePrivilegeClick,
  } = props;
  const menu = [
    getAntdItem(
      "Lock share",
      `${SharePrivilege.Locked}`,
      sharePrivilege === SharePrivilege.Locked && <CheckOutlined />
    ),
    getAntdItem(
      "One participant can share at a time",
      `${SharePrivilege.Unlocked}`,
      sharePrivilege === SharePrivilege.Unlocked && <CheckOutlined />
    ),
    getAntdItem(
      "Multiple participants can share simultaneously",
      `${SharePrivilege.MultipleShare}`,
      sharePrivilege === SharePrivilege.MultipleShare && <CheckOutlined />
    ),
  ];
  const onMenuItemClick = (payload: { key: any }) => {
    onSharePrivilegeClick?.(Number(payload.key));
  };
  return (
    <>
      {isHostOrManager ? (
        <DropdownButton
          className="vc-dropdown-button"
          size="large"
          menu={getAntdDropdownMenu(menu, onMenuItemClick)}
          onClick={onScreenShareClick}
          trigger={["click"]}
          icon={<UpOutlined />}
          placement="topRight">
          <IconFont type="icon-share" />
        </DropdownButton>
      ) : (
        <Button
          className={classNames("screen-share-button", "vc-button")}
          icon={<IconFont type="icon-share" />}
          ghost={true}
          shape="circle"
          size="large"
          onClick={onScreenShareClick}
        />
      )}
    </>
  );
};

const ScreenShareLockButton = (props: ScreenShareLockButtonProps) => {
  const { isLockedScreenShare, onScreenShareLockClick } = props;
  return (
    <Tooltip
      title={
        isLockedScreenShare ? "unlock screen share" : " lock screen share"
      }>
      <Button
        className="screen-share-button"
        icon={isLockedScreenShare ? <LockOutlined /> : <UnlockOutlined />}
        ghost={true}
        shape="circle"
        size="large"
        onClick={onScreenShareLockClick}
      />
    </Tooltip>
  );
};

export { ScreenShareButton, ScreenShareLockButton };
