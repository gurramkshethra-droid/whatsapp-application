import { useWhatsApp } from "./WhatsAppContext";
import { Avatar, IconButton, Divider } from "./UIComponents";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import LinkIcon from "@mui/icons-material/Link";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";

const CallLog = () => {
const { calls, makeCall } = useWhatsApp();

// Create Call Link
const createCallLink = () => {
const randomId = Math.random().toString(36).substring(2, 10);
const callLink = "https://whatsapp-clone-call/${randomId}";

navigator.clipboard.writeText(callLink);
alert(`Call link created!\n\n${callLink}\n\nLink copied to clipboard.`);

};

return (
<div className="call-log-container">

  {/* Create Call Link */}
  <div className="call-link-section list-item" onClick={createCallLink}>
    <div
      className="link-icon-wrapper"
      style={{
        backgroundColor: "#00a884",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }}
    >
      <LinkIcon sx={{ color: "white" }} />
    </div>

    <div className="item-content">
      <div className="item-header">
        <span className="item-title">Create call link</span>
      </div>
      <div className="item-subtitle">
        Share a link for your WhatsApp call
      </div>
    </div>
  </div>

  {/* Recent Calls */}
  <div
    style={{
      padding: "16px 20px 8px 20px",
      color: "#54656f",
      fontSize: "14px",
      fontWeight: "500"
    }}
  >
    Recent
  </div>

  <div className="recent-calls-list">
    {calls.map((call) => (
      <div key={call.id}>

        <div className="list-item">
          <Avatar src={call.avatar} alt={call.name} />

          <div className="item-content">
            <div className="item-header">

              <span className="item-title">{call.name}</span>

              {/* Voice Call Button */}
              <IconButton
                onClick={() => makeCall(call.name, call.avatar, "audio")}
              >
                <CallIcon sx={{ color: "#00a884" }} />
              </IconButton>

              {/* Video Call Button */}
              <IconButton
                onClick={() => makeCall(call.name, call.avatar, "video")}
              >
                <VideocamIcon sx={{ color: "#00a884" }} />
              </IconButton>

            </div>

            <div
              className="item-subtitle"
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              {call.incoming ? (
                <CallReceivedIcon sx={{ fontSize: 16, color: "#00a884" }} />
              ) : (
                <CallMadeIcon sx={{ fontSize: 16, color: "#00a884" }} />
              )}

              {call.time}
            </div>
          </div>

        </div>

        <Divider />
      </div>
    ))}
  </div>

  {/* Floating Call Button */}
  <div
    className="fab-container"
    style={{ position: "absolute", bottom: "24px", right: "24px" }}
  >
    <button
      style={{
        backgroundColor: "#00a884",
        color: "white",
        border: "none",
        borderRadius: "16px",
        width: "56px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
      }}
    >
      <AddIcCallIcon />
    </button>
  </div>

</div>

);
};

export default CallLog;