import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import "../classCss/ClassCustomer.css";

function ClassCustomer() {
  const customerData = [
    {
      id: 1,
      name: "Nann Myint Zu",
      address: "Mandalay",
      phone: "09 978523007",
      email: "nannmyint@gmail.com",
      remark: "-------",
    },
    {
      id: 2,
      name: "Kaung Khant Phyoe",
      address: "Yangon",
      phone: "09 268344570",
      email: "kaungkhant@gmail.com",
      remark: "Expensive",
    },
  ];

  return (
    <div className="ClassCustomer">
      {/* title */}
      <div className="customerTitle">
        <PersonIcon className="titleIcon" />
        <h1>Customers</h1>
      </div>

      {/* container */}
      <div className="customerContainer">
        {/* top */}
        <div className="customerHeader">
          <h2>Customer List</h2>

          <div className="customerHeaderRight">
            {/* search */}
            <div className="searchBox">
              <input type="search" placeholder="Search....." />
              <SearchIcon className="searchIcon" />
            </div>

            {/* export */}
            <button className="exportBtn">
              <SaveAltIcon />
              Export
            </button>
          </div>
        </div>

        {/* table */}
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Remark</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {customerData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.remark}</td>

                  <td>
                    <div className="actionBtns">
                      <button className="warningBtn">Warning</button>

                      <button className="deleteBtn">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* empty rows */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <tr key={item + "empty"}>
                  <td colSpan="7" className="emptyRow"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* footer */}
        <div className="tableFooter">
          <p>showing 1 to 10 of 244 customers</p>

          <div className="pagination">
            <button>{"<"}</button>
            <button className="activePage">1</button>
            <button>2</button>
            <button>3</button>
            <button>{">"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassCustomer;
