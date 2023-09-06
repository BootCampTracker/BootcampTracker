// HOOKS
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
// Chart.js
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
const RoleGraph = () => {
  //  ****** PSEUDO ****** //
  // [X] set up the params for Profile
  // [X] Load the 'FETCH_USER_GRAPH' in useEffect and pass the params
  // [X] Check Logs what are being passed in the 'FETCH_USER_GRAPH'
  // [X] Set up the graph and pass the data Example is in the Docs for Log Rocket
  // [X] Import the graph in the Profile Component

  // HOOKS
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const profileData = useSelector(state => state.profileGraphs);
  const user = useSelector(state => state.user);
  // Chart.js setting and Profile Data
  const [chartData, setChartData] = useState({
    labels: profileData.map(data => data.date_hired),
    datasets: [
      {
        label: "Roles/Time ",
        data: profileData.map(data => data.job_number),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "blue",
        borderWidth: 2,
      },
    ],
  });
  // Load Profile data and Graph
  useEffect(() => {
    setChartData({
      labels: profileData.map(data => data.date_hired),
      // Refractoring code
      datasets: [
        {
          ...chartData.datasets[0],
          data: profileData.map(data => data.job_number),
        },
      ],
    });
    // Update Graphs when profile information are changed
  }, [profileData]);
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Position over Time Graph</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Role Between time",
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
            x: {
              type: "time",
              time: {
                unit: "day",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default RoleGraph;
