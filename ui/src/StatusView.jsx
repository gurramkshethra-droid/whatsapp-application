import { useWhatsApp } from "./WhatsAppContext";
import { Avatar, IconButton } from "./UIComponents";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SendIcon from "@mui/icons-material/Send";
import LockIcon from "@mui/icons-material/Lock";

const StatusView = () => {
  // 1. Pull the state directly from our Context Brain
  const { statuses, activeStatusId, setActiveStatusId } = useWhatsApp();

  // 2. Find the actual status object based on the ID
  const status = statuses?.find((s) => s.id === activeStatusId);

  // 3. Handle closing the viewer
  const handleClose = () => {
    if (setActiveStatusId) setActiveStatusId(null);
  };

  if (!status) {
    return (
      <div className="status-view empty-state">
        <div className="empty-state-content">
          <div className="status-ring-placeholder">
            <div className="ring-circle"></div>
          </div>
          <h2>Click on a contact to view their status updates</h2>
          <p className="encryption-notice">
            <LockIcon sx={{ fontSize: 14 }} /> Your status updates are end-to-end encrypted
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="status-viewer-container">
      <div className="status-viewer-header">
        <div className="status-progress-bar">
          <div className="progress-fill"></div>
        </div>
        <div className="status-user-details">
          <IconButton onClick={handleClose} title="Close">
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
          <Avatar src={status.avatar} alt={status.name} />
          <div className="status-meta">
            <span className="status-viewer-name">{status.name}</span>
            <span className="status-viewer-time">{status.time}</span>
          </div>
          <div className="status-actions-right">
            <IconButton title="Menu">
              <MoreVertIcon sx={{ color: "white" }} />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="status-viewer-body">
        {/* Mocking a status background and content */}
        <div className="status-media" style={{ backgroundColor: "#8c52ff" }}>
          <h1 className="status-text-content">
            {status.text}
          </h1>
        </div>
      </div>

      <div className="status-viewer-footer">
        <IconButton title="Emoji">
          <SentimentSatisfiedAltIcon sx={{ color: "white" }} />
        </IconButton>
        <input
          type="text"
          placeholder="Type a reply..."
          className="status-reply-input"
        />
        <IconButton title="Send">
          <SendIcon sx={{ color: "white" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default StatusView;