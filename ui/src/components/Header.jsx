import Menu from "./Menu";
function Header({ name }) {
    const items = ["chats","statuses","calls"];
    return (
        <div className="header">
            <h1>{name}</h1>
            <Menu items={items} />
        </div>
    )
}
export default Header;