function Menu({ items }) {
    return (
        <div className="menu">
            {items.map((item, index) => (
                <a key={index} href={`/${item}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</a>/*Menu itms*/
            ))}
        </div>
    )
}
export default Menu;
