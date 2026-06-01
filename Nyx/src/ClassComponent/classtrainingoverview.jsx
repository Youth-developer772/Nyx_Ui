import "./classtrainingoverview.css";
import { classtrainingoverview } from "../DataExport";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import SearchIcon from "@mui/icons-material/SearchSharp";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useEffect } from "react";
import { useGetClassOverview } from "../ClassApi";

function ClassTrainingOverview() {
  const { training, GetTrainingOverview } = useGetClassOverview();

  let data = [
    { name: "Jan", sales: 3000 },
    { name: "Feb", sales: 4000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 6000 },
    { name: "May", sales: 7000 },
    { name: "Jun", sales: 8000 },
  ];

  useEffect(() => {
    GetTrainingOverview();
  }, []);

  console.log(training);

  return (
    <div className="ctomain">
      <div className="ctoheader">
        {classtrainingoverview.map((item, index) => {
          return (
            <div className="ctoheadercontent" key={index}>
              <div>
                {<item.icon />} <p>{item.rightside}</p>
              </div>
              <h3>{item.body}</h3>
              <span>
                <h4
                  style={{
                    fontFamily: "Work Sans",
                    fontWeight: 400,
                    color: "#0F172A",
                  }}
                >
                  {item.footer}
                </h4>
                <p>{item.footerright}</p>
              </span>
            </div>
          );
        })}
      </div>
      <div className="ctobody">
        <div className="ctobodyheader">
          <h2>Enrollment Trends</h2>
          <input
            type="date"
            className="ctodatesearch1"
            style={{ marginLeft: "auto" }}
          />
          <input type="date" className="ctodatesearch2" />
          <button>
            <SaveAltIcon sx={{ fontSize: "20px" }} />
            Export
          </button>
        </div>
        <div
          style={{
            minWidth: "100%",
            minHeight: "200px",
            width: "100%",
            height: "90%",
            marginTop: "10px",
            fontSize: "x-small",
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            minHeight="100%"
            minWidth="100%"
          >
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="0"
                vertical={false}
                stroke="#ccc"
              />
              <XAxis datakey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="red" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="ctofooter">
        <div className="ctobodyheader">
          <h2>Recent Training Payment</h2>
          <div className="ctofooterheadersearch">
            <input type="search" placeholder="Search..." />
            <SearchIcon sx={{ color: "white" }} />
          </div>
          <button>
            <SaveAltIcon sx={{ fontSize: "20px" }} />
            Export
          </button>
        </div>
        <div className="ctofooterdate">
          <input type="date" className="ctodatesearch1" />
          <input type="date" className="ctodatesearch2" />
        </div>
        <div className="ctofootertable">
          <table>
            <thead>
              <tr>
                <th>
                  student <br /> id
                </th>
                <th>
                  student <br /> name
                </th>
                <th>
                  training <br /> name
                </th>
                <th>class name</th>
                <th>amount</th>
                <th>date</th>
                <th>
                  payment <br /> method
                </th>
                <th>
                  payment <br /> proof
                </th>
                <th>action</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ClassTrainingOverview;
