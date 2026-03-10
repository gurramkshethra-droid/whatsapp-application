import { useState } from "react";
import { Avatar, Divider, FloatingActionButton } from "./UIComponents";
import AddIcon from "@mui/icons-material/Add";

const availableCommunities = [
  {
    id: 1,
    name: "React Developers",
    description: "Discuss React and frontend tools",
    avatar: "https://i.pravatar.cc/150?u=react"
  },
  {
    id: 2,
    name: "Frontend Designers",
    description: "UI / UX discussions",
    avatar: "https://i.pravatar.cc/150?u=design"
  },
  {
    id: 3,
    name: "Tech Meetups",
    description: "Local tech events",
    avatar: "https://i.pravatar.cc/150?u=tech"
  }
];

const Community = () => {

  const [myCommunities, setMyCommunities] = useState([]);
  const [showList, setShowList] = useState(false);

  const addCommunity = (community) => {
    setMyCommunities((prev) => [...prev, community]);
    setShowList(false);
  };

  return (
    <div className="community-container">

      {/* Selected Communities */}
      {myCommunities.map((comm) => (
        <div key={comm.id}>

          <div className="list-item">
            <Avatar src={comm.avatar} alt={comm.name} />

            <div className="item-content">
              <div className="item-header">
                <span className="item-title">{comm.name}</span>
              </div>

              <div className="item-subtitle">
                {comm.description}
              </div>
            </div>
          </div>

          <Divider />

        </div>
      ))}

      {/* Community Selection List */}
      {showList && (
        <div style={{ background: "#fff", borderTop: "1px solid #ddd" }}>
          {availableCommunities.map((comm) => (
            <div
              key={comm.id}
              className="list-item"
              onClick={() => addCommunity(comm)}
            >
              <Avatar src={comm.avatar} alt={comm.name} />

              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">{comm.name}</span>
                </div>

                <div className="item-subtitle">
                  {comm.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Button */}
      <FloatingActionButton onClick={() => setShowList(!showList)}>
        <AddIcon />
      </FloatingActionButton>

    </div>
  );
};

export default Community;