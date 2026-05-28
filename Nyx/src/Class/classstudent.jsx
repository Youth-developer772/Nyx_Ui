import { useState } from "react";
import "../classCss/ClassAddStudent.css";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

function ClassStudent() {
  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("Badminton");

  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    phone: "",
    emergencyPhone: "",
    email: "",
    courseName: "",
    trainingLevel: "",
    timeSlot: "",
  });

  const [message, setMessage] = useState("");

  // ================= FORM CHANGE =================
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // ================= CREATE STUDENT =================
  function createStudent() {
    if (
      !form.name ||
      !form.gender ||
      !form.age ||
      !form.phone ||
      !form.emergencyPhone ||
      !form.email ||
      !form.courseName ||
      !form.trainingLevel ||
      !form.timeSlot
    ) {
      setMessage(" Please fill all field");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    const newStudent = {
      id: Date.now(),
      ...form,
    };

    setStudents([...students, newStudent]);

    setMessage("✅ Student Added Successfully");

    setTimeout(() => {
      setMessage("");
      setShow(false);
    }, 5000);

    setShow(false);

    setForm({
      name: "",
      gender: "",
      age: "",
      phone: "",
      emergencyPhone: "",
      email: "",
      courseName: "",
      trainingLevel: "",
      timeSlot: "",
    });
  }

  // =========== Cancel ======= //
  function handleCancel() {
    setShow(false);
  }

  return (
    <div style={{ padding: "20px" }}>
      <div className="studenttitle">
        <div className="studentheader">
          <PersonIcon />
          <h3>Students</h3>
        </div>
        <div className="addstudentbtn">
          <AddIcon />
          {/* BUTTON */}
          <button onClick={() => setShow(true)} className="cs">
            Add Student
          </button>
        </div>
      </div>

      {/* ================= POPUP ================= */}
      {show && (
        <div className="popup">
          <div className="popup-box">
            <h2>Add New Student</h2>
            {message && <div className="alert-message">{message}</div>}

            {/* Name */}
            <div className="form-group">
              <label>Name :</label>

              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <div className="form-group">
              <label>Gender :</label>

              <div className="gender-box">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                  />
                  Male
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
            </div>

            {/* Age */}
            <div className="form-group">
              <label>Age :</label>

              <input
                type="number"
                name="age"
                placeholder="Enter Age"
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label>Phone Number :</label>

              <input
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                onChange={handleChange}
              />
            </div>

            {/* Emergency */}
            <div className="form-group">
              <label>Emergency Number :</label>

              <input
                type="text"
                name="emergencyPhone"
                placeholder="Enter Emergency Number"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email :</label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
              />
            </div>

            {/* Course */}
            <div className="form-group">
              <label>Course Name :</label>

              <select name="courseName" onChange={handleChange}>
                <option value="">Choose Course Selection</option>
                <option>Badminton</option>
                <option>Futsal</option>
                <option>Tennis</option>
              </select>
            </div>

            {/* Training */}
            <div className="form-group">
              <label>Training Level :</label>

              <select name="trainingLevel" onChange={handleChange}>
                <option value="">Choose Training Level</option>
                <option>Basic</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Time */}
            <div className="form-group">
              <label>Time Slots :</label>

              <select name="timeSlot" onChange={handleChange}>
                <option value="">Choose Time Slots</option>
                <option>9 AM - 11 AM</option>
                <option>1 PM - 3 PM</option>
                <option>6 PM - 8 PM</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="button-group">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>

              <button className="create-btn" onClick={createStudent}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className="student-wrapper">
        <div className="student-top">
          <div className="filter-btn">
            <button
              onClick={() => setCategory("Badminton")}
              className={category === "Badminton" ? "active" : "'"}
            >
              Badminton
            </button>
            <button
              onClick={() => setCategory("Futsal")}
              className={category === "Futsal" ? "active" : "'"}
            >
              Futsal
            </button>
            <button
              onClick={() => setCategory("Tennis")}
              className={category === "Tennis" ? "active" : "'"}
            >
              Tennis
            </button>
          </div>
          <input
            type="search"
            placeholder="Enter search"
            className="student-search"
          />
        </div>
        <div className="student-table-wrapper">
          <table border="1" width="100%" className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Emergency</th>
                <th>Email</th>
                <th>Course</th>
                <th>Level</th>
                <th>Time Slot</th>
              </tr>
            </thead>

            <tbody>
              {students
                .filter((s) => s.courseName === category)
                .map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.gender}</td>
                    <td>{s.age}</td>
                    <td>{s.phone}</td>
                    <td>{s.emergencyPhone}</td>
                    <td>{s.email}</td>
                    <td>{s.courseName}</td>
                    <td>{s.trainingLevel}</td>
                    <td>{s.timeSlot}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClassStudent;
