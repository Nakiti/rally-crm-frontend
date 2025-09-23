// Dummy data for dashboard components

export interface DashboardStats {
  totalDonations: number;
  totalDonors: number;
  averageDonation: number;
  monthlyGrowth: number;
}

export interface Transaction {
  id: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  campaign: string;
  date: string;
  donorName: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  status: 'upcoming' | 'full' | 'cancelled';
}

export const dashboardStats: DashboardStats = {
  totalDonations: 125430,
  totalDonors: 1247,
  averageDonation: 100.6,
  monthlyGrowth: 12.5
};

export const recentTransactions: Transaction[] = [
  {
    id: '1',
    amount: 250,
    status: 'completed',
    campaign: 'Annual Fund Drive',
    date: '2024-01-15T10:30:00Z',
    donorName: 'Sarah Johnson'
  },
  {
    id: '2',
    amount: 100,
    status: 'completed',
    campaign: 'Emergency Relief',
    date: '2024-01-14T14:22:00Z',
    donorName: 'Michael Chen'
  },
  {
    id: '3',
    amount: 500,
    status: 'pending',
    campaign: 'Scholarship Fund',
    date: '2024-01-14T09:15:00Z',
    donorName: 'Emily Rodriguez'
  },
  {
    id: '4',
    amount: 75,
    status: 'completed',
    campaign: 'Annual Fund Drive',
    date: '2024-01-13T16:45:00Z',
    donorName: 'David Thompson'
  },
  {
    id: '5',
    amount: 200,
    status: 'failed',
    campaign: 'Community Garden',
    date: '2024-01-12T11:20:00Z',
    donorName: 'Lisa Wang'
  }
];

export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Spring Gala Fundraiser',
    date: '2024-02-15T18:00:00Z',
    location: 'Grand Ballroom, Downtown Hotel',
    attendees: 45,
    maxAttendees: 100,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Community Volunteer Day',
    date: '2024-02-22T09:00:00Z',
    location: 'Central Park',
    attendees: 28,
    maxAttendees: 50,
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Annual Board Meeting',
    date: '2024-02-28T14:00:00Z',
    location: 'Conference Room A',
    attendees: 12,
    maxAttendees: 15,
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Youth Leadership Workshop',
    date: '2024-03-05T10:00:00Z',
    location: 'Community Center',
    attendees: 25,
    maxAttendees: 25,
    status: 'full'
  }
];
