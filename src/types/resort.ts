export interface Room {
  id: number;
  name: string;
  type: 'Standard' | 'Deluxe' | 'Villa' | 'Family';
  pricePerNight: number;
  maxGuests: number;
  description: string;
  image: string;
  available: boolean;
}

export interface Reservation {
  id: string;
  roomId: number;
  roomName: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'guest';
}