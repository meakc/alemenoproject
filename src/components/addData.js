// import './App.css';
import { useEffect } from 'react';
import { collection , addDoc } from 'firebase/firestore';
import image from './2.png';
import image1 from './8.png';
import db from '../firebase';

const AppData = () => {
  const courseData = [
    {
      id: 1,
      name: 'Test Course',
      instructor: 'hilly',
      description: 'Learn the basics of React Native development and build your first mobile app.',
      enrollmentStatus: 'Open',
      duration: '8 weeks',
      thumbnail: image,
      schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
      location: 'Online',
      prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
      syllabus: [
        {
          week: 1,
          topic: 'Introduction to React Native',
          content: 'Overview of React Native, setting up your development environment.',
        },
        {
          week: 2,
          topic: 'Building Your First App',
          content: 'Creating a simple mobile app using React Native components.',
        },
        // Additional weeks and topics...
      ],
      students: [
        { id: 101, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 102, name: 'Bob Smith', email: 'bob@example.com' },
        // Additional enrolled students...
      ],
    },
    {
      id: 2,
      name: 'Course2',
      instructor: 'john',
      description: 'Learn the basics of React Native development and build your first mobile app.',
      enrollmentStatus: 'Open',
      duration: '8 weeks',
      thumbnail: image1,
      schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
      location: 'Online',
      prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
      syllabus: [
        {
          week: 1,
          topic: 'Introduction to React Native',
          content: 'Overview of React Native, setting up your development environment.',
        },
        {
          week: 2,
          topic: 'Building Your First App',
          content: 'Creating a simple mobile app using React Native components.',
        },
        // Additional weeks and topics...
      ],
      students: [
        { id: 101, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 102, name: 'Bob Smith', email: 'bob@example.com' },
      ],
    },
    // Add more courses as needed...
  ];

  useEffect(() => {
    const addCoursesToFirestore = async () => {
      try {
        // Loop through the course data and add each course to Firestore
        for (const course of courseData) {
          await addDoc(collection(db, "courses"), course);
        }
        console.log('Course data added to Firestore successfully');
      } catch (error) {
        console.error('Error adding course data to Firestore: ', error);
      }
    };

    // Call the function to add courses to Firestore
    addCoursesToFirestore();
  },);
};

export default AppData;