// Dummy data for events page

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  imageUrl?: string;
  category: string;
  isRegistered?: boolean;
}

export const eventsData: Event[] = [
  // Registered Events (Upcoming)
  {
    id: 'evt_001',
    title: 'Spring Gala Fundraiser',
    description: 'Join us for an elegant evening of fine dining, live music, and fundraising to support our community programs. This black-tie event features a silent auction, keynote speaker, and networking opportunities.',
    date: '2024-02-15',
    time: '18:00',
    location: 'Grand Ballroom, Downtown Hotel',
    attendees: 45,
    maxAttendees: 100,
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
    category: 'Fundraiser',
    isRegistered: true
  },
  {
    id: 'evt_002',
    title: 'Community Volunteer Day',
    description: 'Help us make a difference in our community! We\'ll be cleaning up local parks, planting trees, and organizing food drives. All ages welcome, lunch provided.',
    date: '2024-02-22',
    time: '09:00',
    location: 'Central Park',
    attendees: 28,
    maxAttendees: 50,
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    category: 'Volunteer',
    isRegistered: true
  },
  {
    id: 'evt_003',
    title: 'Youth Leadership Workshop',
    description: 'A comprehensive workshop designed to develop leadership skills in young adults. Topics include communication, team building, project management, and community engagement.',
    date: '2024-03-05',
    time: '10:00',
    location: 'Community Center',
    attendees: 25,
    maxAttendees: 25,
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    category: 'Workshop',
    isRegistered: true
  },
  {
    id: 'evt_004',
    title: 'Annual Board Meeting',
    description: 'Join us for our annual board meeting where we\'ll review the past year\'s achievements, discuss upcoming initiatives, and elect new board members.',
    date: '2024-02-28',
    time: '14:00',
    location: 'Conference Room A',
    attendees: 12,
    maxAttendees: 15,
    status: 'upcoming',
    category: 'Meeting',
    isRegistered: true
  },
  {
    id: 'evt_005',
    title: 'Environmental Awareness Seminar',
    description: 'Learn about climate change, sustainable living practices, and how you can make a positive impact on the environment. Expert speakers and interactive sessions.',
    date: '2024-03-12',
    time: '19:00',
    location: 'Green Building Auditorium',
    attendees: 67,
    maxAttendees: 100,
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de6e7c2f2e6e?w=400&h=300&fit=crop',
    category: 'Education',
    isRegistered: true
  },

  // Past Events
  {
    id: 'evt_006',
    title: 'Holiday Charity Drive',
    description: 'Our annual holiday charity drive was a huge success! We collected over 500 toys and raised $15,000 for local families in need.',
    date: '2023-12-15',
    time: '10:00',
    location: 'Community Center',
    attendees: 150,
    maxAttendees: 200,
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop',
    category: 'Charity',
    isRegistered: true
  },
  {
    id: 'evt_007',
    title: 'Summer Music Festival',
    description: 'A day of music, food, and community spirit featuring local bands, food trucks, and family activities. Proceeds went to youth music programs.',
    date: '2023-08-20',
    time: '12:00',
    location: 'Riverside Park',
    attendees: 300,
    maxAttendees: 500,
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    category: 'Festival',
    isRegistered: true
  },
  {
    id: 'evt_008',
    title: 'Health & Wellness Fair',
    description: 'Free health screenings, wellness workshops, and fitness demonstrations. Partnered with local healthcare providers to promote community health.',
    date: '2023-10-08',
    time: '09:00',
    location: 'Health Center',
    attendees: 89,
    maxAttendees: 120,
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    category: 'Health',
    isRegistered: true
  },
  {
    id: 'evt_009',
    title: 'Tech Innovation Summit',
    description: 'Exploring the latest in technology and innovation with keynote speakers, panel discussions, and networking opportunities for tech professionals.',
    date: '2023-11-18',
    time: '08:30',
    location: 'Convention Center',
    attendees: 200,
    maxAttendees: 250,
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    category: 'Conference',
    isRegistered: true
  },
  {
    id: 'evt_010',
    title: 'Art Exhibition Opening',
    description: 'Celebrating local artists with an exhibition featuring paintings, sculptures, and digital art. Silent auction to support emerging artists.',
    date: '2023-09-22',
    time: '18:30',
    location: 'Art Gallery',
    attendees: 75,
    maxAttendees: 100,
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    category: 'Arts',
    isRegistered: true
  }
];

export const getRegisteredEvents = (events: Event[]): Event[] => {
  return events.filter(event => 
    event.isRegistered && (event.status === 'upcoming' || event.status === 'ongoing')
  );
};

export const getPastEvents = (events: Event[]): Event[] => {
  return events.filter(event => 
    event.isRegistered && event.status === 'completed'
  );
};
