// ============================================
// THEEUROBRIEF — SUPABASE CONFIGURATION
// ============================================

// GANTI NILAI DI BAWAH INI DENGAN DATA DARI SUPABASE
const SUPABASE_URL = 'https://krfofwmlkrwozbuqvuur.supabase.co';
const SUPABASE_ANON_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyZm9md21sa3J3b3pidXF2dXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NjY3MTMsImV4cCI6MjA5NTQ0MjcxM30.EqabN74OniiV9Ousus34KRj5bnMVcLYzmUj5SAPOurE`;

// Inisialisasi Supabase client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper: Ambil URL gambar dari Supabase Storage
function getImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/${path}`;
}

// Helper: Format tanggal ke format berita
function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Helper: Format tanggal singkat
function formatDateShort(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Helper: Buat slug dari teks
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Nama website
const SITE_NAME = 'TheEuroBrief';
const SITE_TAGLINE = 'Your Window into Europe';
