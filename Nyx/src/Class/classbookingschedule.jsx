// // import CustomerLoading from "../Components/loadingcustomer";
// // import BackIcon from "@mui/icons-material/ArrowCircleLeftRounded";
// // import FoodIcon from "@mui/icons-material/LocalDiningRounded";
// import "../classCss/classbookingschedule.css";
// import { useContext, useEffect, useRef, useState } from "react";
// import AddorderProduct from "../Components/addorderproudct";
// import PaymentIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import RemoveIcon from "@mui/icons-material/RemoveShoppingCartRounded";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import toast, { Toaster } from "react-hot-toast";
// import { createPortal } from "react-dom";
// import { Context } from "../Hooks/context";
// import { useNavigate } from "react-router-dom";
// import { useReceipt } from "../Components/Receipt";
// import { useGetOrder, useGetPayment } from "../Api_Call";
// import StadiumIcon from "@mui/icons-material/StadiumOutlined";
// import { useGetClassVenue } from "../ClassApi";
// import { useNoti } from "../Hooks/alert";
import BookingIcon from "@mui/icons-material/EventAvailable";
import LockIcon from "@mui/icons-material/LockOutlineRounded";
import "../classCss/classbookingschedule.css";
import { useGetClassVenue } from "../ClassApi";
import { useEffect, useState } from "react";
import { useNoti } from "../Hooks/alert";
import Defaultimg from "../images/defaultimg.png";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import { useGetClassBookingSchedule } from "../ClassApi/classbookingscheduleapi";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import { Outlet, useNavigate } from "react-router-dom";
import ClassCreateBooking from "../ClassComponent/classcreatenewbook";

function BookingSchedule() {
  const [active, setactive] = useState();

  const navigate = useNavigate();

  const { GetVenue, Venue, Courts, GetCourts } = useGetClassVenue();
  const { GetRemainBooking, remainbooking } = useGetClassBookingSchedule();
  const { Loading, openloading, openerror, opensuccess, close } = useNoti();

  //for side show
  const [show, setshow] = useState(false);
  const [info, setinfo] = useState(null);
  const [mix_data, setmix_data] = useState(null);

  //for date picker
  const [date, setdate] = useState(new Date());

  //for create booking
  const [showCreate, setshowCreate] = useState(false);

  useEffect(() => {
    GetVenue();
  }, []);

  useEffect(() => {
    if (!info) return console.log("return lite p");
    let datetosend = format_change(date);
    GetRemainBooking(info?.id, datetosend);
  }, [date]);

  useEffect(() => {
    console.log("data change lo a lote lote");
    if (!info) return console.log("first return");
    if (Array.isArray(info.time_slots) && info.time_slots.length > 0) {
      if (Array.isArray(remainbooking.data) && remainbooking.data.length > 0) {
        let updateremain = remainbooking.data.map((item, index) => {
          return { ...item, available: true };
        });
        console.log(updateremain);
        const filterd = info.time_slots.filter(
          (obj2) => !remainbooking.data.some((obj1) => obj1.id === obj2.id),
        );
        let updateremain1 = filterd.map((item, index) => {
          return { ...item, available: false };
        });
        const result = [...updateremain, ...updateremain1];
        setmix_data(result);
        console.log(result);
      } else {
        console.log("third return");
        setmix_data([]);
      }
    } else {
      console.log("second return");
      setmix_data([]);
    }
  }, [info, remainbooking.data, date]);

  useEffect(() => {
    if (Venue?.data?.length > 0 && !active) {
      console.log(Venue.data[0].id);
      setactive(Venue.data[0].id);
    }
  }, [Venue.data]);
  console.log(info);

  async function changecourt(id) {
    if (!id) return;
    openloading();
    await Promise.all([
      GetCourts(id),
      new Promise((reslove) => setTimeout(reslove, 300)),
    ]);
    setactive(id);
    close();
  }

  //show side bar
  async function show_sidebar(item) {
    setshow(true);
    console.log(item);
    setinfo(item);
    let datetosend = format_change(date);
    await GetRemainBooking(item.id, datetosend);
  }

  //function to change date format
  function format_change(date) {
    let a = date.toLocaleDateString();
    let dateformatting = new Date(a);
    const year = dateformatting.getFullYear();
    const month = dateformatting.getMonth() + 1;
    const day = dateformatting.getDate();
    let formattedDate = `${year}-${month}-${day}`;
    console.log("last one", formattedDate);
    return formattedDate;
  }

  //functions for date picker
  const format_date = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const lastday = () => {
    const prev = new Date(date);
    prev.setDate(prev.getDate() - 1);
    setdate(prev);
  };

  const nextday = () => {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    setdate(next);
  };

  //add booking
  function add_new_booking() {
    setshowCreate(true);
  }

  return (
    <div className="cbsmain">
      {showCreate && <ClassCreateBooking />}
      {Loading}
      <header className="cbsheader">
        <BookingIcon />
        <h2>Booking Schedule</h2>
      </header>
      <main className="cbslayout">
        <div className="cbsbody1">
          <div className="cbstitle">
            {Array.isArray(Venue.data) ? (
              Venue.data.length > 0 ? (
                Venue.data.map((item, index) => {
                  return (
                    <h3
                      key={index}
                      onClick={() => {
                        changecourt(item.id);
                      }}
                      className={item.id == active ? "activevenue" : ""}
                    >
                      {item.venue_name}
                    </h3>
                  );
                })
              ) : (
                <h3>no venue</h3>
              )
            ) : (
              <h3>Loading...</h3>
            )}
          </div>
          <hr style={{ margin: "10px 1px" }} />
          <div className="cbsbody">
            {Array.isArray(Courts.data) ? (
              Courts.data.length > 0 ? (
                Courts.data.map((item, index) => {
                  return (
                    <div
                      className="cbscontent"
                      key={index}
                      onClick={() => show_sidebar(item)}
                    >
                      <span className="cbscontenttext">
                        <h4>COURT {item.id}</h4>
                        <p>AVAILABLE</p>
                      </span>
                      <div className="cbscontentimg">
                        {Array.isArray(item.gallery) &&
                        item.gallery.length > 0 ? (
                          <img
                            src={item.gallery[0].court_image_url}
                            alt="court image"
                          />
                        ) : (
                          <img src={Defaultimg} />
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No data</p>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        {show && (
          <aside className="cbsside">
            <span className="cbssideheader">
              <h3>Court {info?.id} Schedule</h3>
              <button>
                <CloseIcon sx={{ fontSize: "20px" }} />
              </button>
            </span>
            <div className="datepicker">
              <button onClick={lastday} className="dpbtn">
                <ArrowBackIcon sx={{ fontSize: 14 }} />
              </button>
              <div className="dpdiv">
                {isToday(date) && <span className="dbtoday">TODAY</span>}
                <h4 className="dbtoday2">{format_date(date)}</h4>
              </div>
              <button onClick={nextday} className="dpbtn">
                <ArrowForwardIcon sx={{ fontSize: 14 }} />
              </button>
            </div>
            <div className="cbssidebody">
              {Array.isArray(mix_data) ? (
                mix_data.length > 0 ? (
                  mix_data.map((item, index) => {
                    return (
                      <span
                        key={index}
                        className={
                          item.available == true ? "ordernow" : "unorder"
                        }
                      >
                        <h4>
                          {item.start_time.slice(0, 5)} -{" "}
                          {item.end_time.slice(0, 5)}
                        </h4>
                        {item.available ? (
                          <button
                            className="ordernowbtn"
                            onClick={add_new_booking}
                          >
                            BOOK NOW
                          </button>
                        ) : (
                          <button className="lock">
                            <LockIcon
                              sx={{ fontSize: "20px", color: "#E30613" }}
                            />
                          </button>
                        )}
                      </span>
                    );
                  })
                ) : (
                  <span className="ordernow">
                    <h4>no data</h4>
                  </span>
                )
              ) : (
                <span className="ordernow">
                  <h4>Loading...</h4>
                </span>
              )}
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
export default BookingSchedule;
