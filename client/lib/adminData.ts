export interface AdminMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  plan: "VIP Elite" | "Pro Performance" | "Basic Access";
  status: "Active" | "Expired" | "Suspended" | "Pending";
  paymentStatus: "Paid" | "Pending" | "Overdue" | "Failed";
  joinedDate: string;
  expiryDate: string;
  trainerAssigned: string;
  totalSpent: number;
  lastCheckIn: string;
}

export interface AdminTrainer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  specialization: string;
  clientsCount: number;
  rating: number;
  monthlyRevenueGenerated: number;
  commissionRate: number; // Admin commission percentage e.g. 20%
  commissionStatus: "Collected" | "Pending" | "Processing";
  status: "Active" | "On Leave";
}

export interface MembershipPlan {
  id: string;
  title: string;
  price: number;
  billingPeriod: "Monthly" | "Yearly";
  features: string[];
  activeSubscribers: number;
  isPopular?: boolean;
}

export interface PaymentTransaction {
  id: string;
  invoiceId: string;
  memberName: string;
  memberAvatar: string;
  planName: string;
  amount: number;
  paymentMethod: "Credit Card" | "Apple Pay" | "Bank Transfer" | "Cash";
  date: string;
  status: "Paid" | "Pending" | "Failed";
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  category: "Announcement" | "Alert" | "System Update" | "Promotion";
  targetAudience: "All Members" | "Trainers Only" | "VIP Members";
  createdAt: string;
  sentBy: string;
}

export const ADMIN_STATS = {
  totalMembers: 1248,
  activeMembers: 1092,
  monthlyRevenue: 84250,
  revenueGrowthPercent: 14.8,
  trainersCount: 12,
  todayCheckIns: 342,
  peakHour: "05:00 PM - 07:00 PM",
  retentionRate: 94.2,
};

export const ADMIN_MEMBERS: AdminMember[] = [
  {
    id: "mem-001",
    name: "Brandon Hayes",
    email: "b.hayes@gmail.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    plan: "VIP Elite",
    status: "Active",
    paymentStatus: "Paid",
    joinedDate: "2025-11-10",
    expiryDate: "2026-11-10",
    trainerAssigned: "Marcus Vance",
    totalSpent: 2400,
    lastCheckIn: "2026-07-30 08:30 AM",
  },
  {
    id: "mem-002",
    name: "Jessica Taylor",
    email: "jess.t@outlook.com",
    phone: "+1 (555) 987-6543",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    plan: "Pro Performance",
    status: "Active",
    paymentStatus: "Paid",
    joinedDate: "2026-01-05",
    expiryDate: "2027-01-05",
    trainerAssigned: "Elena Rostova",
    totalSpent: 1250,
    lastCheckIn: "2026-07-30 07:15 AM",
  },
  {
    id: "mem-003",
    name: "Robert Fox",
    email: "robert.f@yahoo.com",
    phone: "+1 (555) 555-0199",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&q=80",
    plan: "Basic Access",
    status: "Active",
    paymentStatus: "Pending",
    joinedDate: "2026-05-12",
    expiryDate: "2026-08-12",
    trainerAssigned: "Unassigned",
    totalSpent: 240,
    lastCheckIn: "2026-07-29 06:45 PM",
  },
  {
    id: "mem-004",
    name: "Emily Vance",
    email: "emily.v@domain.com",
    phone: "+1 (555) 888-2345",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    plan: "VIP Elite",
    status: "Expired",
    paymentStatus: "Overdue",
    joinedDate: "2025-06-01",
    expiryDate: "2026-06-01",
    trainerAssigned: "Maya Lin",
    totalSpent: 1980,
    lastCheckIn: "2026-05-28 05:10 PM",
  },
  {
    id: "mem-005",
    name: "Carlos Santana",
    email: "carlos.s@tech.io",
    phone: "+1 (555) 777-9900",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    plan: "Pro Performance",
    status: "Active",
    paymentStatus: "Paid",
    joinedDate: "2026-02-20",
    expiryDate: "2027-02-20",
    trainerAssigned: "Viktor Kovac",
    totalSpent: 1400,
    lastCheckIn: "2026-07-30 09:00 AM",
  },
];

export const ADMIN_TRAINERS: AdminTrainer[] = [
  {
    id: "tr-1",
    name: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80",
    email: "marcus@forgedgym.com",
    specialization: "Bodybuilding & Muscle Building",
    clientsCount: 24,
    rating: 4.9,
    monthlyRevenueGenerated: 14200,
    commissionRate: 20,
    commissionStatus: "Collected",
    status: "Active",
  },
  {
    id: "tr-2",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    email: "elena@forgedgym.com",
    specialization: "HIIT & Cardio Shred",
    clientsCount: 30,
    rating: 5.0,
    monthlyRevenueGenerated: 15800,
    commissionRate: 20,
    commissionStatus: "Collected",
    status: "Active",
  },
  {
    id: "tr-3",
    name: "Viktor Kovac",
    avatar: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80",
    email: "viktor@forgedgym.com",
    specialization: "Powerlifting & Max Strength",
    clientsCount: 18,
    rating: 4.8,
    monthlyRevenueGenerated: 11400,
    commissionRate: 15,
    commissionStatus: "Pending",
    status: "Active",
  },
  {
    id: "tr-4",
    name: "Maya Lin",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    email: "maya@forgedgym.com",
    specialization: "Mobility & Recovery",
    clientsCount: 22,
    rating: 4.9,
    monthlyRevenueGenerated: 9900,
    commissionRate: 25,
    commissionStatus: "Collected",
    status: "Active",
  },
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "plan-basic",
    title: "Basic Access",
    price: 49,
    billingPeriod: "Monthly",
    features: [
      "Access to Main Gym Floor & Free Weights",
      "Locker & Shower Access",
      "Standard Key Fob Access (6 AM - 10 PM)",
      "FORGED Mobile App Access",
    ],
    activeSubscribers: 420,
  },
  {
    id: "plan-pro",
    title: "Pro Performance",
    price: 99,
    billingPeriod: "Monthly",
    isPopular: true,
    features: [
      "Everything in Basic Access",
      "24/7 Unlimited Facility Access",
      "Full Access to Sauna & Cold Plunge Suite",
      "Unlimited Group Fitness & HIIT Classes",
      "1 Monthly InBody 3D Scan",
    ],
    activeSubscribers: 580,
  },
  {
    id: "plan-vip",
    title: "VIP Elite Athlete",
    price: 199,
    billingPeriod: "Monthly",
    features: [
      "Everything in Pro Performance",
      "Dedicated Personal Trainer Assignment",
      "AI Workout & Custom Meal Plan Engine",
      "Private VIP Locker Room Access",
      "Complimentary Post-Workout Protein Shakes",
      "Priority Booking for Recovery Labs",
    ],
    activeSubscribers: 248,
  },
];

export const PAYMENT_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: "tx-1001",
    invoiceId: "INV-2026-0891",
    memberName: "Brandon Hayes",
    memberAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    planName: "VIP Elite Athlete",
    amount: 199.00,
    paymentMethod: "Credit Card",
    date: "2026-07-30",
    status: "Paid",
  },
  {
    id: "tx-1002",
    invoiceId: "INV-2026-0892",
    memberName: "Jessica Taylor",
    memberAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    planName: "Pro Performance",
    amount: 99.00,
    paymentMethod: "Apple Pay",
    date: "2026-07-30",
    status: "Paid",
  },
  {
    id: "tx-1003",
    invoiceId: "INV-2026-0893",
    memberName: "Carlos Santana",
    memberAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    planName: "Personal Training Pack (5 Sessions)",
    amount: 425.00,
    paymentMethod: "Credit Card",
    date: "2026-07-29",
    status: "Paid",
  },
  {
    id: "tx-1004",
    invoiceId: "INV-2026-0894",
    memberName: "Emily Vance",
    memberAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    planName: "VIP Elite Renewal",
    amount: 199.00,
    paymentMethod: "Bank Transfer",
    date: "2026-07-28",
    status: "Failed",
  },
];

export const SYSTEM_NOTIFICATIONS: SystemNotification[] = [
  {
    id: "notif-1",
    title: "New Recovery Lab Equipment Installation",
    message: "The new Cryotherapy chambers and InfraRed Saunas are now live on the 2nd floor.",
    category: "Announcement",
    targetAudience: "All Members",
    createdAt: "2026-07-28 09:00 AM",
    sentBy: "Admin HQ",
  },
  {
    id: "notif-2",
    title: "Trainer Biweekly Performance Review",
    message: "All trainers please submit your client monthly progress logs by Friday 5 PM.",
    category: "Alert",
    targetAudience: "Trainers Only",
    createdAt: "2026-07-29 02:30 PM",
    sentBy: "General Manager",
  },
];
