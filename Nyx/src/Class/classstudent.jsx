import { useEffect, useState } from "react";
import "../classCss/classAddStudent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";

function ClassStudent() {
  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [courseDetail, setCourseDetail] = useState(null);

  const [form, setForm] = useState({
    id: null,
    name: "",
    gender: "",
    age: "",
    phone: "",
    email: "",
    courseName: "",
    trainingLevel: "",
    timeSlot: "",
    trainingDay: "",
  });

  // ================= FORM CHANGE =================
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ================= FETCH STUDENTS =================
  async function fetchStudents() {
    try {
      const res = await fetch(
        "http://38.60.216.25:5000/api/coursestudent/showtrainingstudentall",
      );

      const data = await res.json();

      setStudents(data?.data?.[0]?.students ?? []);
    } catch (err) {
      console.log(err);
      setStudents([]);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  // ================= COURSE DETAIL API =================
  async function fetchCourseDetail(id) {
    try {
      const res = await fetch(
        `http://38.60.216.25:5000/api/course/showtraining/${id}`,
      );

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      setCourseDetail(data?.data);
    } catch (err) {
      console.log(err);
    }
  }

  // ================= COURSE CHANGE =================
  function handleCourseChange(e) {
    const id = e.target.value;

    setForm({
      ...form,
      courseName: id,
      trainingLevel: "",
      timeSlot: "",
      trainingDay: "",
    });

    fetchCourseDetail(id);
  }

  // ================= FETCH COURSES =================
  async function fetchCourses() {
    try {
      const res = await fetch(
        "http://38.60.216.25:5000/api/course/showtraining",
      );
      const data = await res.json();
      setCourses(data?.data ?? []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  // ================== Filter ===================== //
  const filteredStudents = students.filter((s) => {
    // course filter
    const matchCourse = category
      ? String(s.training_program_id) === String(category)
      : true;

    // global search (ALL fields)
    const keyword = search.toLowerCase();

    const matchSearch =
      s.name?.toLowerCase().includes(keyword) ||
      s.email?.toLowerCase().includes(keyword) ||
      s.phone?.includes(keyword) ||
      s.gender?.toLowerCase().includes(keyword) ||
      String(s.age).includes(keyword) ||
      String(s.training_program_id).includes(keyword);

    return matchCourse && matchSearch;
  });

  // =========================== Loading =============================== //
  async function fetchStudents() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "http://38.60.216.25:5000/api/coursestudent/showtrainingstudentall",
      );

      const data = await res.json();

      setStudents(data?.data?.[0]?.students ?? []);
    } catch (err) {
      console.log(err);
      setError("Connection Error");
    } finally {
      setLoading(false);
    }
  }

  // ================= CREATE =================
  async function createStudent() {
    const {
      name,
      gender,
      age,
      phone,
      email,
      courseName,
      trainingLevel,
      timeSlot,
      trainingDay,
    } = form;

    if (
      !name ||
      !gender ||
      !age ||
      !phone ||
      !email ||
      !courseName ||
      !trainingLevel ||
      !timeSlot ||
      !trainingDay
    ) {
      setMessage("Please fill all fields");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      const res = await fetch(
        "http://38.60.216.25:5000/api/coursestudent/addtrainingstudent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            gender,
            age: Number(age),
            phone,
            email,
            training_program_id: Number(courseName),
            training_level_id: Number(trainingLevel),
            time_slot: Number(timeSlot),
            training_day_id: Number(trainingDay),
          }),
        },
      );

      if (!res.ok) throw new Error("Create failed");

      setMessage("Student Added Successfully");

      fetchStudents();
      setShow(false);

      setForm({
        id: null,
        name: "",
        gender: "",
        age: "",
        phone: "",
        email: "",
        courseName: "",
        trainingLevel: "",
        timeSlot: "",
        trainingDay: "",
      });

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.log(err);
    }
  }

  // ==================== Delete ======================= //
  async function deleteStudent(id) {
    const ok = window.confirm("Delete this students?");
    if (!ok) return;

    await fetch(
      `http://38.60.216.25:5000/api/course/deletetrainingstudent/${id}`,
      {
        method: "DELETE",
      },
    );
    fetchStudents();
  }

  // ================= EDIT =================
  function handleEdit(s) {
    setForm({
      id: s.id,
      name: s.name || "",
      gender: s.gender || "",
      age: s.age || "",
      phone: s.phone || "",
      email: s.email || "",
      courseName: s.training_program_id || "",
      trainingLevel: s.training_level_id || "",
      timeSlot: s.time_slot || "",
      trainingDay: s.training_day_id || "",
    });

    setShow(true);
  }

  // ============= Cancel ================= //
  function handleCancel() {
    setShow(false);
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* HEADER */}
      <div className="studenttitle">
        <div className="studentheader">
          <PersonIcon />
          <h3>Students</h3>
        </div>

        <div className="addstudentbtn">
          <button onClick={() => setShow(true)} className="cs">
            <AddIcon /> Add Student
          </button>
        </div>
      </div>

      {/* POPUP */}
      {show && (
        <div className="popup">
          <div className="popup-box">
            <h2>{form.id ? "Add New Student" : "Add New Student"}</h2>

            {message && <div className="alert-message">{message}</div>}

            {/* NAME */}
            <div className="form-group">
              <label>Name:</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>

            {/* GENDER */}
            <div className="form-group">
              <label>Gender</label>
              <div className="gender-box">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === "male"}
                    onChange={handleChange}
                  />
                  Male
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === "female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
            </div>

            {/* AGE */}
            <div className="form-group">
              <label>Age</label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                placeholder="Age"
              />
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            {/* COURSE */}
            <div className="form-group">
              <label>Course Name</label>
              <select
                name="courseName"
                value={form.courseName}
                onChange={handleCourseChange}
              >
                <option value="">Choose Course</option>
                <option value="1">Badminton</option>
                <option value="2">Futsal</option>
                <option value="3">Tennis</option>
              </select>
            </div>

            {/* LEVEL */}
            <div className="form-group">
              <label>Training Level</label>
              <select
                name="trainingLevel"
                value={form.trainingLevel}
                onChange={handleChange}
              >
                <option value="">Choose Level</option>
                {courseDetail?.levels?.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* TIME */}
            <div className="form-group">
              <label>Time Slot</label>
              <select
                name="timeSlot"
                value={form.timeSlot}
                onChange={handleChange}
              >
                <option value="">Choose Time</option>
                {courseDetail?.time_slots?.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.slot}
                  </option>
                ))}
              </select>
            </div>

            {/* DAY */}
            <div className="form-group">
              <label>Training Day</label>
              <select
                name="trainingDay"
                value={form.trainingDay}
                onChange={handleChange}
              >
                <option value="">Choose Day</option>
                {courseDetail?.days?.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.day}
                  </option>
                ))}
              </select>
            </div>

            {/* BUTTON */}

            <div className="button-group">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button
                onClick={form.id ? () => {} : createStudent}
                className="create-btn"
              >
                {form.id ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="student-wrapper">
        <div className="student-top">
          <div className="filter-btn">
            {courses.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={category === c.id ? "active" : ""}
              >
                {c.course_name}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Search everything..."
            className="student-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                <th>Email</th>
                <th>CourseName</th>
                <th>TrainingLevel</th>
                <th>TrainingDay</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">
                    <div className="loading-container">
                      <div className="spinner"></div>
                      <p>Loading...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6">❌ Network Error / Server Down</td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6">📭 No Student Found</td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.gender}</td>
                    <td>{s.age}</td>
                    <td>{s.phone}</td>
                    <td>{s.email}</td>
                    <td>
                      <button onClick={() => handleEdit(s)}>
                        <VisibilityIcon />
                      </button>

                      <button onClick={() => deleteStudent(s.id)}>
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClassStudent;
