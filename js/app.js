// App State Management
let currentEditId = null;
let currentEditType = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    renderDashboard();
    setTodayDate();
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }

    // Modal Buttons
    document.getElementById('addStudentBtn')?.addEventListener('click', () => openModal('studentModal'));
    document.getElementById('addTeacherBtn')?.addEventListener('click', () => openModal('teacherModal'));
    document.getElementById('markAttendanceBtn')?.addEventListener('click', () => openModal('attendanceModal'));
    document.getElementById('addNoticeBtn')?.addEventListener('click', () => openModal('noticeModal'));

    // Forms
    document.getElementById('studentForm')?.addEventListener('submit', handleStudentSubmit);
    document.getElementById('teacherForm')?.addEventListener('submit', handleTeacherSubmit);
    document.getElementById('attendanceForm')?.addEventListener('submit', handleAttendanceSubmit);
    document.getElementById('noticeForm')?.addEventListener('submit', handleNoticeSubmit);

    // Modal Close Buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => closeModal(e.target.dataset.modal));
    });

    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Filter and Search
    document.getElementById('studentSearch')?.addEventListener('input', filterStudents);
    document.getElementById('classFilter')?.addEventListener('change', filterStudents);
    document.getElementById('teacherSearch')?.addEventListener('input', filterTeachers);
    document.getElementById('departmentFilter')?.addEventListener('change', filterTeachers);
    document.getElementById('noticeSearch')?.addEventListener('input', filterNotices);
    document.getElementById('attendanceDate')?.addEventListener('change', filterAttendance);
    document.getElementById('attendanceClassFilter')?.addEventListener('change', filterAttendance);
}

// Navigation Handler
function handleNavigation(e) {
    const tab = e.currentTarget.dataset.tab;
    if (!tab) return;

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    e.currentTarget.classList.add('active');

    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'students': 'Student Management',
        'teachers': 'Teacher Management',
        'attendance': 'Attendance Management',
        'notices': 'Notice Board'
    };
    document.getElementById('pageTitle').textContent = titles[tab];

    // Show tab
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tab)?.classList.add('active');

    // Close sidebar on mobile
    closeSidebar();

    // Render content
    if (tab === 'students') renderStudents();
    if (tab === 'teachers') renderTeachers();
    if (tab === 'attendance') renderAttendance();
    if (tab === 'notices') renderNotices();
    if (tab === 'dashboard') renderDashboard();
}

// Sidebar Toggle
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

function closeSidebar() {
    document.querySelector('.sidebar').classList.remove('active');
}

// Modal Management
function openModal(modalId, editId = null, editType = null) {
    document.getElementById(modalId).classList.add('active');
    currentEditId = editId;
    currentEditType = editType;

    if (editId && editType === 'student') {
        loadStudentForEdit(editId);
    } else if (editId && editType === 'teacher') {
        loadTeacherForEdit(editId);
    } else if (editId && editType === 'attendance') {
        loadAttendanceForEdit(editId);
    } else if (editId && editType === 'notice') {
        loadNoticeForEdit(editId);
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    currentEditId = null;
    currentEditType = null;
    
    // Reset forms
    document.getElementById('studentForm')?.reset();
    document.getElementById('teacherForm')?.reset();
    document.getElementById('attendanceForm')?.reset();
    document.getElementById('noticeForm')?.reset();
}

// Set today's date for attendance
function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('attendanceDate');
    if (dateInput) dateInput.value = today;
}

// Student Management
function renderStudents() {
    const students = StorageManager.getStudents();
    renderStudentTable(students);
    populateAttendanceStudents();
}

function renderStudentTable(students) {
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-small" onclick="openModal('studentModal', ${student.id}, 'student')">Edit</button>
                    <button class="btn btn-danger btn-small" onclick="deleteStudent(${student.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterStudents() {
    const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
    const classFilter = document.getElementById('classFilter').value;
    let students = StorageManager.getStudents();

    students = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm) || 
                            student.rollNo.includes(searchTerm);
        const matchesClass = !classFilter || student.class === classFilter;
        return matchesSearch && matchesClass;
    });

    renderStudentTable(students);
}

function handleStudentSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('studentName').value;
    const studentClass = document.getElementById('studentClass').value;
    const email = document.getElementById('studentEmail').value;
    const phone = document.getElementById('studentPhone').value;

    let students = StorageManager.getStudents();

    if (currentEditId) {
        // Edit existing
        const student = students.find(s => s.id === currentEditId);
        if (student) {
            student.name = name;
            student.class = studentClass;
            student.email = email;
            student.phone = phone;
        }
    } else {
        // Add new
        const newId = Math.max(...students.map(s => s.id), 0) + 1;
        const rollNo = 'S' + String(newId).padStart(3, '0');
        students.push({
            id: newId,
            name,
            rollNo,
            class: studentClass,
            email,
            phone
        });
    }

    StorageManager.setStudents(students);
    closeModal('studentModal');
    renderStudents();
}

function loadStudentForEdit(id) {
    const students = StorageManager.getStudents();
    const student = students.find(s => s.id === id);

    if (student) {
        document.getElementById('studentModalTitle').textContent = 'Edit Student';
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentClass').value = student.class;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('studentPhone').value = student.phone;
    }
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        let students = StorageManager.getStudents();
        students = students.filter(s => s.id !== id);
        StorageManager.setStudents(students);
        renderStudents();
    }
}

function populateAttendanceStudents() {
    const students = StorageManager.getStudents();
    const select = document.getElementById('attendanceStudent');
    if (select) {
        select.innerHTML = '<option value="">Select Student</option>';
        students.forEach(student => {
            const option = document.createElement('option');
            option.value = student.id;
            option.textContent = `${student.rollNo} - ${student.name}`;
            select.appendChild(option);
        });
    }
}

// Teacher Management
function renderTeachers() {
    const teachers = StorageManager.getTeachers();
    renderTeacherGrid(teachers);
}

function renderTeacherGrid(teachers) {
    const container = document.getElementById('teachersList');
    container.innerHTML = '';

    teachers.forEach(teacher => {
        const card = document.createElement('div');
        card.className = 'teacher-card';
        card.innerHTML = `
            <img src="https://via.placeholder.com/80" alt="${teacher.name}" class="teacher-avatar">
            <h3>${teacher.name}</h3>
            <p>${teacher.department}</p>
            <div class="teacher-info">
                <span><i class="fas fa-envelope"></i> ${teacher.email}</span>
                <span><i class="fas fa-phone"></i> ${teacher.phone}</span>
            </div>
            <div class="action-buttons" style="margin-top: 15px;">
                <button class="btn btn-primary btn-small" onclick="openModal('teacherModal', ${teacher.id}, 'teacher')">Edit</button>
                <button class="btn btn-danger btn-small" onclick="deleteTeacher(${teacher.id})">Delete</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterTeachers() {
    const searchTerm = document.getElementById('teacherSearch').value.toLowerCase();
    const departmentFilter = document.getElementById('departmentFilter').value;
    let teachers = StorageManager.getTeachers();

    teachers = teachers.filter(teacher => {
        const matchesSearch = teacher.name.toLowerCase().includes(searchTerm) || 
                            teacher.email.toLowerCase().includes(searchTerm);
        const matchesDept = !departmentFilter || teacher.department === departmentFilter;
        return matchesSearch && matchesDept;
    });

    renderTeacherGrid(teachers);
}

function handleTeacherSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('teacherName').value;
    const department = document.getElementById('teacherDepartment').value;
    const email = document.getElementById('teacherEmail').value;
    const phone = document.getElementById('teacherPhone').value;

    let teachers = StorageManager.getTeachers();

    if (currentEditId) {
        // Edit existing
        const teacher = teachers.find(t => t.id === currentEditId);
        if (teacher) {
            teacher.name = name;
            teacher.department = department;
            teacher.email = email;
            teacher.phone = phone;
        }
    } else {
        // Add new
        const newId = Math.max(...teachers.map(t => t.id), 0) + 1;
        teachers.push({
            id: newId,
            name,
            department,
            email,
            phone
        });
    }

    StorageManager.setTeachers(teachers);
    closeModal('teacherModal');
    renderTeachers();
}

function loadTeacherForEdit(id) {
    const teachers = StorageManager.getTeachers();
    const teacher = teachers.find(t => t.id === id);

    if (teacher) {
        document.getElementById('teacherModalTitle').textContent = 'Edit Teacher';
        document.getElementById('teacherName').value = teacher.name;
        document.getElementById('teacherDepartment').value = teacher.department;
        document.getElementById('teacherEmail').value = teacher.email;
        document.getElementById('teacherPhone').value = teacher.phone;
    }
}

function deleteTeacher(id) {
    if (confirm('Are you sure you want to delete this teacher?')) {
        let teachers = StorageManager.getTeachers();
        teachers = teachers.filter(t => t.id !== id);
        StorageManager.setTeachers(teachers);
        renderTeachers();
    }
}

// Attendance Management
function renderAttendance() {
    const today = document.getElementById('attendanceDate').value || new Date().toISOString().split('T')[0];
    const classFilter = document.getElementById('attendanceClassFilter').value;
    let attendance = StorageManager.getAttendance();

    attendance = attendance.filter(record => {
        const dateMatch = record.date === today;
        const classMatch = !classFilter || record.class === classFilter;
        return dateMatch && classMatch;
    });

    renderAttendanceTable(attendance);
}

function renderAttendanceTable(attendance) {
    const tbody = document.getElementById('attendanceTableBody');
    tbody.innerHTML = '';

    if (attendance.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No attendance records found</td></tr>';
        return;
    }

    attendance.forEach(record => {
        const statusClass = `status-${record.status.toLowerCase()}`;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.studentName.split(' ')[0]}</td>
            <td>${record.studentName}</td>
            <td>${record.class}</td>
            <td>${record.date}</td>
            <td><span class="status-badge ${statusClass}">${record.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-small" onclick="openModal('attendanceModal', ${record.id}, 'attendance')">Edit</button>
                    <button class="btn btn-danger btn-small" onclick="deleteAttendance(${record.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterAttendance() {
    renderAttendance();
}

function handleAttendanceSubmit(e) {
    e.preventDefault();

    const studentId = document.getElementById('attendanceStudent').value;
    const date = document.getElementById('attendanceDate2').value;
    const status = document.getElementById('attendanceStatus').value;

    if (!studentId) {
        alert('Please select a student');
        return;
    }

    const students = StorageManager.getStudents();
    const student = students.find(s => s.id == studentId);

    if (!student) {
        alert('Student not found');
        return;
    }

    let attendance = StorageManager.getAttendance();

    if (currentEditId) {
        // Edit existing
        const record = attendance.find(a => a.id === currentEditId);
        if (record) {
            record.status = status;
            record.date = date;
        }
    } else {
        // Add new
        const newId = Math.max(...attendance.map(a => a.id), 0) + 1;
        attendance.push({
            id: newId,
            studentId: student.id,
            studentName: student.name,
            class: student.class,
            date,
            status
        });
    }

    StorageManager.setAttendance(attendance);
    closeModal('attendanceModal');
    renderAttendance();
}

function loadAttendanceForEdit(id) {
    const attendance = StorageManager.getAttendance();
    const record = attendance.find(a => a.id === id);

    if (record) {
        document.getElementById('attendanceStudent').value = record.studentId;
        document.getElementById('attendanceDate2').value = record.date;
        document.getElementById('attendanceStatus').value = record.status;
    }
}

function deleteAttendance(id) {
    if (confirm('Are you sure you want to delete this attendance record?')) {
        let attendance = StorageManager.getAttendance();
        attendance = attendance.filter(a => a.id !== id);
        StorageManager.setAttendance(attendance);
        renderAttendance();
    }
}

// Notice Management
function renderNotices() {
    const notices = StorageManager.getNotices();
    renderNoticeGrid(notices);
}

function renderNoticeGrid(notices) {
    const container = document.getElementById('noticesList');
    container.innerHTML = '';

    notices.forEach(notice => {
        const card = document.createElement('div');
        card.className = `notice-card ${notice.category.toLowerCase()}`;
        
        const dateObj = new Date(notice.date);
        const formattedDate = dateObj.toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });

        card.innerHTML = `
            <div class="notice-header">
                <h3>${notice.title}</h3>
                <button class="btn btn-danger btn-small" onclick="deleteNotice(${notice.id})">Delete</button>
            </div>
            <span class="notice-category">${notice.category}</span>
            <p>${notice.content}</p>
            <div class="notice-date"><i class="fas fa-calendar"></i> ${formattedDate}</div>
        `;
        container.appendChild(card);
    });
}

function filterNotices() {
    const searchTerm = document.getElementById('noticeSearch').value.toLowerCase();
    let notices = StorageManager.getNotices();

    notices = notices.filter(notice => {
        return notice.title.toLowerCase().includes(searchTerm) || 
               notice.content.toLowerCase().includes(searchTerm) ||
               notice.category.toLowerCase().includes(searchTerm);
    });

    renderNoticeGrid(notices);
}

function handleNoticeSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('noticeTitle').value;
    const content = document.getElementById('noticeContent').value;
    const category = document.getElementById('noticeCategory').value;
    const date = new Date().toISOString().split('T')[0];

    let notices = StorageManager.getNotices();

    if (currentEditId) {
        // Edit existing
        const notice = notices.find(n => n.id === currentEditId);
        if (notice) {
            notice.title = title;
            notice.content = content;
            notice.category = category;
        }
    } else {
        // Add new
        const newId = Math.max(...notices.map(n => n.id), 0) + 1;
        notices.unshift({
            id: newId,
            title,
            content,
            category,
            date
        });
    }

    StorageManager.setNotices(notices);
    closeModal('noticeModal');
    renderNotices();
}

function loadNoticeForEdit(id) {
    const notices = StorageManager.getNotices();
    const notice = notices.find(n => n.id === id);

    if (notice) {
        document.getElementById('noticeTitle').value = notice.title;
        document.getElementById('noticeContent').value = notice.content;
        document.getElementById('noticeCategory').value = notice.category;
    }
}

function deleteNotice(id) {
    if (confirm('Are you sure you want to delete this notice?')) {
        let notices = StorageManager.getNotices();
        notices = notices.filter(n => n.id !== id);
        StorageManager.setNotices(notices);
        renderNotices();
    }
}

// Dashboard Rendering
function renderDashboard() {
    updateDashboardStats();
    displayRecentAttendance();
    displayLatestNotices();
}

function updateDashboardStats() {
    const students = StorageManager.getStudents();
    const teachers = StorageManager.getTeachers();
    const attendance = StorageManager.getAttendance();
    const notices = StorageManager.getNotices();
    const today = new Date().toISOString().split('T')[0];

    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalTeachers').textContent = teachers.length;

    const presentToday = attendance.filter(a => a.date === today && a.status === 'Present').length;
    document.getElementById('presentToday').textContent = presentToday;
    
    document.getElementById('totalNotices').textContent = notices.length;
}

function displayRecentAttendance() {
    const attendance = StorageManager.getAttendance();
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = attendance.filter(a => a.date === today).slice(0, 5);

    const container = document.getElementById('recentAttendance');
    container.innerHTML = '';

    if (todayAttendance.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light);">No attendance records for today</p>';
        return;
    }

    todayAttendance.forEach(record => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        const statusClass = `status-${record.status.toLowerCase()}`;
        item.innerHTML = `
            <strong>${record.studentName}</strong>
            <p>${record.class} - <span class="status-badge ${statusClass}">${record.status}</span></p>
        `;
        container.appendChild(item);
    });
}

function displayLatestNotices() {
    const notices = StorageManager.getNotices();
    const latestNotices = notices.slice(0, 3);

    const container = document.getElementById('latestNotices');
    container.innerHTML = '';

    latestNotices.forEach(notice => {
        const item = document.createElement('div');
        item.className = 'notice-item';
        const dateObj = new Date(notice.date);
        const formattedDate = dateObj.toLocaleDateString('en-IN', { 
            month: 'short', 
            day: 'numeric' 
        });
        item.innerHTML = `
            <strong>${notice.title}</strong>
            <p>${notice.content.substring(0, 60)}...</p>
            <small>${formattedDate}</small>
        `;
        container.appendChild(item);
    });
}