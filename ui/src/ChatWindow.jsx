import { useState, useRef } from "react";
import { useWhatsApp } from "./WhatsAppContext";
import { Avatar, IconButton } from "./UIComponents";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "emoji-picker-react";

const ChatWindow = () => {
  const { activeChat, sendMessage, setShowProfile } = useWhatsApp();

  const [inputText, setInputText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const fileInputRef = useRef(null);

  // Send text message
  const handleSend = (e) => {
    e.preventDefault();

    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText("");
    }
  };

  // Add emoji to message
  const handleEmojiClick = (emojiData) => {
    setInputText((prev) => prev + emojiData.emoji);
  };

  // Open attachment dialog
  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const fileURL = URL.createObjectURL(file);

    sendMessage({
      type: "image",
      url: fileURL,
    });
  };

  if (!activeChat) {
    return (
      <div className="chat-window empty-chat">
        <div className="empty-chat-content">
          <h2>WhatsApp Web</h2>
          <p>Send and receive messages without keeping your phone online.</p>
          <p>
            Use WhatsApp on up to 4 linked devices and 1 phone at the same
            time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      
      {/* CHAT HEADER */}
      <div className="chat-header">
        <div
          className="chat-header-info"
          onClick={() => setShowProfile(true)}
        >
          <Avatar src={activeChat.avatar} alt={activeChat.name} />

          <div className="chat-header-text">
            <span className="chat-header-name">{activeChat.name}</span>
            <span className="chat-header-status">online</span>
          </div>
        </div>

        <div className="chat-header-actions">
          <IconButton title="Search">
            <SearchIcon />
          </IconButton>

          <IconButton title="Menu">
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* CHAT MESSAGES */}
      <div className="chat-messages">
        {activeChat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-wrapper ${msg.isMine ? "mine" : "theirs"}`}
          >
            <div className="message-bubble">

              {msg.type === "image" ? (
                <img
                  src={msg.url}
                  alt="sent"
                  style={{
                    maxWidth: "200px",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <span className="message-text">{msg.text}</span>
              )}

              <span className="message-time">{msg.time}</span>

            </div>
          </div>
        ))}
      </div>

      {/* EMOJI PICKER */}
      {showEmoji && (
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            left: "20px",
            zIndex: 100,
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {/* CHAT INPUT */}
      <form className="chat-input-area" onSubmit={handleSend}>

        <IconButton
          title="Emoji"
          onClick={() => setShowEmoji(!showEmoji)}
        >
          <InsertEmoticonIcon />
        </IconButton>

        <IconButton title="Attach" onClick={handleAttachmentClick}>
          <AttachFileIcon sx={{ transform: "rotate(45deg)" }} />
        </IconButton>

        <input
          type="text"
          placeholder="Type a message"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="message-input"
        />

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {inputText.trim() ? (
          <IconButton title="Send">
            <SendIcon sx={{ color: "#54656f" }} />
          </IconButton>
        ) : (
          <IconButton title="Voice Message">
            <MicIcon />
          </IconButton>
        )}

      </form>

    </div>
  );
};

export default ChatWindow;