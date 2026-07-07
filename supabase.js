import { createClient } from '@supabase/supabase-js'

// Livingway's Supabase project. The anon (public) key is safe to ship in a
// client app — data is protected by Row Level Security (read-only for the
// public; only you can edit rows, via the Supabase dashboard).
const SUPABASE_URL = 'https://esnbtfyauackpfzzwcmq.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzbmJ0ZnlhdWFja3Bmenp3Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MjE5ODYsImV4cCI6MjA5ODk5Nzk4Nn0.flYhHciChCl5jhjEhwKHvJnHrWgYAUE89Xdxmpwzk5c'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Map a Supabase `classes` row to the shape the app's components expect.
export const rowToClass = (r) => ({
  id: r.id,
  type: r.type,
  title: r.title,
  instructor: r.instructor,
  scheme: r.scheme,
  day: r.day,
  time: r.time,
  duration: r.duration,
  spots: r.spots,
  price: Number(r.price),
  level: r.level,
  desc: r.description,
  bring: r.bring || [],
  image_url: r.image_url || null,
})

// Map a Supabase `spaces` row to the app's shape.
export const rowToSpace = (r) => ({
  id: r.id,
  name: r.name,
  scheme: r.scheme,
  capacity: r.capacity,
  price: Number(r.price),
  a: r.color_a,
  b: r.color_b,
  desc: r.description,
  amenities: r.amenities || [],
  image_url: r.image_url || null,
})
