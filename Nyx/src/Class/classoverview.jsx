import BoltIcon from "@mui/icons-material/Bolt";
import { NavLink, Outlet } from "react-router-dom";
import "../classCss/classoverview.css";
function ClassOverview() {
  return (
    <div className="comain">
      <div className="coswitch">
        <h2 className="coheader">
          <BoltIcon sx={{ fontSize: "30px" }} /> Service Overviews
        </h2>
        <div className="coshwitchbtn">
          <NavLink to="classtrainingoverview">Training</NavLink>
          <NavLink to="classrentaloverview">Rental</NavLink>
          <NavLink to="classcanteenoverview">Canteen</NavLink>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
export default ClassOverview;
