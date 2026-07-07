// ---- Livingway data model (ported from the design) ----

// Category → accent + placeholder gradient stops
export const CAT = {
  Yoga: { accent: '#7E876E', a: '#DCE0D1', b: '#CDD3BF' },
  'Sound Bath': { accent: '#A8784F', a: '#ECDECC', b: '#DEC9AE' },
  Meditation: { accent: '#94887A', a: '#E7DFD0', b: '#D8CDB8' },
  Breathwork: { accent: '#7C8896', a: '#DCE2E4', b: '#CAD2D7' },
  Pilates: { accent: '#A38C76', a: '#EAE0D0', b: '#DBCDB8' },
}

// Each Livingway "house" and the town it lives in
export const SCHEMES = {
  Roco: 'Liverpool',
  Spot: 'Bolton',
  Duke: 'Rochdale',
  Upperbanks: 'Rochdale',
}

export const ADDR = {
  Roco: 'Liverpool · L1',
  Spot: 'Bolton · BL1',
  Duke: 'Rochdale · OL16',
  Upperbanks: 'Rochdale · OL16',
}

// Used only as a fallback if the Supabase fetch fails or returns nothing —
// the live data comes from your Supabase database (see src/supabase.js).
export const FALLBACK_CLASSES = [
  {
    id: 1,
    type: 'Yoga',
    title: 'Slow Flow',
    instructor: 'Maya Ellison',
    scheme: 'Roco',
    day: 'Today',
    time: '07:30',
    duration: '60 min',
    spots: 4,
    price: 18,
    level: 'All levels',
    desc: 'A gentle, unhurried flow to wake the body without forcing it. Long holds, soft breath and a warm room — the kindest way to begin a day.',
    bring: ['Comfortable layers you can move in', 'A water bottle', 'We provide mats & props'],
  },
  {
    id: 2,
    type: 'Sound Bath',
    title: 'Sound Bath Journey',
    instructor: 'Idris Vaughan',
    scheme: 'Roco',
    day: 'Today',
    time: '19:00',
    duration: '75 min',
    spots: 2,
    price: 24,
    level: 'Open to all',
    desc: 'Lie back as waves of gong, bowl and chime wash over you. Nothing to do, nowhere to be — simply rest and let the sound carry you.',
    bring: ['Loose, warm clothing', 'An eye mask if you like', 'Bolsters & blankets provided'],
  },
  {
    id: 3,
    type: 'Meditation',
    title: 'Morning Meditation',
    instructor: 'Naomi Pearce',
    scheme: 'Roco',
    day: 'Today',
    time: '08:00',
    duration: '30 min',
    spots: 9,
    price: 10,
    level: 'Beginner friendly',
    desc: 'A short, guided sit to settle the mind before the day takes hold. Practical, grounding and never precious about getting it right.',
    bring: ['Yourself, as you are', 'Optional journal', 'Cushions provided'],
  },
  {
    id: 4,
    type: 'Breathwork',
    title: 'Breathwork Reset',
    instructor: 'Theo Marsh',
    scheme: 'Roco',
    day: 'Tomorrow',
    time: '18:30',
    duration: '45 min',
    spots: 6,
    price: 16,
    level: 'All levels',
    desc: 'Conscious connected breathing to release what the day left behind. Expect to feel energised, clear and a little surprised by your own calm.',
    bring: ['Layers — body temperature shifts', 'A water bottle', 'Mats & blankets provided'],
  },
  {
    id: 5,
    type: 'Pilates',
    title: 'Reformer Pilates',
    instructor: 'Carla Innes',
    scheme: 'Roco',
    day: 'Today',
    time: '12:15',
    duration: '50 min',
    spots: 1,
    price: 22,
    level: 'Intermediate',
    desc: 'Precise, controlled movement on the reformer to build deep strength and length. Small group, close attention, real results.',
    bring: ['Grippy socks (or buy in studio)', 'Fitted clothing', 'Reformers provided'],
  },
  {
    id: 6,
    type: 'Yoga',
    title: 'Candlelit Yin',
    instructor: 'Maya Ellison',
    scheme: 'Roco',
    day: 'Tomorrow',
    time: '20:00',
    duration: '60 min',
    spots: 5,
    price: 18,
    level: 'All levels',
    desc: 'Deep, quiet stretches held by candlelight. A slow exhale at the end of the day that loosens the body and softens the mind.',
    bring: ['Cosy layers & socks', 'An open mind', 'Props & blankets provided'],
  },
  {
    id: 7,
    type: 'Yoga',
    title: 'Vinyasa Strong',
    instructor: 'Carla Innes',
    scheme: 'Roco',
    day: 'Wed 2 Jul',
    time: '17:30',
    duration: '55 min',
    spots: 8,
    price: 20,
    level: 'Intermediate',
    desc: 'A flowing, breath-led practice with a bit of fire. Build heat and strength while staying connected to the rhythm of your breath.',
    bring: ['A towel', 'Water', 'Mats provided'],
  },
  {
    id: 8,
    type: 'Sound Bath',
    title: 'Restorative Sound',
    instructor: 'Idris Vaughan',
    scheme: 'Roco',
    day: 'Wed 2 Jul',
    time: '13:00',
    duration: '60 min',
    spots: 7,
    price: 22,
    level: 'Open to all',
    desc: 'A midday pause. Restorative postures held gently while sound fills the room — the reset your afternoon has been asking for.',
    bring: ['Warm layers', 'An eye mask if you like', 'Bolsters & blankets provided'],
  },
]

export const FALLBACK_SPACES = [
  {
    id: 's1',
    name: 'Yoga Suite',
    scheme: 'Roco',
    capacity: 16,
    price: 45,
    a: '#DCE0D1',
    b: '#CBD2BC',
    desc: 'A light-filled movement studio wrapped in greenery, with sprung oak floors and tall windows that open onto the courtyard.',
    amenities: ['Sprung oak floor', 'Mats & props', 'Natural light', 'Bluetooth sound', 'Tea station'],
  },
  {
    id: 's2',
    name: 'Ice Bath & Sauna',
    scheme: 'Roco',
    capacity: 10,
    price: 38,
    a: '#ECDECC',
    b: '#DCC6AB',
    desc: 'A contrast-therapy room pairing a cold plunge with a cedar sauna — for the brave kind of calm. Warm light, deep quiet, towels and tea provided.',
    amenities: ['Cold plunge', 'Cedar sauna', 'Towels & robes', 'Cool-down bench', 'Tea station'],
  },
  {
    id: 's5',
    name: 'The Snug',
    scheme: 'Roco',
    capacity: 6,
    price: 28,
    a: '#E7DFD0',
    b: '#D8CDB8',
    desc: 'An intimate, cocooning room for one-to-ones, small meditation circles and breathwork. Soft, warm and entirely private.',
    amenities: ['Intimate setting', 'Warm lighting', 'Floor cushions', 'Tea station', 'Fully private'],
  },
  {
    id: 's6',
    name: 'Hot Tub',
    scheme: 'Roco',
    capacity: 6,
    price: 35,
    a: '#E7DFD0',
    b: '#CFC0AB',
    desc: 'A cedar hot tub set against the elements — sink in, slow down, and let the warmth do the work. The gentlest way to gather and unwind.',
    amenities: ['Cedar hot tub', 'Outdoor setting', 'Towels & robes', 'Tea station', 'Fully private'],
  },
  {
    id: 's7',
    name: 'Meeting Rooms',
    scheme: 'Roco',
    capacity: 6,
    price: 30,
    a: '#E7DFD0',
    b: '#D3C7B2',
    desc: 'Calm, considered rooms for up to six — for workshops, one-to-ones and quiet work. Natural light, soft furnishings and good tea.',
    amenities: ['Seats up to 6', 'Natural light', 'Screen & display', 'Kettle & tea', 'Fully private'],
  },
]

export const TIERS = [
  {
    name: 'Drop-in',
    price: '£0',
    per: '/mo',
    tagline: 'Pay as you go, whenever it suits you.',
    featured: false,
    perks: ['Full price per class', 'Book any class or space', 'No commitment'],
  },
  {
    name: 'Wellness Pass',
    price: '£60',
    per: '/mo',
    tagline: 'Five classes a month, plus member rates.',
    featured: true,
    perks: ['5 class credits monthly', '15% off space bookings', 'Credits roll over 30 days'],
  },
  {
    name: 'Unlimited',
    price: '£95',
    per: '/mo',
    tagline: 'Practise as often as you like.',
    featured: false,
    perks: [
      'Unlimited classes',
      'Priority booking windows',
      '2 guest passes monthly',
      '25% off space bookings',
    ],
  },
]

export const TYPE_FILTERS = ['All', 'Yoga', 'Sound Bath', 'Meditation', 'Breathwork', 'Pilates']
export const LOC_FILTERS = ['All', 'Roco', 'Spot', 'Duke', 'Upperbanks']

// ---- Presentation helpers ----

// Soft, editorial placeholder wash — mirrors the design's fallback texture.
export const ph = (a, b) => ({
  backgroundColor: a,
  backgroundImage: `repeating-linear-gradient(135deg,rgba(0,0,0,.022) 0 17px,rgba(255,255,255,.05) 17px 34px),linear-gradient(155deg,${a},${b})`,
  backgroundSize: 'cover',
})

export const catOf = (type) => CAT[type] || CAT.Yoga

// Background wash for a class card, keyed on its category palette.
export const classImg = (c) => {
  const meta = catOf(c.type)
  return ph(meta.a, meta.b)
}

export const spaceImg = (s) => ph(s.a, s.b)

export const priceText = (n) => '£' + n
export const spotsText = (spots) => spots + ' ' + (spots === 1 ? 'place' : 'places') + ' left'
export const spotsColor = (spots) => (spots <= 2 ? '#A8694F' : '#847C72')
