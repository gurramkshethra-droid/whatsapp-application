export const Avatar = ({ src, alt = "avatar", size = "48px" }) => {
  return (
    <img
      src={src || "https://via.placeholder.com/150"}
      alt={alt}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
      }}
    />
  );
};

export const IconButton = ({ children, onClick, title }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        color: "#54656f",
        borderRadius: "50%",
      }}
      className="icon-button"
    >
      {children}
    </button>
  );
};

export const FloatingActionButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        bottom: "24px",
        right: "24px",
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
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
      }}
    >
      {children}
    </button>
  );
};

export const Divider = () => {
  return (
    <hr
      style={{
        margin: "0 0 0 72px",
        border: "none",
        borderTop: "1px solid #f0f2f5",
      }}
    />
  );
};