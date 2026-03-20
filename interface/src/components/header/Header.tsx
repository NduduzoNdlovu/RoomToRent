import { useState, useRef, useEffect } from "react";
import {notificationsOutline } from "ionicons/icons";
import {IonIcon} from '@ionic/react'
import "./Header.css";

interface User {
  firstName: string;
  gender: "male" | "female";
  location: string;
  newListings: number;
  photo?: string | null;
}

interface Notification {
  id: number;
  text: string;
  time: string;
  unread: boolean;
}

const defaultNotifications: Notification[] = [
  { id: 1, text: "New room listed in KwaMashu", time: "2 min ago", unread: true },
  { id: 2, text: "Landlord replied to your message", time: "1 hr ago", unread: true },
  { id: 3, text: "New listing in Umlazi matches your search", time: "3 hrs ago", unread: false },
  { id: 4, text: "New room listed in KwaMashu", time: "2 min ago", unread: false },
  { id: 5, text: "Landlord replied to your message", time: "1 hr ago", unread: true },
  { id: 6, text: "New listing in Umlazi matches your search", time: "3 hrs ago", unread: false },
];

function AvatarIcon({ gender }: { gender: "male" | "female" }) {
  const isFemale = gender === "female";
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <circle cx="21" cy="21" r="21" fill={isFemale ? "#f8c8d4" : "#c8dff8"} />
      <circle cx="21" cy="16" r="7" fill={isFemale ? "#e8a0b0" : "#90b8e8"} />
      <ellipse cx="21" cy="33" rx="10" ry="7" fill={isFemale ? "#e8a0b0" : "#90b8e8"} />
      {isFemale ? (
        <>
          <ellipse cx="21" cy="11" rx="7.5" ry="4" fill="#5c3a1e" />
          <ellipse cx="14.5" cy="15" rx="2" ry="5" fill="#5c3a1e" />
          <ellipse cx="27.5" cy="15" rx="2" ry="5" fill="#5c3a1e" />
        </>
      ) : (
        <ellipse cx="21" cy="10.5" rx="7" ry="3.5" fill="#3a2a1e" />
      )}
    </svg>
  );
}

interface HeaderProps {
  user?: User;
  onAvatarClick?: () => void;
}

export default function Header({ user, onAvatarClick }: HeaderProps) {
  const currentUser: User = user ?? {
    firstName: "Nduduzo",
    gender: "male",
    location: "Durban, KZN",
    newListings: 3,
    photo: null,
  };

  const [showPanel, setShowPanel] = useState(false);
  const [notifs, setNotifs] = useState<Notification[]>(defaultNotifications);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter((n) => n.unread).length;

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPanel(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="header">
      {/* Left — Avatar + Greeting */}
      <div className="header__left">
        <div className="header__avatar" onClick={onAvatarClick} title="View Profile">
          {currentUser.photo ? (
            <img src={currentUser.photo} alt="avatar" className="header__avatar-img" />
          ) : (
            <AvatarIcon gender={currentUser.gender} />
          )}
        </div>

        <div className="header__greeting-block">
          <p className="header__greeting">
            {getGreeting()}, {currentUser.firstName}
          </p>
          <p className="header__subtitle">
             {currentUser.location}&nbsp;·&nbsp;{currentUser.newListings} new listings
          </p>
        </div>
      </div>

      {/* Right — Bell */}
      <div className="header__bell-wrapper" ref={panelRef}>
        <button
          className="header__bell-btn"
          onClick={() => setShowPanel((prev) => !prev)}
          aria-label="Notifications"
        >
          <IonIcon icon={notificationsOutline}></IonIcon>
          {unreadCount > 0 && (
            <span className="header__badge">{unreadCount}</span>
          )}
        </button>

        {/* Dropdown Panel */}
        {showPanel && (
          <div className="header__panel">
            <div className="header__panel-top">
              <span className="header__panel-title">Notifications</span>
              {unreadCount > 0 && (
                <button className="header__mark-read" onClick={markAllRead}>
                  Mark all read
                </button>
              )}
            </div>

            {notifs.map((n) => (
              <div
                key={n.id}
                className={`header__notif-item ${n.unread ? "header__notif-item--unread" : ""}`}
              >
                <span className={`header__notif-dot ${n.unread ? "header__notif-dot--unread" : ""}`} />
                <div>
                  <p className="header__notif-text">{n.text}</p>
                  <p className="header__notif-time">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
