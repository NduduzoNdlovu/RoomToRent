// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../../components/ExploreContainer';
// import './Search.css';

// const Search: React.FC = () => {
//   return (
//     <IonPage>
//       <IonContent fullscreen>

        
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Search;
import { useState, useMemo } from "react";
import {
  IonPage,
  IonContent,
  IonSearchbar,
} from "@ionic/react";
import "./Search.css";
import FilterDrawer from "./FilterDrawer";

export interface Room {
  id: number;
  title: string;
  images: string[];
  area: string;
  city: string;
  price: number;
  rooms: number;
  maxPeople: number;
  deposit: boolean;
  available: boolean;
  taxiRoute: string;
  noisePolicy: "strict" | "quiet-hours" | "allowed";
  tenantType: string[];
  tags: string[];
  verified: boolean;
  saved: boolean;
}

export interface Filters {
  priceMin: number;
  priceMax: number;
  city: string;
  roomType: string;
  deposit: "no-deposit" | "deposit-ok" | "any";
  availability: "now" | "any";
  taxiRoute: string;
  maxPeople: number;
  noisePolicy: string;
  tenantType: string[];
}

const defaultFilters: Filters = {
  priceMin: 500,
  priceMax: 5000,
  city: "",
  roomType: "",
  deposit: "any",
  availability: "any",
  taxiRoute: "",
  maxPeople: 0,
  noisePolicy: "",
  tenantType: [],
};

const SAMPLE_ROOMS: Room[] = [
  { id: 1, title: "Single Room", images:["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg","https://images.unsplash.com/photo-1505692794403-35b3f52b1e4b", "https://images.unsplash.com/photo-1505692794403-35b3f52b1e4b"],area: "KwaMashu", city: "Durban", price: 1500, rooms: 1, maxPeople: 1, deposit: false, available: true, taxiRoute: "KwaMashu–CBD", noisePolicy: "strict", tenantType: ["working", "night-shift"], tags: ["No noise", "Water incl.", "Night shift ok"], verified: true, saved: true },
  { id: 2, title: "2-Bedroom Flat", images:["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg","https://images.unsplash.com/photo-1505692794403-35b3f52b1e4b", "https://images.unsplash.com/photo-1505692794403-35b3f52b1e4b"],area: "Umlazi", city: "Durban", price: 2200, rooms: 2, maxPeople: 2, deposit: false, available: true, taxiRoute: "Umlazi–Warwick", noisePolicy: "quiet-hours", tenantType: ["working", "not-working", "students"], tags: ["No deposit", "2 people", "Students ok"], verified: true, saved: false },
  { id: 3, title: "Bachelor Flat",images:["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg", "https://images.unsplash.com/photo-1505692794403-35b3f52b1e4b", "https://images.unsplash.com/photo-1505692794403-35b3f52b1e4b"], area: "Soweto", city: "Johannesburg", price: 1800, rooms: 1, maxPeople: 1, deposit: true, available: true, taxiRoute: "Soweto–Park Stn", noisePolicy: "allowed", tenantType: ["working", "not-working"], tags: ["Noise ok", "Own linen", "Elec incl."], verified: false, saved: false },
  { id: 4, title: "Shared Room", images:["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg", "https://images.unsplash.com/photo-1505692794403-35b3f52b1e4b", "https://images.unsplash.com/photo-1505692794403-35b3f52b1e4b"], area: "Mitchells Plain", city: "Cape Town", price: 800, rooms: 1, maxPeople: 3, deposit: false, available: false, taxiRoute: "Mitchells Plain–CBD", noisePolicy: "strict", tenantType: ["working"], tags: ["No noise", "No deposit", "Working only"], verified: true, saved: false },
  { id: 5, title: "Single Room", images:["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg", "https://images.unsplash.com/photo-1505692794403-35b3f52b1e4b", "https://images.unsplash.com/photo-1505692794403-35b3f52b1e4b"], area: "Tembisa", city: "Johannesburg", price: 1200, rooms: 1, maxPeople: 1, deposit: false, available: true, taxiRoute: "Soweto–Park Stn", noisePolicy: "quiet-hours", tenantType: ["night-shift", "working"], tags: ["Quiet hours", "Night shift ok", "Water incl."], verified: false, saved: true },
  { id: 6, title: "2-Bedroom House", images:["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg", "https://images.unsplash.com/photo-1505692794403-35b3f52b1e4b", "https://images.unsplash.com/photo-1505692794403-35b3f52b1e4b"],area: "Gugulethu", city: "Cape Town", price: 3200, rooms: 2, maxPeople: 4, deposit: true, available: true, taxiRoute: "Mitchells Plain–CBD", noisePolicy: "allowed", tenantType: ["working", "students", "not-working"], tags: ["Noise ok", "Garden", "Parking"], verified: true, saved: false },
];

function countActiveFilters(f: Filters): number {
  let count = 0;
  if (f.city) count++;
  if (f.roomType) count++;
  if (f.deposit !== "any") count++;
  if (f.availability !== "any") count++;
  if (f.taxiRoute) count++;
  if (f.maxPeople > 0) count++;
  if (f.noisePolicy) count++;
  if (f.tenantType.length > 0) count++;
  if (f.priceMin !== 500 || f.priceMax !== 5000) count++;
  return count;
}

function RoomCard({ room, onToggleSave }: { room: Room; onToggleSave: (id: number) => void }) {
  return (
    <div className="room-card">
      <div className="room-card__photo">
  {room.images && room.images.length > 0 ? (
    <img
      src={room.images[0]}
      alt={room.title}
      className="room-card__photo-img"
    />
  ) : (
        <div className="room-card__photo-placeholder">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="10" width="28" height="18" rx="3" stroke="#888" strokeWidth="1.5" fill="none"/>
            <path d="M10 10V8a6 6 0 0 1 12 0v2" stroke="#888" strokeWidth="1.5" fill="none"/>
            <rect x="12" y="18" width="8" height="10" rx="1.5" fill="#bbb"/>
          </svg>
        </div>
         )}
        <div className="room-card__price-badge">R{room.price.toLocaleString()}/mo</div>
        <button className="room-card__save-btn" onClick={() => onToggleSave(room.id)}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill={room.saved ? "#e53935" : "none"} stroke={room.saved ? "#e53935" : "#888"} strokeWidth="1.5">
            <path d="M8 14s-6-3.8-6-8a4 4 0 0 1 6-3.46A4 4 0 0 1 14 6c0 4.2-6 8-6 8z"/>
          </svg>
        </button>
        {room.verified && (
          <div className="room-card__verified">
            <svg width="9" height="9" viewBox="0 0 10 10" fill="#4fc3f7">
              <path d="M5 1l1.1 2.2L9 3.6 7 5.5l.5 2.8L5 7l-2.5 1.3L3 5.5 1 3.6l2.9-.4z"/>
            </svg>
            Verified
          </div>
        )}
      </div>

      <div className="room-card__body">
        <div className="room-card__top">
          <div>
            <p className="room-card__title">{room.title}</p>
            <p className="room-card__location">
              <svg width="10" height="12" viewBox="0 0 12 14" fill="none">
                <path d="M6 1C3.8 1 2 2.8 2 5c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z" stroke="#888" strokeWidth="1.2" fill="none"/>
                <circle cx="6" cy="5" r="1.8" stroke="#888" strokeWidth="1.2"/>
              </svg>
              {room.area}, {room.city}
            </p>
          </div>
        </div>

        <div className="room-card__stats">
          <div className="room-card__stat">
            <span className="room-card__stat-value">{room.rooms}</span>
            <span className="room-card__stat-label">Room{room.rooms > 1 ? "s" : ""}</span>
          </div>
          <div className="room-card__stat-divider"/>
          <div className="room-card__stat">
            <span className="room-card__stat-value">{room.maxPeople}</span>
            <span className="room-card__stat-label">People</span>
          </div>
          <div className="room-card__stat-divider"/>
          <div className="room-card__stat">
            <span className={`room-card__stat-value ${!room.deposit ? "green" : ""}`}>{room.deposit ? "Yes" : "No"}</span>
            <span className="room-card__stat-label">Deposit</span>
          </div>
          <div className="room-card__stat-divider"/>
          <div className="room-card__stat">
            <span className={`room-card__stat-value ${room.available ? "green" : "muted"}`}>{room.available ? "Now" : "Soon"}</span>
            <span className="room-card__stat-label">Available</span>
          </div>
        </div>

        <div className="room-card__tags">
          {room.tags.map((tag) => (
            <span key={tag} className="room-card__tag">{tag}</span>
          ))}
        </div>

        <div className="room-card__actions">
          <button className="room-card__btn room-card__btn--whatsapp">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#25d366">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.9-2.8-1.5-3.9-3.5-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5-.1-.1-.7-1.8-1-2.4-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.5 4.9.8.3 1.4.5 1.8.6.8.2 1.5.2 2 .1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.2.2-1.4-.1-.2-.3-.3-.6-.4z"/>
              <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.2L2 22l5-1.5C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.8 0-3.5-.5-5-1.4l-.4-.2-3 .8.8-2.9-.2-.4C3.5 15.4 3 13.7 3 12 3 7 7 3 12 3s9 4 9 9-4 9-9 9z"/>
            </svg>
            WhatsApp
          </button>
          <button className="room-card__btn room-card__btn--view">View Room</button>
        </div>
      </div>
    </div>
  );
}

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>(SAMPLE_ROOMS);

  const activeFilterCount = countActiveFilters(filters);

  const filtered = useMemo(() => {
    return rooms.filter((r) => {
      if (searchText) {
        const q = searchText.toLowerCase();
        if (!r.title.toLowerCase().includes(q) && !r.area.toLowerCase().includes(q) && !r.city.toLowerCase().includes(q)) return false;
      }
      if (r.price < filters.priceMin || r.price > filters.priceMax) return false;
      if (filters.city && r.city !== filters.city) return false;
      if (filters.roomType) {
        const map: Record<string, number> = { Single: 1, Bachelor: 1, "2-Bed": 2, Shared: 1 };
        if (filters.roomType !== "Shared" && map[filters.roomType] !== r.rooms) return false;
      }
      if (filters.deposit === "no-deposit" && r.deposit) return false;
      if (filters.deposit === "deposit-ok" && !r.deposit) return false;
      if (filters.availability === "now" && !r.available) return false;
      if (filters.taxiRoute && r.taxiRoute !== filters.taxiRoute) return false;
      if (filters.maxPeople > 0 && r.maxPeople < filters.maxPeople) return false;
      if (filters.noisePolicy && r.noisePolicy !== filters.noisePolicy) return false;
      if (filters.tenantType.length > 0 && !filters.tenantType.some((t) => r.tenantType.includes(t))) return false;
      return true;
    });
  }, [rooms, searchText, filters]);

  const activeChips = useMemo(() => {
    const chips: { label: string; key: string }[] = [];
    if (filters.city) chips.push({ label: filters.city, key: "city" });
    if (filters.priceMin !== 500 || filters.priceMax !== 5000) chips.push({ label: `R${filters.priceMin}–R${filters.priceMax}`, key: "price" });
    if (filters.deposit !== "any") chips.push({ label: filters.deposit === "no-deposit" ? "No deposit" : "Deposit ok", key: "deposit" });
    if (filters.availability === "now") chips.push({ label: "Available now", key: "availability" });
    if (filters.taxiRoute) chips.push({ label: filters.taxiRoute, key: "taxiRoute" });
    if (filters.roomType) chips.push({ label: filters.roomType, key: "roomType" });
    if (filters.noisePolicy) chips.push({ label: filters.noisePolicy === "strict" ? "No noise" : filters.noisePolicy === "quiet-hours" ? "Quiet hours" : "Noise ok", key: "noisePolicy" });
    filters.tenantType.forEach((t) => chips.push({ label: t === "night-shift" ? "Night shift ok" : t === "working" ? "Working only" : t === "not-working" ? "Not working ok" : "Students ok", key: `tenant-${t}` }));
    return chips;
  }, [filters]);

  const removeChip = (key: string) => {
    if (key === "city") setFilters((f) => ({ ...f, city: "" }));
    else if (key === "price") setFilters((f) => ({ ...f, priceMin: 500, priceMax: 5000 }));
    else if (key === "deposit") setFilters((f) => ({ ...f, deposit: "any" }));
    else if (key === "availability") setFilters((f) => ({ ...f, availability: "any" }));
    else if (key === "taxiRoute") setFilters((f) => ({ ...f, taxiRoute: "" }));
    else if (key === "roomType") setFilters((f) => ({ ...f, roomType: "" }));
    else if (key === "noisePolicy") setFilters((f) => ({ ...f, noisePolicy: "" }));
    else if (key.startsWith("tenant-")) {
      const t = key.replace("tenant-", "");
      setFilters((f) => ({ ...f, tenantType: f.tenantType.filter((x) => x !== t) }));
    }
  };

  const toggleSave = (id: number) => {
    setRooms((prev) => prev.map((r) => r.id === id ? { ...r, saved: !r.saved } : r));
  };

  return (
    <IonPage>
      <IonContent fullscreen className="search-page">

        {/* Header */}
        <div className="search-header">
          <p className="search-header__title">Find a room</p>
          <div className="search-header__bar">
            <div className="search-header__input-wrap">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#888" strokeWidth="1.5">
                <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
              </svg>
              <input
                className="search-header__input"
                placeholder="Search by area, township, city..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && (
                <button className="search-header__clear" onClick={() => setSearchText("")}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#888" strokeWidth="1.5">
                    <path d="M1 1l10 10M11 1L1 11"/>
                  </svg>
                </button>
              )}
            </div>
            <button
              className={`search-header__filter-btn ${activeFilterCount > 0 ? "active" : ""}`}
              onClick={() => setDrawerOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 3h14M4 8h8M6 13h4"/>
              </svg>
              {activeFilterCount > 0 && (
                <span className="search-header__filter-badge">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="search-chips">
            {activeChips.map((chip) => (
              <span key={chip.key} className="search-chip">
                {chip.label}
                <button className="search-chip__remove" onClick={() => removeChip(chip.key)}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 1l6 6M7 1L1 7"/>
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Results count */}
        <div className="search-results-count">
          <span>{filtered.length} room{filtered.length !== 1 ? "s" : ""} found</span>
          {filters.city && <span className="search-results-count__city"> in {filters.city}</span>}
        </div>

        {/* Room cards */}
        <div className="search-list">
          {filtered.length === 0 ? (
            <div className="search-empty">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="22" cy="22" r="16" stroke="#c0dd97" strokeWidth="2"/>
                <path d="M33 33l9 9" stroke="#c0dd97" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 22h12M22 16v12" stroke="#c0dd97" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p>No rooms match your filters</p>
              <button onClick={() => { setFilters(defaultFilters); setSearchText(""); }}>Clear all filters</button>
            </div>
          ) : (
            filtered.map((room) => (
              <RoomCard key={room.id} room={room} onToggleSave={toggleSave} />
            ))
          )}
        </div>

        {/* Filter Drawer */}
        <FilterDrawer
          open={drawerOpen}
          filters={filters}
          onClose={() => setDrawerOpen(false)}
          onApply={(f:any) => { setFilters(f); setDrawerOpen(false); }}
        />

      </IonContent>
    </IonPage>
  );
};

export default Search;