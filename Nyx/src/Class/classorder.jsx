import SaveAltIcon from "@mui/icons-material/SaveAlt";
import SearchIcon from "@mui/icons-material/Search";
import "../classCss/classOrder.css";

function ClassOrder() {
  const orderData = [
    {
      id: "#0011",
      items: "Pizza, Burger, Coke",
      amount: "$25.00",
      payment: "Credit Card",
      paymentproof: "photo.jpg",
      action: "View",
    },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <button className="menu-btn">☰</button>
          <h1>Orders</h1>
        </div>

        <button className="add-order-btn">+ Add Order</button>
      </div>

      {/* Top Cards */}
      <div className="cards">
        <div className="card blue">
          <p>Total Order</p>
          <h2>1,200</h2>
          <span>Yesterday 1133</span>
        </div>

        <div className="card green">
          <p>Total Pending</p>
          <h2>95</h2>
          <span>Yesterday 83</span>
        </div>

        <div className="card purple">
          <p>Total Completed</p>
          <h2>983</h2>
          <span>Yesterday 895</span>
        </div>

        <div className="card pink">
          <p>Total Cancel</p>
          <h2>120</h2>
          <span>Yesterday 111</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="order-buttons">
        <button className="mobile-btn">Moblie Order</button>

        <button className="local-btn">Local Order</button>
      </div>

      {/* Table Section */}
      <div className="table-container">
        <div className="table-header">
          <h2>Top Orders</h2>

          <div className="table-actions">
            <div className="search-box">
              <input type="text" placeholder="Enter Order No...." />
              <SearchIcon />
            </div>

            <button className="export-btn">
              {" "}
              <SaveAltIcon />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <table>
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
            {orderData.map((item) => (
              <tr key={item.id}>
                <tr>{item.id}</tr>
                <td>{item.items}</td>
                <td>{item.amount}</td>
                <td>{item.payment}</td>
                <td>{item.paymentproof}</td>

                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassOrder;
