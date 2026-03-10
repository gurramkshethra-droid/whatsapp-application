import { useState } from "react";
import { useWhatsApp } from "./WhatsAppContext";
import { Avatar, IconButton, Divider } from "./UIComponents";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import GroupsIcon from "@mui/icons-material/Groups";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhoneIcon from "@mui/icons-material/Phone";

const Sidebar = () => {
  const {
    chats,
    statuses,
    calls,
    communities,
    activeTab,
    setActiveTab,
    activeChatId,
    setActiveChatId,
    activeStatusId, // <-- Fixed: Pulled this from context
    setActiveStatusId // <-- Fixed: Pulled this from context
  } = useWhatsApp();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const renderChats = () => {
    const filteredChats = chats.filter((chat) =>
      chat.name.toLowerCase().includes(searchQuery)
    );

    return filteredChats.map((chat) => {
      const lastMessage = chat.messages[chat.messages.length - 1];
      return (
        <div key={chat.id}>
          <div
            className={`list-item ${activeChatId === chat.id ? "active" : ""}`}
            onClick={() => {
              setActiveChatId(chat.id);
            }}
          >
            <Avatar src={chat.avatar} alt={chat.name} />
            <div className="item-content">
              <div className="item-header">
                <span className="item-title">{chat.name}</span>
                {lastMessage && (
                  <span className="item-time">{lastMessage.time}</span>
                )}
              </div>
              <div className="item-subtitle">
                {lastMessage ? lastMessage.text : "No messages yet"}
              </div>
            </div>
          </div>
          <Divider />
        </div>
      );
    });
  };

  const renderStatuses = () => {
    const filteredStatuses = statuses.filter((status) =>
      status.name.toLowerCase().includes(searchQuery)
    );

    return filteredStatuses.map((status) => (
      <div key={status.id}>
        <div 
          className={`list-item ${activeStatusId === status.id ? "active" : ""}`}
          onClick={() => setActiveStatusId(status.id)}
        >
          <div className={`status-avatar-ring ${status.hasUpdate ? "unread" : "read"}`}>
            <Avatar src={status.avatar} alt={status.name} />
          </div>
          <div className="item-content">
            <div className="item-header">
              <span className="item-title">{status.name}</span>
            </div>
            <div className="item-subtitle">{status.time}</div>
          </div>
        </div>
        <Divider />
      </div>
    ));
  };

  const renderCalls = () => {
    const filteredCalls = calls.filter((call) =>
      call.name.toLowerCase().includes(searchQuery)
    );

    return filteredCalls.map((call) => (
      <div key={call.id}>
        <div className="list-item">
          <Avatar src={call.avatar} alt={call.name} />
          <div className="item-content">
            <div className="item-header">
              <span className="item-title">{call.name}</span>
              <IconButton>
                {call.type === "video" ? <VideocamIcon sx={{ color: "#00a884" }} /> : <PhoneIcon sx={{ color: "#00a884" }} />}
              </IconButton>
            </div>
            <div className="item-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {call.incoming ? (
                <CallReceivedIcon sx={{ fontSize: 16, color: call.missed ? "red" : "#00a884" }} />
              ) : (
                <CallMadeIcon sx={{ fontSize: 16, color: "#00a884" }} />
              )}
              {call.time}
            </div>
          </div>
        </div>
        <Divider />
      </div>
    ));
  };

  const renderCommunities = () => {
    const filteredComms = communities.filter((comm) =>
      comm.name.toLowerCase().includes(searchQuery)
    );

    return filteredComms.map((comm) => (
      <div key={comm.id}>
        <div className="list-item">
          <Avatar src={comm.avatar} alt={comm.name} />
          <div className="item-content">
            <div className="item-header">
              <span className="item-title">{comm.name}</span>
            </div>
            <div className="item-subtitle">{comm.description}</div>
          </div>
        </div>
        <Divider />
      </div>
    ));
  };

  return (
    <div className="sidebar">

      <div className="search-container">
        <div className="search-bar">
          <SearchIcon sx={{ color: "#54656f", fontSize: 20 }} />
          <input
            type="text"
            placeholder={`Search or start a new ${activeTab.slice(0, -1)}`}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <IconButton title="Filter chats by unread">
          <FilterListIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </div>

      <div className="sidebar-list">
        {activeTab === "chats" && renderChats()}
        {activeTab === "statuses" && renderStatuses()}
        {activeTab === "calls" && renderCalls()}
        {activeTab === "communities" && renderCommunities()}
      </div>
    </div>
  );
};

export default Sidebar;