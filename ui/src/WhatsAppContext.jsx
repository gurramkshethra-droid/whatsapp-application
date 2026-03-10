import { createContext, useContext, useState } from "react";

const WhatsAppContext = createContext();

const initialChats = [
  {
    id: 1,
    name: "Alice Smith",
    avatar: "https://i.pravatar.cc/150?u=alice",
    messages: [
      { id: 101, sender: "Alice Smith", text: "Hey! How are you doing?", time: "10:00 AM", isMine: false },
      { id: 102, sender: "You", text: "I'm doing great, thanks! What about you?", time: "10:05 AM", isMine: true },
      { id: 103, sender: "Alice Smith", text: "Just working on a React project.", time: "10:06 AM", isMine: false }
    ]
  },
  {
    id: 2,
    name: "Bob Jones",
    avatar: "https://i.pravatar.cc/150?u=bob",
    messages: [
      { id: 201, sender: "Bob Jones", text: "Don't forget the meeting at 3 PM.", time: "09:30 AM", isMine: false },
      { id: 202, sender: "You", text: "Noted! I'll be there.", time: "09:45 AM", isMine: true }
    ]
  },
  {
    id: 3,
    name: "React Dev Group",
    avatar: "https://i.pravatar.cc/150?u=react",
    messages: [
      { id: 301, sender: "Charlie", text: "Has anyone tried the new Context API features?", time: "Yesterday", isMine: false }
    ]
  }
];

const initialStatuses = [
  { id: 1, name: "Alice Smith", time: "10 minutes ago", avatar: "https://i.pravatar.cc/150?u=alice", text: "This is alice ",hasUpdate: true },
  { id: 2, name: "Bob Jones", time: "1 hour ago", avatar: "https://i.pravatar.cc/150?u=bob", text: "This is bob ", hasUpdate: true },
  { id: 3, name: "Charlie", time: "Yesterday", avatar: "https://i.pravatar.cc/150?u=charlie", text: "This is charlie ", hasUpdate: false }
];

const initialCalls = [
  { id: 1, name: "Bob Jones", time: "Today, 11:30 AM", type: "video", incoming: true, missed: false, avatar: "https://i.pravatar.cc/150?u=bob" },
  { id: 2, name: "Alice Smith", time: "Yesterday, 8:00 PM", type: "audio", incoming: false, missed: true, avatar: "https://i.pravatar.cc/150?u=alice" },
  { id: 3, name: "Charlie", time: "Monday, 10:00 AM", type: "audio", incoming: false, missed: false, avatar: "https://i.pravatar.cc/150?u=charlie" }
];

const initialCommunities = [];

export const WhatsAppProvider = ({ children }) => {
  const [chats, setChats] = useState(initialChats);
  const [statuses] = useState(initialStatuses);
  const [calls, setCalls] = useState(initialCalls);
  const [communities] = useState(initialCommunities);

  // Global Navigation State
  const [activeTab, setActiveTab] = useState("chats"); // 'chats', 'statuses', 'calls', 'communities'
  const [activeChatId, setActiveChatId] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [activeStatusId, setActiveStatusId] = useState(null); // Added this state

  const makeCall = (name, avatar, type) => {
  const newCall = {
    id: Date.now(),
    name: name,
    avatar: avatar,
    type: type,
    incoming: false,
    missed: false,
    time: "Now"
  };

  setCalls((prev) => [newCall, ...prev]);
};

  // Actions
  const sendMessage = (content) => {
  if (!activeChatId) return;

  const newMessage = {
    id: Date.now(),
    sender: "You",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    isMine: true,
    type: typeof content === "string" ? "text" : content.type,
    text: typeof content === "string" ? content : "",
    url: typeof content === "object" ? content.url : null
  };

  setChats((prevChats) =>
    prevChats.map((chat) =>
      chat.id === activeChatId
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    )
  );
};
  const value = {
    chats,
    statuses,
    calls,
    communities,
    activeTab,
    setActiveTab,
    activeChatId,
    setActiveChatId,
    activeStatusId, // <-- Fixed: Added this variable to the context output
    setActiveStatusId,
    sendMessage,
    makeCall,
    activeChat: chats.find(c => c.id === activeChatId) || null,
    showProfile,
    setShowProfile
  };

  return (
    <WhatsAppContext.Provider value={value}>
      {children}
    </WhatsAppContext.Provider>
  );
};

export const useWhatsApp = () => useContext(WhatsAppContext);