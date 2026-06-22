import { useState } from "react";
import { FiBell, FiCheck, FiMenu, FiSearch, FiX } from "react-icons/fi";
import { useHiring } from "../App";

export default function DashboardHeader({ openMenu }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, setNotifications } = useHiring();
  const clear = () => setNotifications([]);
  return (
    <header className="dashboard-header">
      <button className="dashboard-menu" onClick={openMenu}><FiMenu /></button>
      <div className="global-search"><FiSearch /><input aria-label="Search" placeholder="Search candidates, roles…" /><kbd>⌘ K</kbd></div>
      <div className="header-actions"><button className="icon-button notification-button" onClick={() => setShowNotifications(!showNotifications)}><FiBell />{notifications.length > 0 && <span>{notifications.length}</span>}</button><div className="avatar purple">NR</div></div>
      {showNotifications && <div className="notification-panel">
        <div className="panel-title"><div><h3>Notifications</h3><span>{notifications.length} unread</span></div><button onClick={() => setShowNotifications(false)}><FiX /></button></div>
        {notifications.length ? notifications.map((item) => <div className="notification-item" key={item.id}><span className={`notification-icon ${item.type}`}><FiBell /></span><div><strong>{item.title}</strong><p>{item.detail}</p><small>{item.time} ago</small></div></div>) : <div className="empty-compact"><FiCheck /><p>You’re all caught up</p></div>}
        {notifications.length > 0 && <button className="text-button notification-clear" onClick={clear}>Mark all as read</button>}
      </div>}
    </header>
  );
}
