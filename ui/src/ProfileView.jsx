import { useWhatsApp } from "./WhatsAppContext";
import { Avatar, IconButton } from "./UIComponents";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProfileView = () => {
  const { activeChat, setShowProfile } = useWhatsApp();

  if (!activeChat) return null;

  return (
    <div style={{height:"100%", background:"#fff"}}>
      
      <div style={{
        display:"flex",
        alignItems:"center",
        padding:"16px",
        background:"#f0f2f5"
      }}>
        <IconButton onClick={() => setShowProfile(false)}>
          <ArrowBackIcon />
        </IconButton>
        <h3 style={{marginLeft:"10px"}}>Contact Info</h3>
      </div>

      <div style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        padding:"40px"
      }}>
        <Avatar src={activeChat.avatar} size="120px"/>
        <h2 style={{marginTop:"20px"}}>{activeChat.name}</h2>
        <p style={{color:"#667781"}}>Online</p>
      </div>

    </div>
  );
};

export default ProfileView;