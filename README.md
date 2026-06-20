# School Management Dashboard

A complete, responsive school management system built with HTML, CSS, and JavaScript.

## Features

✅ **Student Management**
- Add, edit, and delete students
- Filter students by class and name
- View complete student information
- Roll number auto-generation

✅ **Teacher Management**
- Add, edit, and delete teachers
- Filter teachers by department
- Display teacher cards with contact information
- Manage multiple departments (Mathematics, Science, English, History)

✅ **Attendance Tracking**
- Mark attendance for students
- Filter attendance by date and class
- Track attendance status (Present, Absent, Leave)
- Edit attendance records

✅ **Notice Board**
- Post announcements and notices
- Categorize notices (Academic, Event, Holiday, General)
- Search notices
- Color-coded by category

✅ **Dashboard**
- Real-time statistics
- Recent attendance records
- Latest notices display
- Quick overview of the system

✅ **Responsive Design**
- Mobile-friendly interface
- Tablet optimization
- Desktop support
- Hamburger menu for mobile navigation
- Adaptive layout

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Local Storage (Browser)
- **Icons**: Font Awesome 6.4
- **Responsive Framework**: Custom CSS Grid & Flexbox

## Folder Structure

```
school-management-dashboard/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styling and responsive design
├── js/
│   ├── data.js            # Data management and storage
│   ├── app.js             # Main application logic
│   └── ui.js              # UI utilities and enhancements
└── README.md              # This file
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or dependencies required

### Installation

1. Clone or download the repository
2. Open `index.html` in your web browser
3. The dashboard will load with sample data

## Usage

### Managing Students
1. Click on "Students" in the sidebar
2. Click "Add Student" to create a new student
3. Fill in the student details and click "Save"
4. Use search and filters to find students
5. Edit or delete students using the action buttons

### Managing Teachers
1. Click on "Teachers" in the sidebar
2. Click "Add Teacher" to create a new teacher
3. Select the department and fill in details
4. Filter teachers by department or search by name
5. Manage teacher records

### Marking Attendance
1. Click on "Attendance" in the sidebar
2. Click "Mark Attendance"
3. Select a student and date
4. Mark status (Present, Absent, Leave)
5. Filter attendance by date and class

### Posting Notices
1. Click on "Notices" in the sidebar
2. Click "Post Notice"
3. Enter title, content, and select category
4. Search notices using keywords
5. View all posted notices

### Dashboard
- View quick statistics
- See recent attendance
- Read latest notices
- Get a complete overview

## Data Persistence

All data is stored in the browser's Local Storage. This means:
- Data persists when you refresh the page
- Data is cleared when browser cache is cleared
- Data is isolated per browser/device
- No server required

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## Features Breakdown

### Database Operations
- ✅ Create (Add)
- ✅ Read (View/List)
- ✅ Update (Edit)
- ✅ Delete
- ✅ Search
- ✅ Filter

### UI/UX
- ✅ Sidebar Navigation
- ✅ Modal Forms
- ✅ Responsive Tables
- ✅ Card Layouts
- ✅ Search functionality
- ✅ Filter controls
- ✅ Status badges
- ✅ Action buttons

### Mobile Features
- ✅ Hamburger menu
- ✅ Touch-friendly buttons
- ✅ Responsive grid
- ✅ Optimized forms
- ✅ Mobile navigation

## Color Scheme

- **Primary Blue**: #1976d2
- **Secondary Purple**: #7b1fa2
- **Success Green**: #388e3c
- **Danger Red**: #d32f2f
- **Warning Orange**: #f57c00
- **Light Background**: #f5f7fa

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

- [ ] Backend integration
- [ ] User authentication
- [ ] Report generation (PDF)
- [ ] Email notifications
- [ ] Class timetable
- [ ] Fee management
- [ ] Exam marks tracking
- [ ] Parent portal
- [ ] Mobile app

## Troubleshooting

### Data not persisting?
- Clear browser cache and try again
- Check if Local Storage is enabled
- Try a different browser

### Responsive layout not working?
- Refresh the page
- Check browser width
- Clear browser cache

### Modal not opening?
- Ensure JavaScript is enabled
- Check browser console for errors
- Try clearing cache

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository.

## Author

Created with ❤️ for school management systems

---

**Happy Managing! 🎓**