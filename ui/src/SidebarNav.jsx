import { useWhatsApp } from "./WhatsAppContext";
import { IconButton, Avatar } from "./UIComponents";
import GroupsIcon from "@mui/icons-material/Groups";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SidebarNav = () => {
  const { activeTab, setActiveTab } = useWhatsApp();

  return (
    <div className="sidebar-nav">

      <Avatar src="https://i.pravatar.cc/150?u=you" alt="profile" />

      <IconButton onClick={() => setActiveTab("communities")}>
        <GroupsIcon sx={{ color: activeTab === "communities" ? "#00a884" : "#54656f" }} />
      </IconButton>

      <IconButton onClick={() => setActiveTab("statuses")}>
        <DonutLargeIcon sx={{ color: activeTab === "statuses" ? "#00a884" : "#54656f" }} />
      </IconButton>

      <IconButton onClick={() => setActiveTab("chats")}>
        <ChatIcon sx={{ color: activeTab === "chats" ? "#00a884" : "#54656f" }} />
      </IconButton>

      <IconButton onClick={() => setActiveTab("calls")}>
        <CallIcon sx={{ color: activeTab === "calls" ? "#00a884" : "#54656f" }} />
      </IconButton>

      <IconButton>
        <MoreVertIcon />
      </IconButton>

    </div>
  );
};

export default SidebarNav;