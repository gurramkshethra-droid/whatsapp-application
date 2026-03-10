import SidebarNav from "./SidebarNav";
import { useWhatsApp } from "./WhatsAppContext";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import StatusView from "./StatusView";
import CallLog from "./CallLog";
import Community from "./Community";
import ProfileView from "./ProfileView";

const Layout = () => {
  const { activeTab, showProfile } = useWhatsApp();

  const renderRightPane = () => {
     if (showProfile) {
    return <ProfileView />;
  }
    switch (activeTab) {
      case "chats":
        return <ChatWindow />;
      case "statuses":
        // Without an active status selected, this will render the empty state defined in StatusView
        return <StatusView />;
      case "calls":
        return <CallLog />;
      case "communities":
        return <Community />;
      default:
        return <ChatWindow />;
    }
  };

  return (
    <div className="app-layout">
      <SidebarNav />
      <Sidebar />
      <div className="main-content">
        {renderRightPane()}
      </div>
    </div>
  );
};

export default Layout;