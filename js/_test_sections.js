window.PORTAL_SECTIONS = (function(h){
var btn = h.btn, badge = h.badge, stats = h.stats, table = h.table,
    divider = h.divider, card = h.card, field = h.field, row = h.row,
    selectField = h.selectField, textarea = h.textarea;
return {

/* ── All Students ── */
'all-students': { title:'&#128101; All Students',
  html: stats([
    {val:'482',label:'Total Students',bg:'#e8eaf6',color:'var(--navy)'},
    {val:'247',label:'Male',bg:'#dbeafe',color:'#1d4ed8'},
    {val:'235',label:'Female',bg:'#fce7f3',color:'#be185d'},
    {val:'98%',label:'Active',bg:'#dcfce7',color:'#15803d'},
  ])+divider('Student Registry')+
  table(['Name','Class','Gender','Status','Action'],[
    ['Amara Mensah','P4A','F',badge('Active','green'),btn('View','pnl-btn-navy',"showToast('Opening student profile...','info')")],
    ['Kwame Asante','P5B','M',badge('Active','green'),btn('View','pnl-btn-navy',"showToast('Opening student profile...','info')")],
    ['Ngozi Okafor','P3A','F',badge('Active','green'),btn('View','pnl-btn-navy',"showToast('Opening student profile...','info')")],
    ['Ibrahim Musa','KG2','M',badge('Active','green'),btn('View','pnl-btn-navy',"showToast('Opening student profile...','info')")],
    ['Chisom Eze','P6A','F',badge('Active','green'),btn('View','pnl-btn-navy',"showToast('Opening student profile...','info')")],
    ['Emeka Nwosu','P2B','M',badge('Suspended','red'),btn('View','pnl-btn-navy',"showToast('Opening student profile...','info')")],
    ['Zara Obi','P1A','F',badge('Active','green'),btn('View','pnl-btn-navy',"showToast('Opening student profile...','info')")],
  ])+row([btn('+ Add Student','pnl-btn-green',"showToast('Add student form opened.','info')"),btn('Export CSV','pnl-btn-navy',"showToast('Student list exported.','success')")])
},

/* ── Admissions ── */
'admissions': { title:'&#128196; Admissions',
  html: stats([
    {val:'37',label:'Applications',bg:'#e8eaf6',color:'var(--navy)'},
    {val:'14',label:'Pending',bg:'#fef9c3',color:'#a07800'},
    {val:'18',label:'Approved',bg:'#dcfce7',color:'#15803d'},
    {val:'5',label:'Declined',bg:'#fee2e2',color:'#dc2626'},
  ])+divider('Pending Applications')+
  table(['Applicant','Class Sought','Date','Status','Action'],[
    ['Tolu Adeyemi','P1A','Apr 4',badge('Pending','yellow'),btn('Review','pnl-btn-navy',"showToast('Application opened.','info')")],
    ['Yemi Balogun','KG1','Apr 3',badge('Pending','yellow'),btn('Review','pnl-btn-navy',"showToast('Application opened.','info')")],
    ['Fatima Hassan','P3B','Apr 2',badge('Interview','blue'),btn('Review','pnl-btn-navy',"showToast('Application opened.','info')")],
    ['Daniel Osei','P5A','Apr 1',badge('Approved','green'),btn('Letter','pnl-btn-navy',"showToast('Acceptance letter sent.','success')")],
    ['Aisha Musa','P2A','Mar 30',badge('Declined','red'),btn('View','pnl-btn-navy',"showToast('Application opened.','info')")],
  ])+row([btn('+ New Application','pnl-btn-green',"showToast('New application form opened.','info')"),btn('Export','pnl-btn-navy',"showToast('Exported.','success')")])
},

/* ── Attendance Overview ── */
'attendance-overview': { title:'&#9989; Attendance Overview',
  html: stats([
    {val:'94%',label:"Today's Rate",bg:'#dcfce7',color:'#15803d'},
    {val:'456',label:'Present',bg:'#dbeafe',color:'#1d4ed8'},
    {val:'18',label:'Absent',bg:'#fee2e2',color:'#dc2626'},
    {val:'8',label:'Late',bg:'#fef9c3',color:'#a07800'},
  ])+divider('Attendance by Class – Today')+
  table(['Class','Teacher','Present','Absent','Rate'],[
    ['P6A','Mr. Owusu','32','1','97%'],
    ['P5B','Mrs. Addo','29','3','91%'],
    ['P4A','Mr. Mensah','31','0','100%'],
    ['P3A','Mrs. Boateng','28','2','93%'],
    ['P2B','Mr. Asante','27','4','87%'],
    ['KG2','Mrs. Okafor','22','1','96%'],
  ])+row([btn('Full Report','pnl-btn-navy',"showToast('Full attendance report generated.','success')"),btn('Send Alerts','pnl-btn-yellow',"showToast('Absence alerts sent to parents.','success')")])
},

/* ── Academic Records ── */
'academic-records': { title:'&#128203; Academic Records',
  html: stats([
    {val:'A',label:'School Average Grade',bg:'#dcfce7',color:'#15803d'},
    {val:'78%',label:'Pass Rate',bg:'#dbeafe',color:'#1d4ed8'},
    {val:'12',label:'Honours Students',bg:'#f3e8ff',color:'#7c3aed'},
    {val:'3',label:'At-Risk Students',bg:'#fee2e2',color:'#dc2626'},
  ])+divider('Term 2 – Academic Summary by Class')+
  table(['Class','Avg Score','Highest','Lowest','Pass Rate'],[
    ['P6A','82.4%','96%','61%','100%'],
    ['P5B','79.1%','94%','58%','97%'],
    ['P4A','76.8%','91%','55%','94%'],
    ['P3A','74.5%','90%','52%','91%'],
    ['P2B','72.3%','88%','49%','89%'],
    ['KG2','80.6%','95%','62%','98%'],
  ])+row([btn('Full Report','pnl-btn-navy',"showToast('Academic report generated.','success')"),btn('Export PDF','pnl-btn-navy',"showToast('PDF exported.','success')")])
},

/* ── Exam Results ── */
'exam-results': { title:'&#127891; Exam Results',
  html: stats([
    {val:'Term 2',label:'Current Term',bg:'#e8eaf6',color:'var(--navy)'},
    {val:'482',label:'Students Assessed',bg:'#dbeafe',color:'#1d4ed8'},
    {val:'78%',label:'Pass Rate',bg:'#dcfce7',color:'#15803d'},
    {val:'22',label:'Distinctions',bg:'#fef9c3',color:'#a07800'},
  ])+divider('Top Performers – Term 2')+
  table(['Rank','Student','Class','Score','Grade'],[
    ['1st','Chisom Eze','P6A','96.4%',badge('A+','green')],
    ['2nd','Yemi Addo','P5B','94.1%',badge('A+','green')],
    ['3rd','Amara Mensah','P4A','91.8%',badge('A','green')],
    ['4th','Kofi Boateng','P6A','90.2%',badge('A','green')],
    ['5th','Nkechi Eze','P3A','89.7%',badge('A','green')],
  ])+divider('Publish Results')+
  row([btn('Publish to Parents','pnl-btn-green',"showToast('Results published to parent portals.','success')"),btn('Print All','pnl-btn-navy',"showToast('Printing results...','info')")])
},

/* ── Staff Directory ── */
'staff-directory': { title:'&#128104;&#8205;&#127979; Staff Directory',
  html: stats([
    {val:'38',label:'Total Staff',bg:'#e8eaf6',color:'var(--navy)'},
    {val:'24',label:'Teaching',bg:'#dbeafe',color:'#1d4ed8'},
    {val:'14',label:'Non-Teaching',bg:'#f3e8ff',color:'#7c3aed'},
    {val:'36',label:'Active Today',bg:'#dcfce7',color:'#15803d'},
  ])+divider('Staff List')+
  table(['Name','Role','Department','Status','Action'],[
    ['Mr. Kweku Owusu','Class Teacher','Primary 6A',badge('Present','green'),btn('View','pnl-btn-navy',"showToast('Staff profile opened.','info')")],
    ['Mrs. Abena Addo','Class Teacher','Primary 5B',badge('Present','green'),btn('View','pnl-btn-navy',"showToast('Staff profile opened.','info')")],
    ['Mr. Kofi Mensah','Class Teacher','Primary 4A',badge('On Leave','yellow'),btn('View','pnl-btn-navy',"showToast('Staff profile opened.','info')")],
    ['Mrs. Ama Boateng','Class Teacher','Primary 3A',badge('Present','green'),btn('View','pnl-btn-navy',"showToast('Staff profile opened.','info')")],
    ['Mr. Yaw Asante','Sciences HOD','Science Dept',badge('Present','green'),btn('View','pnl-btn-navy',"showToast('Staff profile opened.','info')")],
    ['Mrs. Grace Osei','Librarian','Library',badge('Present','green'),btn('View','pnl-btn-navy',"showToast('Staff profile opened.','info')")],
  ])+row([btn('+ Add Staff','pnl-btn-green',"showToast('Add staff form opened.','info')"),btn('Export','pnl-btn-navy',"showToast('Staff list exported.','success')")])
},

/* ── Leave Management ── */
'leave-management': { title:'&#128197; Leave Management',
  html: stats([
    {val:'3',label:'Pending',bg:'#fef9c3',color:'#a07800'},
    {val:'8',label:'Approved (Term)',bg:'#dcfce7',color:'#15803d'},
    {val:'2',label:'Declined',bg:'#fee2e2',color:'#dc2626'},
    {val:'1',label:'On Leave Now',bg:'#dbeafe',color:'#1d4ed8'},
  ])+divider('Pending Leave Requests')+
  table(['Staff','Type','From','To','Reason','Action'],[
    ['Mr. Kofi Mensah','Medical','Apr 7','Apr 11','Medical procedure',
      btn('Approve','pnl-btn-green',"showToast('Leave approved. Mr. Mensah notified.','success')")+' '+
      btn('Decline','pnl-btn-red',"showToast('Leave declined.','info')")],
    ['Mrs. Grace Osei','Personal','Apr 14','Apr 14','Family event',
      btn('Approve','pnl-btn-green',"showToast('Leave approved. Mrs. Osei notified.','success')")+' '+
      btn('Decline','pnl-btn-red',"showToast('Leave declined.','info')")],
    ['Mr. Yaw Darko','Annual','May 5','May 9','Annual leave',
      btn('Approve','pnl-btn-green',"showToast('Leave approved. Mr. Darko notified.','success')")+' '+
      btn('Decline','pnl-btn-red',"showToast('Leave declined.','info')")],
  ])+row([btn('Leave Policy','pnl-btn-navy',"showToast('Leave policy document opened.','info')")])
},

/* ── Payroll ── */
'payroll': { title:'&#128176; Staff Payroll',
  html: stats([
    {val:'GH₵ 184,500',label:'This Month Total',bg:'#dcfce7',color:'#15803d'},
    {val:'38',label:'Staff on Payroll',bg:'#e8eaf6',color:'var(--navy)'},
    {val:'GH₵ 4,855',label:'Average Salary',bg:'#dbeafe',color:'#1d4ed8'},
    {val:'Processed',label:'April Status',bg:'#dcfce7',color:'#15803d'},
  ])+divider('Payroll Summary – April 2025')+
  table(['Staff','Role','Gross Pay','Deductions','Net Pay','Status'],[
    ['Mr. Kweku Owusu','Class Teacher','GH₵ 6,200','GH₵ 620','GH₵ 5,580',badge('Paid','green')],
    ['Mrs. Abena Addo','Class Teacher','GH₵ 6,000','GH₵ 600','GH₵ 5,400',badge('Paid','green')],
    ['Mr. Kofi Mensah','Class Teacher','GH₵ 5,800','GH₵ 580','GH₵ 5,220',badge('Paid','green')],
    ['Mrs. Ama Boateng','Class Teacher','GH₵ 5,800','GH₵ 580','GH₵ 5,220',badge('Paid','green')],
    ['Mr. Yaw Asante','HOD Sciences','GH₵ 7,200','GH₵ 720','GH₵ 6,480',badge('Paid','green')],
  ])+row([btn('Run Payroll','pnl-btn-green',"showToast('Payroll processing initiated.','success')"),btn('Export Payslips','pnl-btn-navy',"showToast('All payslips generated.','success')")])
},

/* ── Appraisals ── */
'appraisals': { title:'&#128202; Staff Appraisals',
  html: stats([
    {val:'38',label:'Staff Total',bg:'#e8eaf6',color:'var(--navy)'},
    {val:'31',label:'Appraised',bg:'#dcfce7',color:'#15803d'},
    {val:'7',label:'Pending',bg:'#fef9c3',color:'#a07800'},
    {val:'4.2/5',label:'Avg Score',bg:'#dbeafe',color:'#1d4ed8'},
  ])+divider('Term 2 Appraisal Results')+
  table(['Staff','Role','Score','Rating','Action'],[
    ['Mr. Kweku Owusu','Class Teacher','4.7/5',badge('Excellent','green'),btn('View','pnl-btn-navy',"showToast('Appraisal report opened.','info')")],
    ['Mrs. Abena Addo','Class Teacher','4.5/5',badge('Excellent','green'),btn('View','pnl-btn-navy',"showToast('Appraisal report opened.','info')")],
    ['Mr. Kofi Mensah','Class Teacher','4.1/5',badge('Good','blue'),btn('View','pnl-btn-navy',"showToast('Appraisal report opened.','info')")],
    ['Mrs. Ama Boateng','Class Teacher','3.8/5',badge('Good','blue'),btn('View','pnl-btn-navy',"showToast('Appraisal report opened.','info')")],
    ['Mr. Yaw Darko','Sports Coach','3.2/5',badge('Fair','yellow'),btn('View','pnl-btn-navy',"showToast('Appraisal report opened.','info')")],
  ])+row([btn('+ New Appraisal','pnl-btn-navy',"showToast('Appraisal form opened.','info')"),btn('Export Results','pnl-btn-navy',"showToast('Appraisals exported.','success')")])
},

/* ── Classes & Timetables ── */
'classes-timetables': { title:'&#128218; Classes &amp; Timetables',
  html: stats([
    {val:'14',label:'Active Classes',bg:'#e8eaf6',color:'var(--navy)'},
    {val:'482',label:'Students Enrolled',bg:'#dbeafe',color:'#1d4ed8'},
    {val:'38',label:'Teachers',bg:'#dcfce7',color:'#15803d'},
    {val:'6',label:'Divisions',bg:'#f3e8ff',color:'#7c3aed'},
  ])+divider('Class Overview')+
  table(['Class','Teacher','Students','Subjects','Status'],[
    ['Primary 6A','Mr. Kweku Owusu','33',badge('8 Subjects','blue'),badge('Active','green')],
    ['Primary 5B','Mrs. Abena Addo','32',badge('8 Subjects','blue'),badge('Active','green')],
    ['Primary 4A','Mr. Kofi Mensah','31',badge('7 Subjects','blue'),badge('Active','green')],
    ['Primary 3A','Mrs. Ama Boateng','30',badge('7 Subjects','blue'),badge('Active','green')],
    ['KG2','Mrs. Ngozi Okafor','23',badge('5 Subjects','blue'),badge('Active','green')],
    ['KG1','Mr. Yaw Darko','21',badge('5 Subjects','blue'),badge('Active','green')],
  ])+row([btn('Manage Classes','pnl-btn-navy',"showToast('Class management opened.','info')"),btn('Edit Timetables','pnl-btn-navy',"showToast('Timetable editor opened.','info')")])
},

/* ── Cafeteria ── */
'cafeteria': { title:'&#127869; Cafeteria Management',
  html: stats([
    {val:'312',label:"Today's Meal Count",bg:'#dcfce7',color:'#15803d'},
    {val:'GH₵ 4,680',label:'Revenue Today',bg:'#dbeafe',color:'#1d4ed8'},
    {val:'3',label:'Menu Items',bg:'#fef9c3',color:'#a07800'},
    {val:'Low',label:'Stock Alert',bg:'#fee2e2',color:'#dc2626'},
  ])+divider("Today's Menu – Monday")+
  table(['Item','Price','Orders','Status'],[
    ['Jollof Rice + Chicken','GH₵ 18','142',badge('Available','green')],
    ['Waakye + Egg','GH₵ 14','98',badge('Available','green')],
    ['Vegetable Fried Rice','GH₵ 16','72',badge('Running Low','yellow')],
    ['Fruit Juice','GH₵ 6','180',badge('Available','green')],
    ['Mineral Water','GH₵ 3','210',badge('Available','green')],
  ])+divider('Manage Menu')+
  field('New Menu Item','text','Enter menu item name')+
  field('Price (GH₵)','number','0.00')+
  row([btn('Add Item','pnl-btn-green',"showToast('Menu item added.','success')"),btn('Print Menu','pnl-btn-navy',"showToast('Menu printed.','success')")])
},

/* ── Transport ── */
'transport': { title:'&#128652; Transport Management',
  html: stats([
    {val:'8',label:'Active Buses',bg:'#dcfce7',color:'#15803d'},
    {val:'186',label:'Students Using Transport',bg:'#e8eaf6',color:'var(--navy)'},
    {val:'6',label:'Routes',bg:'#dbeafe',color:'#1d4ed8'},
    {val:'All On Time',label:"Today's Status",bg:'#dcfce7',color:'#15803d'},
  ])+divider('Bus Routes')+
  table(['Route','Driver','Bus No.','Students','Status'],[
    ['East Legon – Achimota','Mr. Kojo Darko','Bus 01','34',badge('On Route','green')],
    ['Tema – School','Mr. Ato Mensah','Bus 02','28',badge('Arrived','blue')],
    ['Spintex – School','Mr. Kofi Adu','Bus 03','31',badge('On Route','green')],
    ['Adenta – School','Mr. Kwesi Asante','Bus 04','29',badge('Arrived','blue')],
    ['Airport – School','Mr. Yaw Frimpong','Bus 05','24',badge('Delayed','yellow')],
    ['Haatso – School','Mr. Paa Kofi','Bus 06','40',badge('On Route','green')],
  ])+row([btn('Track Buses','pnl-btn-navy',"showToast('Live tracking map opened.','info')"),btn('Send Alert','pnl-btn-yellow',"showToast('Driver alert sent.','success')")])
},

/* ── Fee Collection ── */
'fee-collection': { title:'&#128184; Fee Collection',
  html: stats([
    {val:'GH₵ 2.8M',label:'Collected (Term 2)',bg:'#dcfce7',color:'#15803d'},
    {val:'GH₵ 420K',label:'Outstanding',bg:'#fee2e2',color:'#dc2626'},
    {val:'87%',label:'Collection Rate',bg:'#dbeafe',color:'#1d4ed8'},
    {val:'62',label:'Pending Payments',bg:'#fef9c3',color:'#a07800'},
  ])+divider('Recent Payments')+
  table(['Student','Class','Amount','Date','Method','Status'],[
    ['Kwame Asante','P5B','GH₵ 285,000','Apr 3','Bank Transfer',badge('Paid','green')],
    ['Ngozi Okafor','P3A','GH₵ 260,000','Apr 2','Mobile Money',badge('Paid','green')],
    ['Ibrahim Musa','KG2','GH₵ 220,000','Apr 1','Cash',badge('Paid','green')],
    ['Chisom Eze','P6A','GH₵ 285,000','Mar 30','Bank Transfer',badge('Paid','green')],
    ['Tolu Adeyemi','P1A','GH₵ 240,000','—','—',badge('Pending','yellow')],
  ])+divider('Record Payment')+
  field('Student Name / ID','text','Search student...')+
  field('Amount (GH₵)','number','0.00')+
  selectField('Payment Method',['Bank Transfer','Mobile Money','Cash','Cheque'])+
  row([btn('Record Payment','pnl-btn-green',"showToast('Payment recorded successfully.','success')"),btn('Send Reminder','pnl-btn-yellow',"showToast('Payment reminder sent to all pending families.','success')")])
},

/* ── Financial Reports ── */
'financial-reports': { title:'&#128202; Financial Reports',
  html: stats([
    {val:'GH₵ 3.2M',label:'Total Revenue (Term 2)',bg:'#dcfce7',color:'#15803d'},
    {val:'GH₵ 2.1M',label:'Total Expenses',bg:'#fee2e2',color:'#dc2626'},
    {val:'GH₵ 1.1M',label:'Net Balance',bg:'#dbeafe',color:'#1d4ed8'},
    {val:'+12%',label:'vs Term 1',bg:'#dcfce7',color:'#15803d'},
  ])+divider('Revenue Breakdown')+
  table(['Category','Budgeted','Actual','Variance'],[
    ['School Fees','GH₵ 2.8M','GH₵ 2.8M',badge('On Track','green')],
    ['Transport Fees','GH₵ 250K','GH₵ 242K',badge('-3%','yellow')],
    ['Cafeteria','GH₵ 180K','GH₵ 194K',badge('+8%','green')],
    ['Other Income','GH₵ 60K','GH₵ 58K',badge('-3%','yellow')],
  ])+divider('Expense Breakdown')+
  table(['Category','Budgeted','Actual','Status'],[
    ['Staff Salaries','GH₵ 1.1M','GH₵ 1.1M',badge('Paid','green')],
    ['Utilities','GH₵ 45K','GH₵ 48K',badge('+7%','yellow')],
    ['Maintenance','GH₵ 80K','GH₵ 72K',badge('-10%','green')],
    ['Supplies','GH₵ 60K','GH₵ 58K',badge('-3%','green')],
  ])+row([btn('Export PDF','pnl-btn-navy',"showToast('Financial report exported.','success')"),btn('Print Report','pnl-btn-navy',"showToast('Printing...','info')")])
},

/* ── Payroll Expenses ── */
'payroll-expenses': { title:'&#128184; Payroll Expenses',
  html: stats([
    {val:'GH₵ 184,500',label:'April Total',bg:'#dcfce7',color:'#15803d'},
    {val:'GH₵ 18,450',label:'SSNIT (10%)',bg:'#fef9c3',color:'#a07800'},
    {val:'GH₵ 11,070',label:'Income Tax (6%)',bg:'#fee2e2',color:'#dc2626'},
    {val:'GH₵ 154,980',label:'Net Payroll',bg:'#dbeafe',color:'#1d4ed8'},
  ])+divider('Monthly Payroll Trend')+
  table(['Month','Gross','SSNIT','Tax','Net'],[
    ['January 2025','GH₵ 181,200','GH₵ 18,120','GH₵ 10,872','GH₵ 152,208'],
    ['February 2025','GH₵ 182,400','GH₵ 18,240','GH₵ 10,944','GH₵ 153,216'],
    ['March 2025','GH₵ 184,500','GH₵ 18,450','GH₵ 11,070','GH₵ 154,980'],
    ['April 2025','GH₵ 184,500','GH₵ 18,450','GH₵ 11,070','GH₵ 154,980'],
  ])+row([btn('Export Payroll','pnl-btn-navy',"showToast('Payroll export ready.','success')"),btn('Submit to GRA','pnl-btn-navy',"showToast('Payroll data submitted to GRA.','success')")])
},

/* ── User Management ── */
'user-management': { title:'&#128100; User Management',
  html: stats([
    {val:'38',label:'Staff Accounts',bg:'#e8eaf6',color:'var(--navy)'},
    {val:'482',label:'Student Accounts',bg:'#dbeafe',color:'#1d4ed8'},
    {val:'310',label:'Parent Accounts',bg:'#dcfce7',color:'#15803d'},
    {val:'2',label:'Admins',bg:'#f3e8ff',color:'#7c3aed'},
  ])+divider('User Accounts')+
  table(['User','Role','Email','Last Login','Action'],[
    ['Mr. Kweku Owusu','Staff','utol.staff@utolschools.edu.gh','Today',btn('Manage','pnl-btn-navy',"showToast('User account opened.','info')")],
    ['Mrs. Amara Mensah','Parent','amara.p@gmail.com','Yesterday',btn('Manage','pnl-btn-navy',"showToast('User account opened.','info')")],
    ['Chisom Eze','Student','—','Today',btn('Manage','pnl-btn-navy',"showToast('User account opened.','info')")],
    ['Admin User','Admin','utol.admin@utolschools.edu.gh','Today',btn('Manage','pnl-btn-navy',"showToast('User account opened.','info')")],
  ])+divider('Create Account')+
  field('Full Name','text','Enter name')+
  selectField('Role',['Student','Parent','Staff','Admin'])+
  field('Email','email','user@email.com')+
  row([btn('Create Account','pnl-btn-green',"showToast('Account created. Credentials sent via email.','success')")])
},

/* ── Settings ── */
'settings': { title:'&#9881;&#65039; School Settings',
  html: card(
    '<div style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:1rem;margin-bottom:14px;">School Information</div>'+
    field('School Name','text','','UTOL Schools')+
    field('Principal','text','','Mrs. Akosua Okonkwo')+
    field('Email','email','','admin@utolschools.edu.gh')+
    field('Phone','tel','','+233 30 123 4567')+
    row([btn('Save Changes','pnl-btn-green',"showToast('School information updated.','success')")])
  ,'#f0f4ff')+
  card(
    '<div style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:1rem;margin-bottom:14px;">Academic Settings</div>'+
    selectField('Current Term',['Term 1','Term 2','Term 3'],'Term 2')+
    selectField('Academic Year',['2024/2025','2025/2026'],'2024/2025')+
    field('Term Start Date','date','','')+
    field('Term End Date','date','','')+
    row([btn('Update','pnl-btn-green',"showToast('Academic settings updated.','success')")])
  ,'#f0f4ff')
},

/* ── Audit Log ── */
'audit-log': { title:'&#128274; Audit Log',
  html: stats([
    {val:'1,284',label:'Events Today',bg:'#e8eaf6',color:'var(--navy)'},
    {val:'18',label:'Login Events',bg:'#dbeafe',color:'#1d4ed8'},
    {val:'3',label:'Failed Logins',bg:'#fee2e2',color:'#dc2626'},
    {val:'47',label:'Data Changes',bg:'#fef9c3',color:'#a07800'},
  ])+divider('Recent Activity')+
  table(['Time','User','Action','IP Address'],[
    ['08:14 AM','Admin','Login successful','192.168.1.1'],
    ['08:20 AM','Mr. Owusu','Viewed student records','192.168.1.22'],
    ['08:35 AM','Mrs. Addo','Updated grades – P5B','192.168.1.31'],
    ['09:02 AM','Admin','Created user account','192.168.1.1'],
    ['09:15 AM','Unknown','Failed login attempt','41.66.12.88'],
    ['09:22 AM','Admin','Approved leave request','192.168.1.1'],
    ['10:01 AM','Mr. Mensah','Submitted attendance','192.168.1.45'],
  ])+row([btn('Export Log','pnl-btn-navy',"showToast('Audit log exported.','success')"),btn('Clear Old Logs','pnl-btn-red',"showToast('Logs older than 90 days cleared.','success')")])
},

};})(window._h);
