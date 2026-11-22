import type { Room } from '../types/resort';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 1,
    name: 'Standard Room',
    type: 'Standard',
    pricePerNight: 2500,
    maxGuests: 2,
    description: 'Cozy and well-appointed room ideal for solo travelers or couples.',
    image: '/rooms/standard.jpg',
    available: true,
  },
  {
    id: 2,
    name: 'Deluxe Room',
    type: 'Deluxe',
    pricePerNight: 3500,
    maxGuests: 2,
    description: 'Spacious modern room with upgraded amenities and relaxing views.',
    image: '/rooms/deluxe.jpg',
    available: true,
  },
  {
    id: 3,
    name: 'Villa Room',
    type: 'Villa',
    pricePerNight: 5000,
    maxGuests: 4,
    description: 'Private villa retreat featuring outdoor lounge space and poolside vibes.',
    image: '/rooms/villa.jpg',
    available: true,
  },
  {
    id: 4,
    name: 'Family Room',
    type: 'Family',
    pricePerNight: 4000,
    maxGuests: 4,
    description: 'Generous layout designed for families and group getaways.',
    image: '/rooms/family.jpg',
    available: true,
  },
];