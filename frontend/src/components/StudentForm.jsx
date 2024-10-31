import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .typeError("Age must be a number")
    .min(1, "Age must be at least 1"),
  course: yup.string().required("Course is required"),
  contact: yup
    .string()
    .required("Contact information is required")
    .min(10, "Contact must be at least 10 characters"),
});

const courses = [
  "Mathematics",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
  "Engineering",
  "Literature",
];

const StudentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    try {
      await axios.post("http://localhost:5000/api/students", data);
      setMessage("Registeration successful!");
      reset();
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-form">
      <h2>Register as a Student</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-item">
          <label>Full Name:</label>
          <input type="text" {...register("name")} placeholder="Full Name" />
          {errors.name && <div className="error">{errors.name.message}</div>}
        </div>
        <div className="form-item">
          <label>Age:</label>
          <input type="number" {...register("age")} placeholder="Age" />
          {errors.age && <div className="error">{errors.age.message}</div>}
        </div>
        <div className="form-item">
          <label>Course:</label>
          {/* <input type="text" {...register("course")} placeholder="Course" /> */}
          <select {...register("course")}>
            <option value="">Select a course</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
          {errors.course && (
            <div className="error">{errors.course.message}</div>
          )}
        </div>
        <div className="form-item">
          <label>Contact:</label>
          <input type="text" {...register("contact")} placeholder="Contact" />
          {errors.contact && (
            <div className="error">{errors.contact.message}</div>
          )}
        </div>
        <button type="submit" disabled={loading} className="button">
          {loading ? <ClipLoader color="#ffffff" size={20} /> : "Register"}
        </button>
      </form>
      {message && <div className="success">{message}</div>}
      <Link to="/students" className="link">
        See Registered Student List
      </Link>
    </div>
  );
};

export default StudentForm;
