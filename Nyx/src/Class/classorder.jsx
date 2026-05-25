import OrderIcon from "@mui/icons-material/DensityMedium";
import "../classCss/classOrder.css";
import { classOrdertable, headerdata } from "../DataExport";
import SearchIcon from "@mui/icons-material/SearchSharp";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Outlet, useNavigate } from "react-router-dom";
function ClassOrder() {
  const navigate = useNavigate();

  return (
    <div className="classordermain">
      <div className="classorderbody1">
        <h2 className="classorderheader">
          <OrderIcon />
          Order
        </h2>
        <button onClick={() => navigate("classorderaddmenu")}>
          + Add Order
        </button>
      </div>
      <div className="classorderbody2">
        {headerdata.map((item, index) => {
          return (
            <div className="classorderdata" key={index}>
              <p>{item.header}</p>
              <h3 style={{ fontWeight: "500" }}>{item.body}</h3>
              <p>{item.footer}</p>
            </div>
          );
        })}
      </div>
      <div className="classorderbody3">
        <div className="classorderfooter1">
          <h2>Top Orders</h2>
          <div className="classordersearch">
            <input type="search" placeholder="Search Order No..." />
            <SearchIcon sx={{ color: "white" }} />
          </div>
          <button>
            <SaveAltIcon sx={{ color: "white", fontSize: "20px" }} />
            Export
          </button>
        </div>
        <div className="classorderfooter2">
          <table className="classordertable">
            <thead>
              <tr>
                <th>Order No</th>
                <th>Order Items</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Payment Proof</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classOrdertable.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>#{item.order_id}</td>
                    <td>{item.order_item}</td>
                    <td>{item.amount} ks</td>
                    <td>{item.payment}</td>
                    <td>{item.payment_proof}</td>
                    <td>
                      <p>view</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
export default ClassOrder;
