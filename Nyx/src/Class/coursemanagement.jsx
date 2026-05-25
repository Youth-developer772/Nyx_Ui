import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import { Outlet, useNavigate } from "react-router-dom";

function CourseManagement() {
  const navigate = useNavigate();
  return (
    <div>
      <Outlet />
      <div className="Course-header">
        <div className="course-title">
          <MenuIcon className="menu-icon" />

          <h1>Course Management</h1>
        </div>

        <div className="add-course">
          <button onClick={() => navigate("classcoursemanagementnewcourt1")}>
            <AddIcon className="add-course-icon" />
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
}
export default CourseManagement;
