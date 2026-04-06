/* =================================================================
   UTOL Schools — portal-nav.js
   Slide-over panel navigation + section content for all dashboards
   Load order: supabase.js → main.js → portal-nav.js → inline script
================================================================= */
(function () {
'use strict';

/* ── 1. Inject panel markup ── */
document.addEventListener('DOMContentLoaded', function () {
  document.body.insertAdjacentHTML('beforeend',
    '<div id="pnlOverlay" class="pnl-overlay"></div>' +
    '<aside id="pnlDrawer" class="pnl-drawer" role="dialog" aria-modal="true">' +
      '<header class="pnl-head">' +
        '<h2 class="pnl-head-title" id="pnlTitle"></h2>' +
        '<button class="pnl-head-close" onclick="closePanel()" title="Close (Esc)">&#10005;</button>' +
      '</header>' +
      '<div class="pnl-body" id="pnlBody"></div>' +
    '</aside>'
  );
  document.getElementById('pnlOverlay').addEventListener('click', closePanel);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePanel(); });
});

/* ── 2. Open / Close API ── */
window.openPanel = function (title, html) {
  document.getElementById('pnlTitle').innerHTML = title;
  document.getElementById('pnlBody').innerHTML  = html;
  document.getElementById('pnlDrawer').classList.add('open');
  document.getElementById('pnlOverlay').classList.add('open');
};
window.closePanel = function () {
  document.getElementById('pnlDrawer').classList.remove('open');
  document.getElementById('pnlOverlay').classList.remove('open');
};

/* ── 3. navClick – central handler ── */
window.navClick = function (link) {
  var sec = (link.dataset.section || '').trim();
  if (!sec) return;

  /* Scroll-to existing page element */
  if (sec.startsWith('scroll:')) {
    var selStr = sec.slice(7);
    var sels   = selStr.split(',');
    var found  = null;
    for (var i = 0; i < sels.length; i++) {
      found = document.querySelector(sels[i].trim());
      if (found) break;
    }
    if (found) {
      found.scrollIntoView({ behavior: 'smooth', block: 'start' });
      found.style.outline       = '2.5px solid #F4C70A';
      found.style.outlineOffset = '6px';
      setTimeout(function () { found.style.outline = ''; found.style.outlineOffset = ''; }, 1800);
    }
    return;
  }

  /* Scroll to top of main */
  if (sec === 'top') {
    var main = document.querySelector('.dashboard-main');
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  /* Look up in dashboard-specific sections first, then common */
  var all = Object.assign({}, window._COMMON || {}, window.PORTAL_SECTIONS || {});
  if (all[sec]) {
    openPanel(all[sec].title, all[sec].html);
  } else if (typeof showToast === 'function') {
    showToast('\uD83D\uDEA7 Module coming soon.', 'info');
  }
};

/* =================================================================
   HELPER FUNCTIONS  (exposed as window._h for use in PORTAL_SECTIONS)
================================================================= */
var h = {};

h.badge = function (text, color) {
  var c = { green:['#dcfce7','#15803d'], red:['#fee2e2','#dc2626'], yellow:['#fef9c3','#a07800'],
             blue:['#dbeafe','#1d4ed8'], navy:['#e8eaf6','#03045e'], purple:['#f3e8ff','#7c3aed'],
             orange:['#fff3e0','#e65100'], gray:['#f3f4f6','#374151'] };
  var bg = (c[color]||c.gray)[0], fg = (c[color]||c.gray)[1];
  return '<span class="pnl-badge" style="background:'+bg+';color:'+fg+';">'+text+'</span>';
};

h.stats = function (items) {
  return '<div class="pnl-stats">' +
    items.map(function (i) {
      return '<div class="pnl-stat" style="background:'+(i.bg||'var(--light)')+';">' +
        '<strong style="color:'+(i.color||'var(--navy)')+';">'+i.val+'</strong>' +
        '<span>'+i.label+'</span></div>';
    }).join('') + '</div>';
};

h.table = function (heads, rows) {
  return '<div style="overflow-x:auto;"><table class="pnl-table"><thead><tr>' +
    heads.map(function (hd) { return '<th>'+hd+'</th>'; }).join('') + '</tr></thead><tbody>' +
    rows.map(function (r) {
      return '<tr>' + r.map(function (c) { return '<td>'+c+'</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody></table></div>';
};

h.field = function (label, type, placeholder, val) {
  return '<div class="pnl-form-field"><label>'+label+'</label>' +
    '<input type="'+(type||'text')+'" placeholder="'+(placeholder||'')+'" value="'+(val||'')+'" /></div>';
};
h.selectField = function (label, opts, sel) {
  return '<div class="pnl-form-field"><label>'+label+'</label><select>' +
    opts.map(function(o){return '<option'+(o===sel?' selected':'')+'>'+o+'</option>';}).join('') +
    '</select></div>';
};
h.textarea = function (label, placeholder, rows) {
  return '<div class="pnl-form-field"><label>'+label+'</label>' +
    '<textarea rows="'+(rows||3)+'" placeholder="'+(placeholder||'')+'" style="resize:vertical;"></textarea></div>';
};
h.btn = function (label, cls, onclick) {
  return '<button class="pnl-btn '+(cls||'pnl-btn-navy')+'" onclick="'+onclick+'">'+label+'</button>';
};
h.row = function (items) {
  return '<div class="pnl-action-row">'+items.join('')+'</div>';
};
h.divider = function (title) {
  return '<div class="pnl-section-title">'+title+'</div>';
};
h.card = function (content, bg) {
  return '<div style="background:'+(bg||'var(--light)')+';border-radius:10px;padding:16px;margin-bottom:14px;">'+content+'</div>';
};
h.ann = function (items) {
  return items.map(function (i) {
    return '<div class="pnl-ann-item" style="border-left-color:'+i.p+';">' +
      '<div style="display:flex;justify-content:space-between;gap:8px;margin-bottom:5px;">' +
        '<strong style="font-size:0.88rem;color:var(--navy);">'+i.t+'</strong>' +
        '<span style="font-size:0.72rem;color:#6b7280;white-space:nowrap;">'+i.d+'</span></div>' +
      '<p style="font-size:0.8rem;color:#374151;line-height:1.6;margin-bottom:5px;">'+i.b+'</p>' +
      '<span style="font-size:0.72rem;color:#9ca3af;">— '+i.by+'</span></div>';
  }).join('');
};
h.events = function (items) {
  return items.map(function (i) {
    return '<div class="pnl-event-item">' +
      '<div class="pnl-event-date" style="background:'+i.c+';">' +
        '<div style="font-family:\'Fredoka One\',cursive;font-size:1.1rem;line-height:1;">'+i.d+'</div>' +
        '<div style="font-size:0.6rem;font-weight:800;letter-spacing:1px;">'+i.m+'</div></div>' +
      '<div><div style="font-weight:700;color:var(--navy);font-size:0.88rem;margin-bottom:3px;">'+i.n+'</div>' +
        '<div style="font-size:0.79rem;color:#6b7280;">'+i.desc+'</div></div></div>';
  }).join('');
};

window._h = h;

/* =================================================================
   COMMON SECTIONS  (all portals)
================================================================= */
window._COMMON = {

  /* ---- Announcements ---- */
  announcements: {
    title: '&#128276; Announcements',
    html: h.ann([
      { p:'#ef4444', d:'Apr 5',  t:'Sports Day – Monday April 14th',
        b:'All students must wear their sports kits. Events begin 8:30 AM on the main field. Parents are warmly invited to cheer on their children.',
        by:'Principal Okonkwo' },
      { p:'#F4C70A', d:'Apr 3',  t:'Mid-Term Break – Apr 25 to May 4',
        b:'School closes Friday April 25th and resumes Monday May 5th. Break assignments will be distributed on April 24th.',
        by:'Admin Office' },
      { p:'#2E7D32', d:'Apr 1',  t:'Term 3 Fee Payment Reminder',
        b:'Term 3 fees open August 1st. Please clear all outstanding Term 2 balances before then. Contact the bursar for payment plans.',
        by:'Bursar' },
      { p:'#0277bd', d:'Mar 28', t:'200 New Library Titles Now Available',
        b:'New books in Science, African Literature and Mathematics are available for borrowing. Students may borrow up to 3 titles at a time.',
        by:'Librarian' },
      { p:'#7b1fa2', d:'Mar 25', t:'Parent-Teacher Conference – May 10',
        b:'Book your appointment slot via the portal. Conferences run 9:00 AM – 1:00 PM in individual classrooms. All parents encouraged to attend.',
        by:'Admin Office' },
    ])
  },

  /* ---- Events ---- */
  events: {
    title: '&#128197; School Events',
    html: h.events([
      { d:'14', m:'APR', c:'#2E7D32', n:'Sports Day',
        desc:'Annual inter-house sports competition. All classes participate. 8:30 AM on the main field.' },
      { d:'25', m:'APR', c:'#F4C70A', n:'Mid-Term Break Begins',
        desc:'School closes. Academic work resumes Monday May 5th.' },
      { d:'5',  m:'MAY', c:'#0277bd', n:'School Resumes',
        desc:'Students return from mid-term. Attendance taken from 7:30 AM.' },
      { d:'10', m:'MAY', c:'#7b1fa2', n:'Parent-Teacher Conference',
        desc:'Book your slot via the portal. 9 AM – 1 PM in individual classrooms.' },
      { d:'19', m:'MAY', c:'#ef4444', n:'End-of-Term Exams Begin',
        desc:'Term 2 examination timetables issued by class teachers one week prior.' },
      { d:'30', m:'MAY', c:'#F4C70A', n:'Last Day of Term 2',
        desc:'Prize giving and graduation ceremony at 10 AM in the school hall.' },
      { d:'9',  m:'JUN', c:'#2E7D32', n:'Term 3 Begins',
        desc:'School reopens for Term 3. New timetables and class lists distributed.' },
    ])
  },

  /* ---- Security ---- */
  security: {
    title: '&#128274; Security Settings',
    html: h.card(
        '<div style="font-family:\'Fredoka One\',cursive;color:var(--navy);font-size:1rem;margin-bottom:14px;">Change Password</div>' +
        h.field('Current Password','password','••••••••') +
        h.field('New Password','password','Enter new password') +
        h.field('Confirm New Password','password','Re-enter new password') +
        h.row([h.btn('Update Password','pnl-btn-navy',"showToast('Password updated successfully!','success')")])
      , '#f0f4ff') +
      h.card(
        '<div style="font-family:\'Fredoka One\',cursive;color:var(--navy);font-size:1rem;margin-bottom:12px;">Recent Login Activity</div>' +
        [['Signed In','Chrome – Windows','Today, 8:14 AM',true],
         ['Signed In','Chrome – Android','Yesterday, 7:02 PM',false],
         ['Password Changed','Firefox – Windows','Mar 20, 2025',false]]
        .map(function(l){
          return '<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid #e5e7eb;font-size:0.79rem;">' +
            '<div><div style="font-weight:700;color:var(--navy);">'+l[0]+(l[3]?' <span style="background:#dcfce7;color:#15803d;border-radius:10px;padding:1px 7px;font-size:0.68rem;">Current</span>':'')+
            '</div><div style="color:#6b7280;">'+l[1]+'</div></div>' +
            '<div style="color:#9ca3af;">'+l[2]+'</div></div>';
        }).join('')
      ,'#f0f4ff') +
      '<div style="background:#fef2f2;border:1px solid #fca5a5;border-radius:10px;padding:16px;">' +
        '<div style="font-family:\'Fredoka One\',cursive;color:#dc2626;font-size:1rem;margin-bottom:8px;">&#9888; Danger Zone</div>' +
        '<p style="font-size:0.8rem;color:#6b7280;margin-bottom:12px;">To deactivate your account, please contact IT support.</p>' +
        h.btn('Request Deactivation','pnl-btn-red',"showToast('Please email utol.it@utolschools.edu.gh','info')") +
      '</div>'
  },

};

})(); /* end IIFE */
