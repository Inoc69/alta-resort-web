import { useEffect, useState } from 'react';
import { INITIAL_ROOMS } from './data/room';
import type { Room, Reservation } from './types/resort';
import { Navbar } from './components/Navbar';
import { RoomCard } from './components/RoomCard';
import { BookingModal } from './components/BookingModal';
import { AdminPanel } from './components/AdminPanel';

const ROOMS_STORAGE_KEY = 'alta_resort_rooms_v1';
const RESERVATIONS_STORAGE_KEY = 'alta_resort_reservations_v1';

export function App() {
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem(ROOMS_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Room[]) : INITIAL_ROOMS;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Reservation[]) : [];
  });

  const [activeTab, setActiveTab] = useState<'rooms' | 'admin'>('rooms');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservations));
  }, [reservations]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleConfirmBooking = (newReservation: Reservation) => {
    setReservations((prev) => [newReservation, ...prev]);
    setSelectedRoom(null);
    showToast(`Booking ${newReservation.id} confirmed for ${newReservation.guestName}!`);
  };

  const handleToggleRoomAvailability = (roomId: number) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, available: !room.available } : room
      )
    );
  };

  const handleUpdateReservationStatus = (
    reservationId: string,
    status: Reservation['status']
  ) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === reservationId ? { ...res, status } : res
      )
    );
    showToast(`Reservation ${reservationId} marked as ${status}.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        reservationCount={reservations.length}
      />

      {toastMessage && (
        <div className="mx-auto mt-4 max-w-6xl px-4">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
            {toastMessage}
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 py-8">
        {activeTab === 'rooms' ? (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Available Rooms & Suites
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Select a room to check nightly rates and submit a reservation.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onBook={(r) => setSelectedRoom(r)}
                />
              ))}
            </div>
          </div>
        ) : (
          <AdminPanel
            rooms={rooms}
            reservations={reservations}
            onToggleRoomAvailability={handleToggleRoomAvailability}
            onUpdateReservationStatus={handleUpdateReservationStatus}
          />
        )}
      </main>

      <BookingModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
}

export default App;