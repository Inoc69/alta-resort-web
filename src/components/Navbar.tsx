interface NavbarProps {
  activeTab: 'rooms' | 'admin';
  onTabChange: (tab: 'rooms' | 'admin') => void;
  reservationCount: number;
}

export function Navbar({ activeTab, onTabChange, reservationCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            ALTA RESORT
          </span>
          <p className="text-xs text-slate-500">Room & Reservation Portal</p>
        </div>

        <nav className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onTabChange('rooms')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === 'rooms'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Rooms
          </button>

          <button
            type="button"
            onClick={() => onTabChange('admin')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === 'admin'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Reservations & Admin</span>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
              {reservationCount}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}