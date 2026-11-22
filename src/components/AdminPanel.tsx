import type { Room, Reservation } from '../types/resort';

interface AdminPanelProps {
  rooms: Room[];
  reservations: Reservation[];
  onToggleRoomAvailability: (roomId: number) => void;
  onUpdateReservationStatus: (
    reservationId: string,
    status: Reservation['status']
  ) => void;
}

export function AdminPanel({
  rooms,
  reservations,
  onToggleRoomAvailability,
  onUpdateReservationStatus,
}: AdminPanelProps) {
  const totalRevenue = reservations
    .filter((r) => r.status === 'Confirmed')
    .reduce((sum, r) => sum + r.totalPrice, 0);

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Total Bookings</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {reservations.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Available Rooms</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">
            {rooms.filter((r) => r.available).length} / {rooms.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Confirmed Revenue</p>
          <p className="mt-1 text-2xl font-bold text-amber-700">
            ₱{totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Room Management */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
        <h2 className="text-lg font-bold text-slate-900">Room Availability</h2>
        <p className="text-xs text-slate-500">
          Toggle room status to control which rooms guests can book.
        </p>

        <div className="mt-4 divide-y divide-slate-100">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="flex flex-wrap items-center justify-between gap-4 py-3.5"
            >
              <div className="flex items-center gap-3">
                <img
                  src={room.image}
                  alt={room.name}
                  className="h-12 w-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold text-slate-900">{room.name}</p>
                  <p className="text-xs text-slate-500">
                    ₱{room.pricePerNight.toLocaleString()}/night • Max{' '}
                    {room.maxGuests} guests
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggleRoomAvailability(room.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  room.available
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                }`}
              >
                {room.available ? 'Available (Click to Close)' : 'Closed (Click to Open)'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Reservations Table */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
        <h2 className="text-lg font-bold text-slate-900">Guest Reservations</h2>
        <p className="text-xs text-slate-500">
          Manage incoming and confirmed room bookings.
        </p>

        {reservations.length === 0 ? (
          <p className="mt-6 rounded-xl bg-slate-50 py-8 text-center text-sm text-slate-500">
            No reservations yet. Switch to the Rooms tab to create a test booking!
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs text-slate-500 uppercase">
                <tr>
                  <th className="py-3 pr-4">Ref ID</th>
                  <th className="py-3 pr-4">Guest</th>
                  <th className="py-3 pr-4">Room</th>
                  <th className="py-3 pr-4">Dates</th>
                  <th className="py-3 pr-4">Total</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reservations.map((res) => (
                  <tr key={res.id}>
                    <td className="py-3.5 pr-4 font-mono text-xs font-semibold text-slate-700">
                      {res.id}
                    </td>
                    <td className="py-3.5 pr-4">
                      <p className="font-medium text-slate-900">{res.guestName}</p>
                      <p className="text-xs text-slate-500">{res.guestEmail}</p>
                    </td>
                    <td className="py-3.5 pr-4 text-slate-700">{res.roomName}</td>
                    <td className="py-3.5 pr-4 text-xs text-slate-600">
                      {res.checkIn} → {res.checkOut}
                    </td>
                    <td className="py-3.5 pr-4 font-semibold text-slate-900">
                      ₱{res.totalPrice.toLocaleString()}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          res.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : res.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {res.status}
                      </span>
                    </td>
                    <td className="py-3.5">
                      {res.status !== 'Cancelled' && (
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateReservationStatus(res.id, 'Cancelled')
                          }
                          className="rounded-lg border border-rose-200 px-3 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}