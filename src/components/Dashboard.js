// Dashboard.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Modal, ListGroup ,Row , Col , Form } from 'react-bootstrap';
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase';

// main function
const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowDetails = (course) => {
    setSelectedCourse(course);
  };

  const handleClose = () => {
    setSelectedCourse(null);
  };

  // search facility
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const q = collection(db,"courses");
        const coursesCollection = await getDocs(q);
        
        const coursesData = coursesCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses from Firestore: ', error);
      }
    };
    fetchCourses();
  }, []);

  //search functionality 
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1>Course Dashboard</h1>

      {/* input search tab  */}
      <Form.Group controlId="searchForm" style={{padding:'5%'}}>
        <Form.Control
          type="text"
          placeholder="Search by Course Name or Instructor"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>

      <Row>
      {filteredCourses.map((course) => (
        
          <Col>
            <Card style={{ width: '18rem'}}  className="mb-4">
            <Card key={course.id} style={{ width: '18rem'}} className="mb-4">
            <Card.Img variant="top" src={course.thumbnail} alt="Course Thumbnail" />
            <Card.Body>
              <Card.Title>{course.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{course.instructor}</Card.Subtitle>
              <Card.Text>{course.description}</Card.Text>
              <Button variant="info" onClick={() => handleShowDetails(course)}>
                View Details
              </Button>
            </Card.Body>
            </Card>
            </Card>
            </Col>
        ))}
        </Row>
      
      {selectedCourse && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCourse.name} Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Instructor: {selectedCourse.instructor}</p>
            <p>Description: {selectedCourse.description}</p>
            <p>Enrollment Status: {selectedCourse.enrollmentStatus}</p>
            <p>Duration: {selectedCourse.duration}</p>
            <p>Schedule: {selectedCourse.schedule}</p>
            <p>Location: {selectedCourse.location}</p>
            <h5>Prerequisites:</h5>
            <ul>
              {selectedCourse.prerequisites.map((prerequisite, index) => (
                <li key={index}>{prerequisite}</li>
              ))}
            </ul>

            <h5>Syllabus:</h5>
            <ListGroup>
              {selectedCourse.syllabus.map((item) => (
                <ListGroup.Item key={item.week}>{`${item.week}: ${item.topic} - ${item.content}`}</ListGroup.Item>
              ))}
            </ListGroup>

            <h5>Registered Students:</h5>
            <ListGroup>
              {selectedCourse.students.map((student) => (
                <ListGroup.Item key={student.id}>{`${student.name} (${student.email})`}</ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
export default Dashboard;
