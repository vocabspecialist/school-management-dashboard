// Sample Data
const studentsData = [
    { id: 1, name: 'Aarav Singh', rollNo: 'S001', class: 'Class A', email: 'aarav@school.com', phone: '9876543210' },
    { id: 2, name: 'Priya Sharma', rollNo: 'S002', class: 'Class A', email: 'priya@school.com', phone: '9876543211' },
    { id: 3, name: 'Rahul Verma', rollNo: 'S003', class: 'Class B', email: 'rahul@school.com', phone: '9876543212' },
    { id: 4, name: 'Neha Patel', rollNo: 'S004', class: 'Class B', email: 'neha@school.com', phone: '9876543213' },
    { id: 5, name: 'Arjun Kumar', rollNo: 'S005', class: 'Class C', email: 'arjun@school.com', phone: '9876543214' },
    { id: 6, name: 'Ananya Singh', rollNo: 'S006', class: 'Class C', email: 'ananya@school.com', phone: '9876543215' },
    { id: 7, name: 'Vikram Desai', rollNo: 'S007', class: 'Class A', email: 'vikram@school.com', phone: '9876543216' },
    { id: 8, name: 'Sneha Gupta', rollNo: 'S008', class: 'Class B', email: 'sneha@school.com', phone: '9876543217' },
];

const teachersData = [
    { id: 1, name: 'Dr. Rajesh Kumar', department: 'Mathematics', email: 'rajesh@school.com', phone: '9876543220' },
    { id: 2, name: 'Ms. Priya Menon', department: 'Science', email: 'priya.menon@school.com', phone: '9876543221' },
    { id: 3, name: 'Mr. Arun Sharma', department: 'English', email: 'arun.sharma@school.com', phone: '9876543222' },
    { id: 4, name: 'Ms. Divya Nair', department: 'History', email: 'divya.nair@school.com', phone: '9876543223' },
    { id: 5, name: 'Mr. Suresh Iyer', department: 'Mathematics', email: 'suresh.iyer@school.com', phone: '9876543224' },
    { id: 6, name: 'Ms. Anjali Bhat', department: 'Science', email: 'anjali.bhat@school.com', phone: '9876543225' },
];

const attendanceData = [
    { id: 1, studentId: 1, studentName: 'Aarav Singh', class: 'Class A', date: '2024-01-15', status: 'Present' },
    { id: 2, studentId: 2, studentName: 'Priya Sharma', class: 'Class A', date: '2024-01-15', status: 'Present' },
    { id: 3, studentId: 3, studentName: 'Rahul Verma', class: 'Class B', date: '2024-01-15', status: 'Absent' },
    { id: 4, studentId: 4, studentName: 'Neha Patel', class: 'Class B', date: '2024-01-15', status: 'Leave' },
    { id: 5, studentId: 5, studentName: 'Arjun Kumar', class: 'Class C', date: '2024-01-15', status: 'Present' },
    { id: 6, studentId: 6, studentName: 'Ananya Singh', class: 'Class C', date: '2024-01-15', status: 'Present' },
];

const noticesData = [
    { id: 1, title: 'Annual School Fest', category: 'Event', content: 'Join us for the annual school festival on March 15, 2024. Various cultural programs and activities planned.', date: '2024-01-20' },
    { id: 2, title: 'Summer Vacation Notice', category: 'Holiday', content: 'School will remain closed from May 1 to June 15 for summer vacation. Online classes will resume on June 16.', date: '2024-01-18' },
    { id: 3, title: 'Mid-term Examination Schedule', category: 'Academic', content: 'Mid-term examinations will be conducted from February 5 to February 15, 2024. Detailed time table will be shared soon.', date: '2024-01-16' },
    { id: 4, title: 'New Lab Facilities', category: 'General', content: 'We are pleased to announce the opening of our new science laboratory with state-of-the-art equipment.', date: '2024-01-14' },
    { id: 5, title: 'Parent-Teacher Meeting', category: 'Academic', content: 'PTM will be held on January 25, 2024 from 3:00 PM to 5:00 PM. Please report to your child\'s class teacher.', date: '2024-01-12' },
    { id: 6, title: 'Sports Day', category: 'Event', content: 'Annual Sports Day will be held on February 20, 2024. All students are encouraged to participate in various events.', date: '2024-01-10' },
];

// LocalStorage Management
const StorageManager = {
    getStudents: () => JSON.parse(localStorage.getItem('students')) || studentsData,
    setStudents: (data) => localStorage.setItem('students', JSON.stringify(data)),
    
    getTeachers: () => JSON.parse(localStorage.getItem('teachers')) || teachersData,
    setTeachers: (data) => localStorage.setItem('teachers', JSON.stringify(data)),
    
    getAttendance: () => JSON.parse(localStorage.getItem('attendance')) || attendanceData,
    setAttendance: (data) => localStorage.setItem('attendance', JSON.stringify(data)),
    
    getNotices: () => JSON.parse(localStorage.getItem('notices')) || noticesData,
    setNotices: (data) => localStorage.setItem('notices', JSON.stringify(data)),
};

// Initialize localStorage with default data if empty
if (!localStorage.getItem('students')) {
    StorageManager.setStudents(studentsData);
}
if (!localStorage.getItem('teachers')) {
    StorageManager.setTeachers(teachersData);
}
if (!localStorage.getItem('attendance')) {
    StorageManager.setAttendance(attendanceData);
}
if (!localStorage.getItem('notices')) {
    StorageManager.setNotices(noticesData);
}