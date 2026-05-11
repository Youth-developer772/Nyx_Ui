import "../classCss/classmenu.css";
import MenuIcon from "@mui/icons-material/Inventory2Outlined";
import { orderheadingdata } from "../DataExport";
function ClassMenu() {
  return (
    <div className="classmenumain">
      <h2 className="classmenuheader">
        <MenuIcon />
        Menus
      </h2>
      <div className="classmenuheading">
        {orderheadingdata.map((item, index) => {
          return (
            <div className="classorderheadchild" key={index}>
              <p>{item.title}</p>
              <span>
                {
                  <item.icon
                    className={`classorderheadchildicon classorderheadchild${index}`}
                  />
                }
                <h3>{item.amount}</h3>
              </span>
            </div>
          );
        })}
      </div>
      <div className="classorderbody">
        <div className="classorderbody1">
          <h3>All</h3>
          <h3>Snack</h3>
          <h3>Meal</h3>
          <h3>Drink</h3>
        </div>
        <button className="addmenubtn">+ Add Menu</button>
      </div>
    </div>
  );
}
export default ClassMenu;
