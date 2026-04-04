import { useState, useEffect } from "react";
import { Filters } from "./Search";
import "./FilterDrawer.css";

interface FilterDrawerProps {
  open: boolean;
  filters: Filters;
  onClose: () => void;
  onApply: (filters: Filters) => void;
}

const CITIES = ["Durban", "Cape Town", "Johannesburg", "Pretoria"];
const ROOM_TYPES = ["Single", "Bachelor", "2-Bed", "Shared"];
const TAXI_ROUTES = ["KwaMashu–CBD", "Umlazi–Warwick", "Soweto–Park Stn", "Mitchells Plain–CBD"];
const NOISE_OPTIONS = [
  { value: "strict", label: "Strict no noise" },
  { value: "quiet-hours", label: "Quiet hours only" },
  { value: "allowed", label: "Noise allowed" },
];
const TENANT_OPTIONS = [
  { value: "working", label: "Working tenants" },
  { value: "not-working", label: "Not working ok" },
  { value: "night-shift", label: "Night shift ok" },
  { value: "students", label: "Students welcome" },
];

const FilterDrawer: React.FC<FilterDrawerProps> = ({ open, filters, onClose, onApply }) => {
  const [local, setLocal] = useState<Filters>(filters);

  useEffect(() => { setLocal(filters); }, [filters, open]);

  const toggle = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setLocal((f) => ({ ...f, [key]: f[key] === value ? "" : value }));
  };

  const toggleTenant = (value: string) => {
    setLocal((f) => ({
      ...f,
      tenantType: f.tenantType.includes(value)
        ? f.tenantType.filter((t) => t !== value)
        : [...f.tenantType, value],
    }));
  };

  const clearAll = () => {
    setLocal({
      priceMin: 500, priceMax: 5000, city: "", roomType: "",
      deposit: "any", availability: "any", taxiRoute: "",
      maxPeople: 0, noisePolicy: "", tenantType: [],
    });
  };

  if (!open) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="drawer__header">
          <span className="drawer__title">Filters</span>
          <div className="drawer__header-actions">
            <button className="drawer__clear-btn" onClick={clearAll}>Clear all</button>
            <button className="drawer__close-btn" onClick={onClose}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="1.8">
                <path d="M1 1l10 10M11 1L1 11"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="drawer__body">

          {/* Price range */}
          <div className="drawer__section">
            <p className="drawer__section-label">Price range</p>
            <div className="drawer__price-row">
              <span className="drawer__price-hint">R{local.priceMin.toLocaleString()}</span>
              <span className="drawer__price-value">R{local.priceMin.toLocaleString()} — R{local.priceMax.toLocaleString()}</span>
              <span className="drawer__price-hint">R{local.priceMax.toLocaleString()}</span>
            </div>
            <div className="drawer__range-wrap">
              <input type="range" min={500} max={5000} step={100}
                value={local.priceMin}
                onChange={(e) => setLocal((f) => ({ ...f, priceMin: Math.min(Number(e.target.value), f.priceMax - 100) }))}
                className="drawer__range drawer__range--min"
              />
              <input type="range" min={500} max={5000} step={100}
                value={local.priceMax}
                onChange={(e) => setLocal((f) => ({ ...f, priceMax: Math.max(Number(e.target.value), f.priceMin + 100) }))}
                className="drawer__range drawer__range--max"
              />
            </div>
          </div>

          <div className="drawer__divider"/>

          {/* City */}
          <div className="drawer__section">
            <p className="drawer__section-label">City</p>
            <div className="drawer__pills">
              {CITIES.map((c) => (
                <button key={c} className={`drawer__pill ${local.city === c ? "active" : ""}`}
                  onClick={() => toggle("city", c as any)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="drawer__divider"/>

          {/* Room type */}
          <div className="drawer__section">
            <p className="drawer__section-label">Room type</p>
            <div className="drawer__pills">
              {ROOM_TYPES.map((t) => (
                <button key={t} className={`drawer__pill ${local.roomType === t ? "active" : ""}`}
                  onClick={() => toggle("roomType", t as any)}>{t}</button>
              ))}
            </div>
          </div>

          <div className="drawer__divider"/>

          {/* Deposit */}
          <div className="drawer__section">
            <p className="drawer__section-label">Deposit</p>
            <div className="drawer__toggle-row">
              <button className={`drawer__toggle ${local.deposit === "no-deposit" ? "active" : ""}`}
                onClick={() => setLocal((f) => ({ ...f, deposit: f.deposit === "no-deposit" ? "any" : "no-deposit" }))}>
                No deposit
              </button>
              <button className={`drawer__toggle ${local.deposit === "deposit-ok" ? "active" : ""}`}
                onClick={() => setLocal((f) => ({ ...f, deposit: f.deposit === "deposit-ok" ? "any" : "deposit-ok" }))}>
                Deposit ok
              </button>
            </div>
          </div>

          <div className="drawer__divider"/>

          {/* Availability */}
          <div className="drawer__section">
            <p className="drawer__section-label">Availability</p>
            <div className="drawer__toggle-row">
              <button className={`drawer__toggle ${local.availability === "now" ? "active" : ""}`}
                onClick={() => setLocal((f) => ({ ...f, availability: f.availability === "now" ? "any" : "now" }))}>
                Available now
              </button>
              <button className={`drawer__toggle ${local.availability === "any" ? "active" : ""}`}
                onClick={() => setLocal((f) => ({ ...f, availability: "any" }))}>
                Any
              </button>
            </div>
          </div>

          <div className="drawer__divider"/>

          {/* Taxi route */}
          <div className="drawer__section">
            <p className="drawer__section-label">Taxi route</p>
            <div className="drawer__search-input">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#aaa" strokeWidth="1.5">
                <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
              </svg>
              <input
                placeholder="e.g. KwaMashu to Warwick"
                value={local.taxiRoute}
                onChange={(e) => setLocal((f) => ({ ...f, taxiRoute: e.target.value }))}
              />
            </div>
            <div className="drawer__pills" style={{ marginTop: 8 }}>
              {TAXI_ROUTES.map((r) => (
                <button key={r} className={`drawer__pill ${local.taxiRoute === r ? "active" : ""}`}
                  onClick={() => toggle("taxiRoute", r as any)}>{r}</button>
              ))}
            </div>
          </div>

          <div className="drawer__divider"/>

          {/* People allowed */}
          <div className="drawer__section">
            <p className="drawer__section-label">People allowed</p>
            <div className="drawer__stepper">
              <button className="drawer__stepper-btn"
                onClick={() => setLocal((f) => ({ ...f, maxPeople: Math.max(0, f.maxPeople - 1) }))}>
                <svg width="12" height="2" viewBox="0 0 12 2" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 1h10"/>
                </svg>
              </button>
              <span className="drawer__stepper-value">
                {local.maxPeople === 0 ? "Any" : local.maxPeople}
              </span>
              <button className="drawer__stepper-btn"
                onClick={() => setLocal((f) => ({ ...f, maxPeople: Math.min(6, f.maxPeople + 1) }))}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 1v10M1 6h10"/>
                </svg>
              </button>
              {local.maxPeople > 0 && <span className="drawer__stepper-label">people max</span>}
            </div>
          </div>

          <div className="drawer__divider"/>

          {/* House rules & tenant type */}
          <div className="drawer__section">
            <p className="drawer__section-label">House rules & tenant type</p>

            <p className="drawer__sub-label">Noise policy</p>
            <div className="drawer__pills">
              {NOISE_OPTIONS.map((n) => (
                <button key={n.value}
                  className={`drawer__pill ${local.noisePolicy === n.value ? "active" : ""}`}
                  onClick={() => toggle("noisePolicy", n.value as any)}>
                  {n.label}
                </button>
              ))}
            </div>

            <p className="drawer__sub-label" style={{ marginTop: 12 }}>Tenant preference</p>
            <div className="drawer__pills">
              {TENANT_OPTIONS.map((t) => (
                <button key={t.value}
                  className={`drawer__pill ${local.tenantType.includes(t.value) ? "active" : ""}`}
                  onClick={() => toggleTenant(t.value)}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Apply button */}
        <div className="drawer__footer">
          <button className="drawer__apply-btn" onClick={() => onApply(local)}>
            Apply filters
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterDrawer;