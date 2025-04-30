import React, { useState, useEffect } from 'react';
import { getAllCourses } from '../../services/courseService';

const CourseDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = getAllCourses();
        
        setCourses(coursesData);
        setUser({
            username: 'student1',
            firstName: 'John',
            lastName: 'Doe'
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Course Dashboard</h1>
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user.firstName} {user.lastName}
              </span>
              <button 
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Course List</h2>
            <button 
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div 
                key={course.courseID} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="bg-purple-600 text-white p-4">
                  <h3 className="text-lg font-bold">{course.courseName}</h3>
                  <p className="text-sm opacity-90">
                    Meets: {new Date(course.meetingDates).toLocaleDateString()} at {course.meetingTime}
                  </p>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-700 mb-2">Upcoming Assignments</h4>
                  {course.assignments.length > 0 ? (
                    <ul className="space-y-3">
                      {course.assignments.map((assignment) => {
                        const daysUntilDue = calculateDaysUntilDue(assignment.dueDate);
                        let urgencyColor = "bg-green-100 text-green-800";
                        if (daysUntilDue <= 1) {
                          urgencyColor = "bg-red-100 text-red-800";
                        } else if (daysUntilDue <= 3) {
                          urgencyColor = "bg-yellow-100 text-yellow-800";
                        }

                        return (
                          <li key={assignment.assignmentID} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                            <span className="font-medium">{assignment.assignmentName}</span>
                            <span className={`text-xs px-2 py-1 rounded ${urgencyColor}`}>
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No upcoming assignments</p>
                  )}
                  <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end">
                    <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">To Do</h2>
          
          <div className="space-y-4">
            {courses.flatMap(course => 
              course.assignments.map(assignment => ({
                ...assignment,
                courseName: course.courseName,
                courseID: course.courseID
              }))
            ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map((assignment) => {
              const daysUntilDue = calculateDaysUntilDue(assignment.dueDate);
              let urgencyColor = "text-green-600";
              if (daysUntilDue <= 1) {
                urgencyColor = "text-red-600";
              } else if (daysUntilDue <= 3) {
                urgencyColor = "text-yellow-600";
              }
              
              return (
                <div key={`${assignment.courseID}-${assignment.assignmentID}`} className="flex items-center p-3 bg-gray-50 rounded">
                  <input type="checkbox" className="h-5 w-5 text-purple-600 rounded" />
                  <div className="ml-4 flex-grow">
                    <h4 className="font-medium">{assignment.assignmentName}</h4>
                    <p className="text-sm text-gray-600">{assignment.courseName}</p>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${urgencyColor}`}>
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">{assignment.dueTime}</div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6">
            <button className="flex items-center text-purple-600 hover:text-purple-800 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Assignment
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDashboard;