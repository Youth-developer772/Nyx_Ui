import CustomerLoading from "../Components/loadingcustomer";
import { useGetCategory } from "../Hooks/CustomHooks";
import BackIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import FoodIcon from "@mui/icons-material/LocalDiningRounded";
import "./addorder.css";
import { useContext, useEffect, useRef, useState } from "react";
import AddorderProduct from "../Components/addorderproudct";
import PaymentIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import RemoveIcon from "@mui/icons-material/RemoveShoppingCartRounded";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import toast, { Toaster } from "react-hot-toast";
import { createPortal } from "react-dom";
import { FunnelChart } from "recharts";
import { Context } from "../Hooks/context";
import { useNavigate } from "react-router-dom";
function AddOrder() {
  const [reciept, setreciept] = useState();
  const [amount, setamount] = useState(0);
  const [cart, setCart] = useState({});

  const [show, setshow] = useState(false);
  const [childdata, setchilddata] = useState([]);
  const [file, setfile] = useState(null);
  const [filetosend, setfiletosend] = useState(null);

  const imgref = useRef();
  const paymentref = useRef();
  const { Token } = useContext(Context);
  const { GetLocalOrders } = useGetCategory();

  const navigate = useNavigate();

  // function to  radom recepit number
  function randomNum() {
    let random = `${Math.trunc(Math.random() * 100)}${Date.now()}`;
    setreciept(random);
  }
  useEffect(() => {
    randomNum();
  }, [childdata]);

  useEffect(() => {
    if (childdata.length > 0) {
      let totalprice = childdata.reduce((total, item) => {
        let qty = cart[item.id] !== undefined ? cart[item.id] : 1;
        return total + item.price * qty;
      }, 0);
      setamount(totalprice);
    } else setamount(0);
  }, [childdata, cart]);

  const { Products } = useGetCategory();

  function updateQty(id, amount) {
    setCart((prev) => {
      let curqty = prev[id] || 1;
      let newqty = curqty + amount;

      if (newqty <= 0) {
        let newqty = { ...prev };
        delete newqty[id];
        return newqty;
      }
      return { ...prev, [id]: newqty };
    });
  }

  function remove_item(id) {
    let result = childdata.filter((item) => {
      return item.id != id;
    });
    setchilddata(result);
  }

  const handleFileChange = (event) => {
    const selected_file = event.target.files[0];
    setfiletosend(selected_file);
    if (selected_file) {
      const url = URL.createObjectURL(selected_file);
      setfile(url);
    }
  };

  //function to add order
  async function add_order() {
    let delta = childdata.map((item) => {
      let qty = cart[item.id] !== undefined ? cart[item.id] : 1;
      return { product_id: item.id, quantity: qty };
    });

    let formData = new FormData();

    if (filetosend) {
      formData.append("payment_image", filetosend);
    }

    formData.append("total_amount", amount);
    formData.append("payment_method", paymentref.current.value);
    formData.append("items", JSON.stringify(delta));
    console.log(Object.fromEntries(formData));

    try {
      const loading = toast.loading("Please Wait...");
      let response = await fetch(import.meta.env.VITE_ADD_ORDER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        body: formData,
      });
      if (response.ok) {
        await GetLocalOrders();
        toast.success("successfully Added", { id: loading });
      } else {
        toast.error("adding Failed", { id: loading });
      }
    } catch (err) {
      toast.error("Can not connetct with sever", { id: loading });
      console.log(err);
    }
  }

  return createPortal(
    <div className="addordermain">
      <Toaster />
      <div className="addordernav">
        <button
          style={{ border: "none", outline: "none", background: "initial" }}
          onClick={() => navigate("/posorder")}
        >
          <BackIcon sx={{ color: "white", margin: "7px" }} />
        </button>
      </div>
      <div className="addorderbody">
        <h3 className="addordertitle">Create New Order</h3>
        <div className="addorderbody1">
          <div className="addorderreciept">
            <p>Receipt No</p>
            <span>{reciept}</span>
          </div>
          <div className="addorderamount">
            <p>Total amount</p>
            <hr style={{ color: "black" }} />
            <h2 style={{ margin: "0", paddingTop: "0" }}>
              {amount} <label htmlFor="h2">ks</label>
            </h2>
          </div>
        </div>
        <div className="addorderbody2">
          <div className="addorderchoice">
            <span className="addorderchoiceheader">
              <p className="addorderchoiceheader1">
                <FoodIcon sx={{ color: "red", fontSize: "20px" }} />
                Order items
              </p>
              <p
                className="addorderchoiceheader2"
                onClick={() => setshow(true)}
              >
                {" "}
                + select items form product
              </p>
            </span>

            <div className="toorder">
              <div className="toorderheader">
                <p>Item Details</p>
                <p>Qty</p>
                <p>Price</p>
              </div>
              {childdata.length > 0 ? (
                childdata.map((item, index) => {
                  return (
                    <div className="toorderbody" key={index}>
                      <span className="toorderchild">
                        <div>
                          <img src={item.images} alt={item.productName} />
                        </div>
                        <p>{item.productName}</p>
                      </span>
                      <span className="toorderchild1">
                        <button onClick={() => updateQty(item.id, -1)}>
                          -
                        </button>
                        <p>{cart[item.id] || 1}</p>
                        <button onClick={() => updateQty(item.id, 1)}>+</button>
                      </span>
                      <p className="toorderchild2">
                        {item.price}
                        <button onClick={() => remove_item(item.id)}>
                          <RemoveIcon sx={{ fontSize: "20px" }} />
                        </button>
                      </p>
                    </div>
                  );
                })
              ) : (
                <p
                  style={{ width: "100%", textAlign: "center", padding: "1em" }}
                >
                  No Product Choose Yet...
                </p>
              )}
            </div>
          </div>

          <div className="orderprint">
            <div className="orderprint1">
              <p className="orderprintheader">
                <PaymentIcon sx={{ color: "red" }} />
                Payment Details
              </p>
              <div className="ssx">
                <label htmlFor="input">Payment Method</label>
                <select ref={paymentref}>
                  <option value="kpay">Kpay</option>
                  <option value="wavepay">Wave pay</option>
                </select>
              </div>
              <span className="paymentmain">
                <label style={{ padding: "5px" }}>Payment Details</label>
                <div className="paymentwarper">
                  <span>
                    <p>kpay name</p>
                    <p>adminname</p>
                  </span>
                  <span>
                    <p>kpay number</p>
                    <p>09661234444</p>
                  </span>
                </div>
              </span>
              <div
                className="addorderreceipet"
                onClick={() => imgref.current.click()}
              >
                {file ? (
                  <img src={file} alt="paymentrecepit" className="receipet" />
                ) : (
                  <>
                    <UploadFileIcon />
                    <p>
                      Click to Upload <br />
                      receipet
                    </p>
                  </>
                )}
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={imgref}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <span className="addorderbtn">
              <button>cancel</button>
              <button
                style={{ background: "#0D1B2A", color: "white" }}
                onClick={add_order}
              >
                Create
              </button>
            </span>
          </div>
        </div>
      </div>
      {show && (
        <AddorderProduct
          data={{ fun1: setchilddata, fun2: setshow, amount: amount }}
        />
      )}
    </div>,
    document.body,
  );
}
export default AddOrder;
