import { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students");
        setStudents(res.data);
      } catch (err) {
        setError("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="student-list">
      <div className="top">
        <h2>Registered Students</h2>
        <Link to="/" className="link">
          back to registeration
        </Link>
      </div>
      {loading ? (
        <div className="loading">
          <ClipLoader color="#000000" size={50} />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Age</th>
              <th>Course</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
                <td>{student.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
