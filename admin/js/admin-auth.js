// ============================================
// THEEUROBRIEF — ADMIN AUTHENTICATION
// ============================================

// Wajib login, kalau belum redirect ke login
async function requireAuth() {
  const { data: { session }, error } = await supabaseClient.auth.getSession();
  if (error || !session) {
    window.location.href = 'index.html';
    return null;
  }
  return session;
}

// Logout
async function logout() {
  await supabaseClient.auth.signOut();
  window.location.href = 'index.html';
}

// Ambil email admin yang sedang login
function getAdminEmail() {
  // Diambil dari session yang sudah di-load oleh requireAuth
  return document.getElementById('admin-email')?.textContent || '';
}

// Format tanggal
function formatDateTime(dateString) {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

// Format tanggal singkat
function formatDateShort(dateString) {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}

// Helper: Ambil URL gambar
function getImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/${path}`;
}

// Slug unik (cek ke database)
async function getUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const { data } = await supabaseClient
      .from('articles')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();
    if (!data) return slug;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

// Toast notification
function showToast(message, type = 'success') {
  const existing = document.getElementById('toast-container');
  if (existing) existing.remove();

  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600'
  };

  const toast = document.createElement('div');
  toast.id = 'toast-container';
  toast.className = `fixed top-4 right-4 z-[100] ${colors[type]} text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 animate-[slideIn_0.3s_ease]`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// Konfirmasi hapus
function confirmDelete(message) {
  return confirm(message || 'Are you sure you want to delete this? This action cannot be undone.');
}
