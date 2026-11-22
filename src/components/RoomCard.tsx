import type { Room } from '../types/resort';

interface RoomCardProps {
  room: Room;
  onBook: (room: Room) => void;
}

export function RoomCard({ room, onBook }: RoomCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-52 w-full bg-slate-100">
        <img
          src={room.image}
          alt={room.name}
          className="h-full w-full object-cover"
        />
        <span
          className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold ${
            room.available
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-rose-100 text-rose-800'
          }`}
        >
          {room.available ? 'Available' : 'Booked'}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-900">{room.name}</h3>
            <span className="text-base font-bold text-amber-700">
              ₱{room.pricePerNight.toLocaleString()}
              <span className="text-xs font-normal text-slate-500">/night</span>
            </span>
          </div>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Up to {room.maxGuests} guests • {room.type} Suite
          </p>

          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {room.description}
          </p>
        </div>

        <button
          type="button"
          disabled={!room.available}
          onClick={() => onBook(room)}
          className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {room.available ? 'Book This Room' : 'Currently Unavailable'}
        </button>
      </div>
    </div>
  );
}