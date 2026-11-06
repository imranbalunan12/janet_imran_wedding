export const wedding = {
  bride: {
    first: "Janet",
    last: "Baquiran",
    full: "Janet Baquiran",
  },
  groom: {
    first: "Imran Kyle",
    last: "Balunan",
    displayFirst: "Imran",
    full: "Imran Kyle Balunan",
  },
  monogram: "I & J",
  logoName: "Imran & Janet",
  hashtags: ["#IMRANingDownTheAisleWithJANET", "#EMbracingJANETForever"],
  date: {
    label: "Tuesday, 26 January 2027",
    iso: "2027-01-26T14:00:00+08:00",
  },
  rsvpDeadline: "December 6, 2026",
  venues: {
    ceremony: {
      title: "The Ceremony",
      place: "Terrace Hotel, Beachfront",
      city: "Subic",
      maps: "https://www.google.com/maps/search/?api=1&query=Terrace+Hotel+Beachfront+Subic",
      photo: "/photos/events/ceremony/cover.jpg",
    },
    reception: {
      title: "The Reception",
      place: "Subic Travelers Hotel Verona",
      city: "Subic",
      maps: "https://www.google.com/maps/search/?api=1&query=Subic+Travelers+Hotel+Verona",
      photo: "/photos/events/reception/cover.jpg",
    },
  },
  invitation: {
    kicker: "By His grace,",
    title: "Our prayers led us here.",
    verse:
      "Two lives, one answered prayer, and a lifetime entrusted to God.",
    body: "Imran & Janet invite you to witness the beginning of their forever as they exchange vows and enter into the covenant of marriage.",
  },
  attire: {
    headline: "All-white elegant or smart casual",
    intro:
      "Please join us in all-white attire suitable for a beach ceremony and an indoor reception.",
    guests: {
      ladies:
        "All-white dress, or an elegant white blouse paired with white trousers or square pants.",
      gentlemen:
        "White polo or polo shirt paired with white pants. White pants are highly preferred; white shorts are permitted if white pants are unavailable.",
      avoid: "Kindly avoid slippers, t-shirts, and casual beachwear.",
    },
    sponsors: {
      ladies:
        "White semi-formal dress, elegant midi dress, or a refined white pantsuit.",
      gentlemen: "White long-sleeved button-down and white slacks.",
    },
  },
  notes: {
    adultsOnly:
      "We kindly request that our wedding be an adults-only celebration. We also respectfully ask that you refrain from sharing or forwarding our invitation, as we have reserved this special occasion for the people closest to us.",
    unplugged:
      "We kindly ask guests to turn off or silence all phones and cameras during the ceremony. Please allow our official photo and video team to capture these moments so you can fully celebrate with us in the present.",
    after:
      "Once the ceremony has concluded, feel free to capture and share your favorite moments with us! Don't forget to use our official wedding hashtags.",
    seats:
      "We have thoughtfully limited our invitations to the people closest to our hearts. Unless otherwise stated, this invitation is reserved for one guest only.",
  },
  prenupYoutubeId: process.env.NEXT_PUBLIC_PRENUP_YOUTUBE_ID ?? "",
  mealOptions: ["Chicken", "Fish", "Vegetarian", "No preference"],
} as const;

export const parents = {
  blessing: "To bless our union with love and prayers",
  groom: ["Aaron Balunan", "Minerva Balunan"],
  bride: ["Gerardo Baquiran", "Hilda Baquiran"],
};

export const principalSponsors = {
  blessing: "To witness our covenant",
  pairs: [
    ["Ptr. Rolando Ramos", "Ptra. Nerissa Ramos"],
    ["Ephraim Guillemer", "Irene Guillemer"],
    ["Ferdinand Caisip", "Agnes Caisip"],
    ["Joselito Dela Cruz", "Ma. Victoria Dela Cruz"],
    ["Eduardo Cayanes", "Virginia Cayanes"],
    ["Pelagio Balunan", "Nimfa Baquiran"],
    ["Frederick Belleza", "Kriszel Viojan"],
    ["Alex Barrientos", "Vilma Barrientos"],
    ["Gilbert Omandam", "Angelita Omandam"],
    ["Eduardo Jr Cañeda", "Rosalinda Cañeda"],
    ["Nenita Viray", "Maria Veronica Aguila"],
  ],
};

export const secondarySponsors = {
  bestMan: {
    title: "Best Man",
    blessing: "To stand by his side, through every season",
    names: ["Thony John Costales", "Alvie Axl Barrientos"],
  },
  maidOfHonor: {
    title: "Maid of Honor",
    blessing: "To support her with love and grace",
    names: ["Rosenda Britania", "Janella Dela Cruz"],
  },
  candle: {
    title: "Candle",
    blessing: "To light our way",
    names: ["Irfran Kian Guillemer", "Jeanne Dela Cruz"],
  },
  veil: {
    title: "Veil",
    blessing: "To cover us in grace",
    names: ["Andre Liam Guillemer", "Veronica Asagra"],
  },
  cord: {
    title: "Cord",
    blessing: "To bind us together",
    names: ["Elijah Vien Caisip", "Jamaica Cañeda"],
  },
};

export const weddingParty = {
  groomsmen: {
    title: "Groomsmen",
    blessing: "To stand by our side",
    names: [
      "Ryan Garcia",
      "Wilson Morales",
      "Michael Gianan",
      "Jeffrey Laman",
      "Jeremy Laman",
      "Canjie Casacop",
      "Jerome Enero",
    ],
  },
  bridesmaids: {
    title: "Bridesmaids",
    blessing: "To walk beside the bride",
    names: ["Jamela Anne Lapuos", "Nickabelle Pelisigas", "Renza Juanillo"],
  },
};

export const littleEntourage = {
  ringBearer: {
    title: "Ring Bearer",
    blessing: "A symbol of our eternal love",
    names: ["Jharenn Verrill Garcia"],
  },
  bible: {
    title: "Bible Bearer",
    blessing: "To guide our journey",
    names: ["Benjamin Eliseo Morales"],
  },
  coinBearer: {
    title: "Coin Bearer",
    blessing: "A symbol of God’s blessings",
    names: ["David Viojan"],
  },
  flowerGirls: {
    title: "Flower Girls",
    blessing: "To scatter petals of love and joy",
    names: [
      "Amari Thalia Cañeda",
      "Eleanor Grace Dela Cruz",
      "Bella Amariah Belleza",
      "Akhiela Yanah Balunan",
    ],
  },
  littleGroom: {
    title: "Little Groom",
    blessing: "A little blessing beside the groom",
    names: ["Ezequel Vinze Caisip", "Gavin Gleve Asagra"],
  },
  littleBride: {
    title: "Little Bride",
    blessing: "A little blessing beside the bride",
    names: ["Thea Gabrielle Nofies", "Emery Quinn Cayanes"],
  },
};

export const navItems = [
  { href: "#home", label: "Home" },
  { href: "#story", label: "Story" },
  { href: "#couple", label: "Couple" },
  { href: "#events", label: "Events" },
  { href: "#entourage", label: "Entourage" },
  { href: "#gallery", label: "Gallery" },
  { href: "#prenup", label: "Prenup" },
  { href: "#rsvp", label: "RSVP" },
];
