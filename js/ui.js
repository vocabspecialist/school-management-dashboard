// UI Enhancement and Additional Utilities

// Modal Form Reset on Open
document.addEventListener('click', function(e) {
    if (e.target.id === 'addStudentBtn') {
        document.getElementById('studentModalTitle').textContent = 'Add Student';
        document.getElementById('studentForm').reset();
    }
    if (e.target.id === 'addTeacherBtn') {
        document.getElementById('teacherModalTitle').textContent = 'Add Teacher';
        document.getElementById('teacherForm').reset();
    }
});

// Keyboard shortcut to close modal (ESC key)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Add Animation to Stats
window.addEventListener('load', () => {
    animateStats();
});

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(num => {
        num.style.animation = 'fadeIn 0.5s ease';
    });
}

// Add fade-in animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .data-table tbody tr {
        animation: fadeIn 0.3s ease;
    }
`;
document.head.appendChild(style);

// Print functionality for reports
function printReport(reportType) {
    const printWindow = window.open('', '', 'height=600,width=800');
    let content = `<h1>${reportType} Report</h1>`;
    
    if (reportType === 'Students') {
        const students = StorageManager.getStudents();
        content += '<table border="1" style="width:100%; border-collapse: collapse;">';
        content += '<tr><th>Roll No</th><th>Name</th><th>Class</th><th>Email</th><th>Phone</th></tr>';
        students.forEach(s => {
            content += `<tr><td>${s.rollNo}</td><td>${s.name}</td><td>${s.class}</td><td>${s.email}</td><td>${s.phone}</td></tr>`;
        });
        content += '</table>';
    } else if (reportType === 'Teachers') {
        const teachers = StorageManager.getTeachers();
        content += '<table border="1" style="width:100%; border-collapse: collapse;">';
        content += '<tr><th>Name</th><th>Department</th><th>Email</th><th>Phone</th></tr>';
        teachers.forEach(t => {
            content += `<tr><td>${t.name}</td><td>${t.department}</td><td>${t.email}</td><td>${t.phone}</td></tr>`;
        });
        content += '</table>';
    }
    
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
}

// Local notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Export data to CSV
function exportToCSV(data, filename) {
    let csv = '';
    
    if (data.length === 0) return;
    
    // Get headers
    const headers = Object.keys(data[0]);
    csv += headers.join(',') + '\n';
    
    // Get data
    data.forEach(row => {
        csv += headers.map(header => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',') + '\n';
    });
    
    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Real-time search with debouncing
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Initialize debounced search
const debouncedStudentSearch = debounce(filterStudents, 300);
const debouncedTeacherSearch = debounce(filterTeachers, 300);
const debouncedNoticeSearch = debounce(filterNotices, 300);

// Replace event listeners with debounced versions
if (document.getElementById('studentSearch')) {
    document.getElementById('studentSearch').removeEventListener('input', filterStudents);
    document.getElementById('studentSearch').addEventListener('input', debouncedStudentSearch);
}

if (document.getElementById('teacherSearch')) {
    document.getElementById('teacherSearch').removeEventListener('input', filterTeachers);
    document.getElementById('teacherSearch').addEventListener('input', debouncedTeacherSearch);
}

if (document.getElementById('noticeSearch')) {
    document.getElementById('noticeSearch').removeEventListener('input', filterNotices);
    document.getElementById('noticeSearch').addEventListener('input', debouncedNoticeSearch);
}

// Timestamp formatting utility
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Validation utilities
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
}

// Session management
const SessionManager = {
    saveSession: (key, data) => {
        sessionStorage.setItem(key, JSON.stringify(data));
    },
    getSession: (key) => {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    clearSession: (key) => {
        sessionStorage.removeItem(key);
    }
};

// Dark mode toggle (optional enhancement)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}