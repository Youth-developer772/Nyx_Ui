import OrderIcon from "@mui/icons-material/DensityMedium";
import "../classCss/classOrder.css";
import { classOrdertable, headerdata } from "../DataExport";
import SearchIcon from "@mui/icons-material/SearchSharp";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetClassOrder } from "../ClassApi";
import { useEffect, useState } from "react";
function ClassOrder() {
  const [text, settext] = useState("");
  const [filtered, setfiltered] = useState(null);

  const navigate = useNavigate();

  const { GetOrder, ClassOrders } = useGetClassOrder();

  useEffect(() => {
    GetOrder();
  }, []);

  console.log(ClassOrders);

  useEffect(() => {
    let result = ClassOrders.data;
    if (Array.isArray(result) && result.length > 0) {
      result = result.filter((item) => {
        return (
          item?.payment_method?.toLowerCase().includes(text.toLowerCase()) ||
          item?.Total?.toString().includes(text.toLowerCase())
        );
      });
    }
    setfiltered(result);
  }, [text, ClassOrders.data]);

  const textchange = (e) => {
    settext(e.target.value);
  };

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
            <input
              type="search"
              placeholder="Search Order No..."
              onChange={textchange}
            />
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
                <th>Amount</th>
                <th>Payment</th>
                <th>Payment Proof</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filtered) ? (
                filtered.length > 0 ? (
                  filtered.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.reciept_no}</td>
                        <td>{item.Total} ks</td>
                        <td>{item.payment_method}</td>
                        <td className="imgrowmain">
                          <div className="imgrow">
                            <img src={item.payment_image} />
                          </div>
                        </td>
                        <td className="classordertdbtn">
                          <button>View</button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      no result found...
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Outlet context={{ GetOrder: GetOrder }} />
    </div>
  );
}
export default ClassOrder;
