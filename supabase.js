/* =======================================================
   UTOL Schools – supabase.js
   Global Supabase client + auth helpers (UMD, no bundler)
   Requires:  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
   loaded BEFORE this file.
======================================================= */

const SUPABASE_URL      = 'https://wxskdltvkmypjwxmcubl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4c2tkbHR2a215cGp3eG1jdWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyODQ1MjYsImV4cCI6MjA5MDg2MDUyNn0.IIw6kqgDcxSFXCoGnsnCZXc0sIt5ZmRkemNvqYeUNcQ';

/* ── Internal Supabase client ── */
const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ── Role → email mapping (internal, never shown to user) ──
   These 4 accounts must exist in your Supabase Auth dashboard.
   Run portal/setup.html once to create them automatically.      */
const ROLE_EMAILS = {
  student : 'utol.student@utolschools.edu.gh',
  staff   : 'utol.staff@utolschools.edu.gh',
  parent  : 'utol.parent@utolschools.edu.gh',
  admin   : 'utol.admin@utolschools.edu.gh',
};

/* ── Role → dashboard path ── */
const ROLE_DASHBOARDS = {
  student : 'student-dashboard.html',
  staff   : 'staff-dashboard.html',
  parent  : 'parent-dashboard.html',
  admin   : 'admin-dashboard.html',
};

/* =======================================================
   UTOL global namespace  (window.UTOL)
======================================================= */
window.UTOL = {

  sb: _sb,

  /* ── Sign in with role + password ── */
  async signIn(role, password) {
    const email = ROLE_EMAILS[role];
    if (!email) return { data: null, error: { message: 'Invalid role selected.' } };
    const { data, error } = await _sb.auth.signInWithPassword({ email, password });
    if (!error) {
      localStorage.setItem('utol_role', role);
      localStorage.setItem('utol_email', email);
    }
    return { data, error };
  },

  /* ── Sign out ── */
  async signOut() {
    localStorage.removeItem('utol_role');
    localStorage.removeItem('utol_email');
    await _sb.auth.signOut();
    window.location.href = 'login.html';
  },

  /* ── Get current Supabase user ── */
  async getUser() {
    const { data: { user } } = await _sb.auth.getUser();
    return user;
  },

  /* ── Get current session ── */
  async getSession() {
    const { data: { session } } = await _sb.auth.getSession();
    return session;
  },

  /* ── Auth guard: call at top of every dashboard ──
     role = expected role string ('student' | 'staff' | 'parent' | 'admin')
     Returns the user object or null (+ redirects).               */
  async requireAuth(role) {
    const user = await this.getUser();
    if (!user) {
      window.location.href = 'login.html';
      return null;
    }
    const storedRole = localStorage.getItem('utol_role');
    if (storedRole && role && storedRole !== role) {
      /* Wrong portal for this role – send them to the right one */
      const dest = ROLE_DASHBOARDS[storedRole];
      if (dest) window.location.href = dest;
      return null;
    }
    return user;
  },

  /* ── Password reset (sends email) ── */
  async resetPassword(email) {
    const { data, error } = await _sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/portal/login.html?reset=true',
    });
    return { data, error };
  },

  /* ── One-time setup: create the 4 demo accounts ──
     Call from portal/setup.html only.
     Requires email confirmation to be DISABLED in Supabase Auth settings. */
  async createDemoAccounts(password) {
    const results = [];
    for (const [role, email] of Object.entries(ROLE_EMAILS)) {
      const { data, error } = await _sb.auth.signUp({ email, password });
      results.push({ role, email, success: !error, error: error?.message });
    }
    return results;
  },

  /* =======================================================
     DATA HELPERS  (all return { data, error })
  ======================================================= */

  /* ── Profiles ── */
  async getProfile(userId) {
    return _sb.from('profiles').select('*').eq('id', userId).single();
  },

  async upsertProfile(profile) {
    return _sb.from('profiles').upsert(profile, { onConflict: 'id' });
  },

  /* ── Announcements ── */
  async getAnnouncements(limit = 10) {
    return _sb.from('announcements')
      .select('*, author:profiles(full_name)')
      .order('created_at', { ascending: false })
      .limit(limit);
  },

  async createAnnouncement(payload) {
    return _sb.from('announcements').insert(payload).select().single();
  },

  /* ── Events / Calendar ── */
  async getUpcomingEvents(limit = 8) {
    const today = new Date().toISOString().split('T')[0];
    return _sb.from('events')
      .select('*')
      .gte('event_date', today)
      .order('event_date')
      .limit(limit);
  },

  /* ── Students ── */
  async getStudents(filters = {}) {
    let q = _sb.from('students').select('*, profiles(full_name, avatar_initials)');
    if (filters.class_name) q = q.eq('class_name', filters.class_name);
    return q.order('full_name');
  },

  async getStudentByProfileId(profileId) {
    return _sb.from('students').select('*').eq('profile_id', profileId).single();
  },

  /* ── Grades ── */
  async getGrades(studentId, term = null) {
    let q = _sb.from('grades').select('*, subjects(name)').eq('student_id', studentId);
    if (term) q = q.eq('term', term);
    return q.order('created_at', { ascending: false });
  },

  async upsertGrade(gradeData) {
    return _sb.from('grades').upsert(gradeData, { onConflict: 'student_id,subject_id,term' });
  },

  /* ── Attendance ── */
  async getAttendance(studentId, fromDate, toDate) {
    let q = _sb.from('attendance').select('*').eq('student_id', studentId);
    if (fromDate) q = q.gte('date', fromDate);
    if (toDate)   q = q.lte('date', toDate);
    return q.order('date', { ascending: false });
  },

  async markAttendance(records) {
    return _sb.from('attendance').upsert(records, { onConflict: 'student_id,date' });
  },

  async getDailyAttendanceSummary(date) {
    const d = date || new Date().toISOString().split('T')[0];
    return _sb.from('attendance').select('status').eq('date', d);
  },

  /* ── Fees ── */
  async getFeeRecords(studentId) {
    return _sb.from('fee_records')
      .select('*')
      .eq('student_id', studentId)
      .order('due_date', { ascending: false });
  },

  async getFeeCollection(term = null) {
    let q = _sb.from('fee_records').select('*');
    if (term) q = q.eq('term', term);
    return q;
  },

  /* ── Messages ── */
  async getMessages(userId, limit = 20) {
    return _sb.from('messages')
      .select('*, sender:profiles!sender_id(full_name, avatar_initials)')
      .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
      .order('created_at', { ascending: false })
      .limit(limit);
  },

  async sendMessage(senderId, recipientId, content) {
    return _sb.from('messages')
      .insert({ sender_id: senderId, recipient_id: recipientId, content })
      .select().single();
  },

  /* ── Staff ── */
  async getStaff() {
    return _sb.from('profiles')
      .select('*, staff_details(*)')
      .eq('role', 'staff')
      .order('full_name');
  },

  async getPendingLeave() {
    return _sb.from('leave_requests')
      .select('*, staff:profiles(full_name)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
  },

  async updateLeave(id, status) {
    return _sb.from('leave_requests').update({ status }).eq('id', id);
  },

  /* ── Admissions ── */
  async getApplications(status = null) {
    let q = _sb.from('applications')
      .select('*')
      .order('submitted_at', { ascending: false });
    if (status) q = q.eq('status', status);
    return q;
  },

  async updateApplication(id, updates) {
    return _sb.from('applications').update(updates).eq('id', id);
  },

  /* =======================================================
     REAL-TIME SUBSCRIPTIONS
  ======================================================= */

  subscribeToAnnouncements(callback) {
    return _sb.channel('announcements-live')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'announcements' },
        payload => callback(payload.new))
      .subscribe();
  },

  subscribeToMessages(userId, callback) {
    return _sb.channel(`messages-${userId}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'messages',
        filter: `recipient_id=eq.${userId}`,
      }, payload => callback(payload.new))
      .subscribe();
  },

  /* =======================================================
     STORAGE
  ======================================================= */

  async uploadFile(bucket, path, file) {
    return _sb.storage.from(bucket).upload(path, file, { upsert: true });
  },

  getPublicUrl(bucket, path) {
    return _sb.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  },
};
