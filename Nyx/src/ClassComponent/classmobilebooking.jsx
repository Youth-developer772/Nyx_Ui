import SearchIcon from "@mui/icons-material/SearchSharp";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import "../classCss/classbookinglist.css";
import { useGetClassBooking } from "../ClassApi";
import { useEffect, useState } from "react";
import Default from "../images/Vector.png";
function ClassMobileBooking() {
  const [text, settext] = useState("");
  const [filtered, setfiltered] = useState(null);

  const { GetMobileBooking, ClassMobileBookings } = useGetClassBooking();

  useEffect(() => {
    GetMobileBooking();
  }, []);
  console.log(ClassMobileBookings);

  useEffect(() => {
    let result = ClassMobileBookings?.data;
    if (Array.isArray(result) && result.length > 0) {
      if (text.trim() != "") {
        result = result.filter((item) => {
          return (
            item.venue_name.toLowerCase().includes(text.toLowerCase()) ||
            item.court_name.toLowerCase().includes(text.toLowerCase()) ||
            item.Customer.toLowerCase().includes(text.toLowerCase()) ||
            item.payment_method.toLowerCase().includes(text.toLowerCase())
          );
        });
      }
    }
    setfiltered(result);
  }, [text, ClassMobileBookings?.data]);

  let time = new Date("2026-05-17 08:45:32 PM");
  console.log(time.toLocaleTimeString());

  const changetext = (e) => {
    settext(e.target.value);
  };

  return (
    <div className="mbmain">
      <div className="mb1">
        <h2>Top Booking</h2>
        <div className="mb2">
          <input type="search" placeholder="Search..." onChange={changetext} />
          <SearchIcon sx={{ color: "white" }} />
        </div>
        <button>
          <SaveAltIcon sx={{ fontSize: "20px" }} />
          Export
        </button>
      </div>
      <div className="mb3">
        <table className="mb4">
          <thead>
            <tr>
              <th>
                Booking <br />
                No
              </th>
              <th>Customer</th>
              <th>
                Venue /<br /> Court
              </th>

              <th>Equipment</th>
              <th>Date</th>
              <th>Time</th>
              <th>
                Total <br /> amount
              </th>
              <th>Payment</th>
              <th>
                Payment <br /> Proof
              </th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filtered) ? (
              filtered.length > 0 ? (
                filtered.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>#{item.id.toString().padStart(4, "0")}</td>
                      <td>{item.Customer}</td>
                      <td>
                        {item.venue_name}/ <br />
                        {item.court_name}
                      </td>
                      <td className="specialrow">
                        {Array.isArray(item.items) && item.items.length > 0
                          ? item.items
                              .map((childitem, index) => {
                                return childitem.equipment
                                  ? childitem.equipment || "--------------"
                                  : "-----------------";
                              })
                              .join(", ")
                          : "--------------"}
                      </td>
                      <td>{item.date}</td>
                      <td>{new Date(item.create_at).toLocaleTimeString()}</td>
                      <td>{item.Total} ks</td>
                      <td>{item.payment_method}</td>
                      <td>
                        <div className="specialdiv">
                          <img src={item.payment_image_url || Default} />
                        </div>
                      </td>
                      <td>
                        <div className="specialdiv1">
                          <button>view</button>
                          <button>cancel</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} style={{ textAlign: "center" }}>
                    no result found..
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={10} style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ClassMobileBooking;
