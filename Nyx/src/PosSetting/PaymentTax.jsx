import "../PosSettingCss/paymenttax.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../Hooks/context";
import AddCircle from "@mui/icons-material/AddCircleOutlineTwoTone";
import { useGetCategory } from "../Hooks/CustomHooks";
import { useSecurityCheck } from "../Hooks/SecurityCheck";
import AddPaymentPopUp from "../Components/addpaymentpopup";

function PosPaymentTax() {
  const [show, setshow] = useState(false);

  const { Payment, GetPayment } = useGetCategory();
  const { ReturnJsx, openbox } = useSecurityCheck();

  const { backcolor } = useContext(Context);
  const Font_Color = Boolean(backcolor == "#1A1C1E");
  const FontStyle = {
    color: Font_Color ? "white" : "#0D1B2A",
  };
  const InputStyle = {
    backgroundColor: backcolor ? "#FFFFFF" : "#0d1b2a21",
    color: backcolor ? "black" : "white",
  };

  return (
    <div
      className="pospaymentwarper"
      style={{ border: Font_Color && "1px solid white" }}
    >
      {ReturnJsx}
      <div className="pospaymentchild2">
        <div>
          <p style={FontStyle}>Tax Percentage( % )</p>
          <input type="text" value={5} readOnly style={InputStyle} />
        </div>
        <div>
          <p style={FontStyle}>Currency</p>
          <input type="text" value="MMK" readOnly style={InputStyle} />
        </div>
      </div>
      <h3 className="pospaymentmethod" style={FontStyle}>
        Payment Method
      </h3>
      <div className="pospaymentbody">
        {Array.isArray(Payment.result) && Payment.result.length > 0 ? (
          Payment.result.map((item, index) => {
            return (
              <div className="poscurrency" key={index}>
                <span className="poscurrecytext">
                  <p>{item.payment_method}</p>
                  <p>{item.payment_name}</p>
                  <p>{item.payment_number}</p>
                </span>
                <img src={item.payment_image_url} alt="paymentlogo" />
              </div>
            );
          })
        ) : (
          <div className="poscurrency">loading....</div>
        )}

        <div className="paymentaddbtn" onClick={() => setshow(true)}>
          <AddCircle style={{ width: "50px", height: "50px" }} />
          <p>Add Payment Method</p>
        </div>
      </div>
      {show && (
        <AddPaymentPopUp data={setshow} updfun={GetPayment} FTS={openbox} />
      )}
    </div>
  );
}
export default PosPaymentTax;
