import { useContext, useRef, useState } from "react";
import "./addpaymentpopup.css";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useSecurityCheck } from "../Hooks/SecurityCheck";
import { Context } from "../Hooks/context";
import toast, { Toaster } from "react-hot-toast";

function AddPaymentPopUp({ data, updfun, FTS }) {
  const [file, setfile] = useState(null);
  const [filepath, setfilepath] = useState(null);

  const { Token } = useContext(Context);
  const { ReturnJsx, openbox } = useSecurityCheck();

  const imgref = useRef();
  const paymentnameref = useRef();
  const adminnameref = useRef();
  const phoneref = useRef();

  //fun for previewimg
  function show_img(event) {
    let name = event.target.files[0];
    setfile(name);

    if (name) {
      let url = URL.createObjectURL(name);
      setfilepath(url);
    }
  }
  function ADDPAYMENT(e) {
    e.preventDefault();
    if (!file) return null;
    FTS(add_payment, data);
    data(false);
  }
  async function add_payment() {
    let formData = new FormData();
    formData.append("payment_image", file);
    formData.append("payment_method", paymentnameref.current.value);
    formData.append("payment_name", adminnameref.current.value);
    formData.append("payment_number", phoneref.current.value);
    const loading = toast.loading("Please wait");
    try {
      let response = await fetch(import.meta.env.VITE_ADD_PAYMENT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        body: formData,
      });
      if (response.ok) {
        await updfun();
        toast.success("successfully Added", { id: loading });
      } else {
        toast.error("something went wrong", { id: loading });
      }
    } catch (err) {
      console.log(err);
      toast.error("Cannot connect with sever", { id: loading });
    }
  }

  return (
    <div className="addpaymentmain">
      <form className="addpaymentwarper" onSubmit={ADDPAYMENT}>
        <div className="ap1">
          <h3>Payment Method Details</h3>
          <button onClick={() => data(false)} type="button">
            <CloseIcon />
          </button>
        </div>
        <div className="ap2">
          <p>Payment name</p>
          <input type="text" required ref={paymentnameref} />
        </div>
        <div className="ap2">
          <p>Admin Name</p>
          <input type="text" required ref={adminnameref} />
        </div>
        <div className="ap2">
          <p>Admin Phone</p>
          <input type="tel" required ref={phoneref} />
        </div>
        <div className="ap5">
          <p>Payment Image Upload</p>
          <div onClick={() => imgref.current.click()}>
            <input
              type="file"
              className="hiddenfile"
              onChange={show_img}
              required
              ref={imgref}
            />
            {file ? (
              <img src={filepath} />
            ) : (
              <>
                <UploadFileIcon />
                <p>Photo</p>
              </>
            )}
          </div>
        </div>
        <div className="ap6">
          <button type="button" onClick={() => data(false)}>
            cancel
          </button>
          <button style={{ background: "#1b263b", color: "white" }}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddPaymentPopUp;
