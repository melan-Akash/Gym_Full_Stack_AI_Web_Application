export interface Trainer {
  id: string;
  name: string;
  title: string;
  category: "Bodybuilding" | "HIIT & Cardio" | "Powerlifting" | "Yoga & Mobility" | "Rehabilitation";
  avatar: string;
  heroImage: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  activeClientsCount: number;
  bio: string;
  fullBio: string;
  specializations: string[];
  certifications: string[];
  achievements: string[];
  hourlyRate: number;
  availableDays: string[];
  timeSlots: string[];
  socials: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  reviews: {
    id: string;
    clientName: string;
    clientAvatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export const TRAINERS_DATA: Trainer[] = [
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    title: "Master Strength & Hypertrophy Coach",
    category: "Bodybuilding",
    avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80",
    heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    rating: 4.9,
    reviewsCount: 128,
    experienceYears: 11,
    activeClientsCount: 24,
    bio: "IFBB Pro bodybuilder & strength science specialist with over a decade of elite athlete conditioning.",
    fullBio: "Marcus has trained top-tier physique competitors, Olympic lifting enthusiasts, and dedicated professionals looking to build dense muscle mass with precision biometrics. His coaching method combines biomechanical movement pattern analysis with tailored progressive overload schemes.",
    specializations: ["Hypertrophy Programming", "Contest Prep", "Powerbuilding", "Biomechanical Analysis"],
    certifications: ["CSCS (NSCA)", "NASM Master Trainer", "Precision Nutrition Level 2", "ISSA Physique Coach"],
    achievements: ["IFBB Pro Card Holder 2019", "Coached 15+ National Physique Champions", "Published Author on Muscle Biomechanics"],
    hourlyRate: 85,
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    timeSlots: ["07:00 AM", "09:00 AM", "11:00 AM", "02:00 PM", "05:00 PM"],
    socials: {
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    reviews: [
      {
        id: "r1",
        clientName: "David Miller",
        clientAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80",
        rating: 5,
        date: "July 15, 2026",
        comment: "Marcus completely revolutionized my physique in 16 weeks. His attention to form and nutrition strategy is unmatched!",
      },
      {
        id: "r2",
        clientName: "Sarah Jenkins",
        clientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
        rating: 5,
        date: "June 28, 2026",
        comment: "Insanely knowledgeable coach. Helped me gain lean muscle while keeping my joint health 100% pain-free.",
      },
    ],
  },
  {
    id: "elena-[#00f2fe]-rostova",
    name: "Elena Rostova",
    title: "High-Intensity & Metabolic Conditioning Specialist",
    category: "HIIT & Cardio",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    heroImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80",
    rating: 5.0,
    reviewsCount: 96,
    experienceYears: 8,
    activeClientsCount: 30,
    bio: "Former endurance athlete & HIIT specialist dedicated to unlocking maximum fat loss and cardiovascular output.",
    fullBio: "Elena brings relentless energy and science-backed interval training to FORGED. She focuses on metabolic conditioning, VO2 max optimization, and functional movement circuits that blast calories while preserving lean tissue.",
    specializations: ["Metabolic Conditioning", "VO2 Max Optimization", "Fat Loss & Shred", "Tabata & Circuit Training"],
    certifications: ["ACE Certified Personal Trainer", "EXOS Performance Specialist", "CrossFit Level 2 Trainer"],
    achievements: ["Top 5 Regional Marathon Finisher", "FORGED Trainer of the Year 2025", "Over 500+ Transformation Successes"],
    hourlyRate: 75,
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    timeSlots: ["06:00 AM", "08:00 AM", "10:00 AM", "04:00 PM", "06:00 PM"],
    socials: {
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
    },
    reviews: [
      {
        id: "r3",
        clientName: "Alex Thorne",
        clientAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&q=80",
        rating: 5,
        date: "July 20, 2026",
        comment: "Elena's HIIT sessions are brutal in the best way possible. Dropped 8% body fat in 3 months!",
      },
    ],
  },
  {
    id: "viktor-kovac",
    name: "Viktor Kovac",
    title: "Elite Powerlifting & Strength Coach",
    category: "Powerlifting",
    avatar: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80",
    heroImage: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&q=80",
    rating: 4.8,
    reviewsCount: 84,
    experienceYears: 14,
    activeClientsCount: 18,
    bio: "Record-holding powerlifter specializing in Squat, Bench, and Deadlift biomechanics and max effort output.",
    fullBio: "Viktor is a master of maximal strength development. He uses velocity-based training, periodized block periodization, and neural recovery protocols to help lifters smash PRs safely.",
    specializations: ["Powerlifting Periodization", "1RM Max Prep", "Bar Path & Technique", "Central Nervous System Recovery"],
    certifications: ["USAPL Certified Coach", "CSCS", "Westside Barbell Certified"],
    achievements: ["750lb Deadlift Raw Record", "Coached 8 National Powerlifting Gold Medalists"],
    hourlyRate: 90,
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Saturday"],
    timeSlots: ["10:00 AM", "01:00 PM", "03:00 PM", "06:00 PM"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
    reviews: [
      {
        id: "r4",
        clientName: "Michael Vance",
        clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
        rating: 5,
        date: "July 02, 2026",
        comment: "Viktor fixed my deadlift form on day 1. Added 45lbs to my total in under 2 months without injury.",
      },
    ],
  },
  {
    id: "maya-lin",
    name: "Maya Lin",
    title: "Mobility, Yoga & Functional Movement Lead",
    category: "Yoga & Mobility",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    heroImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
    rating: 4.9,
    reviewsCount: 110,
    experienceYears: 9,
    activeClientsCount: 22,
    bio: "Holistic mobility expert helping heavy lifters and athletes unlock joint range, stability, and stress relief.",
    fullBio: "Maya bridges the gap between intense strength training and body fluidity. Her mobility routines target hip capsules, thoracic spine extension, and shoulder joint integrity to keep athletes performing at full capacity.",
    specializations: ["Joint Mobility (FRC)", "Power Vinyasa Yoga", "Flexibility for Lifters", "Breathwork & Recovery"],
    certifications: ["FRC Specialist (Functional Range Conditioning)", "500-Hour RYT Yoga Alliance", "NASM CES"],
    achievements: ["Mobility Consultant for Pro Athletes", "Featured Trainer in Fitness & Health Magazine"],
    hourlyRate: 70,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Friday"],
    timeSlots: ["08:00 AM", "10:00 AM", "02:00 PM", "04:00 PM"],
    socials: {
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
    },
    reviews: [
      {
        id: "r5",
        clientName: "Chloe Bennett",
        clientAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
        rating: 5,
        date: "July 12, 2026",
        comment: "Maya solved my chronic lower back tightness. Now I squat deeper with zero stiffness!",
      },
    ],
  },
  {
    id: "dr-trent-oakley",
    name: "Dr. Trent Oakley, DPT",
    title: "Sports Injury Rehab & Corrective Specialist",
    category: "Rehabilitation",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    rating: 5.0,
    reviewsCount: 74,
    experienceYears: 12,
    activeClientsCount: 16,
    bio: "Doctor of Physical Therapy specializing in post-injury return-to-sport protocols and biomechanical re-education.",
    fullBio: "Dr. Trent combines clinical physical therapy expertise with heavy strength training. He works with athletes recovering from ACL tears, shoulder impingements, and herniated discs to rebuild unbreakable movement resilience.",
    specializations: ["Post-Op Rehabilitation", "Shoulder & Knee Prehab", "Gait & Posture Correction", "Dry Needling & Myofascial Release"],
    certifications: ["Doctor of Physical Therapy (DPT)", "OCS (Orthopedic Certified Specialist)", "CSCS"],
    achievements: ["100% Success Rate in ACL Return to Sport", "Head Rehab Consultant for Regional Rugby Teams"],
    hourlyRate: 110,
    availableDays: ["Monday", "Wednesday", "Thursday", "Friday"],
    timeSlots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    reviews: [
      {
        id: "r6",
        clientName: "Jason Rivera",
        clientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
        rating: 5,
        date: "July 18, 2026",
        comment: "Thought I'd never bench again after my rotator cuff tear. Dr. Trent had me back lifting heavy in 4 months!",
      },
    ],
  },
];
