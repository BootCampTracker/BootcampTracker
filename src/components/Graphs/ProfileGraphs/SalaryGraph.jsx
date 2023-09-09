// HOOKS
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
// Chart.js
import { Bar } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

const SalaryGraph = () => {
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
  // Chart.js
  const [chartData, setChartData] = useState({
    labels: profileData.map(data => data.date_hired),
    datasets: [
      {
        label: "Roles/Time ",
        data: profileData.map(data => data.salary),
        backgroundColor: [ "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0"
      ],
        borderColor: "blue",
        borderWidth: 2,
      },
    ],
  });
  // Load Profile data to use in the Graph
  useEffect(() => {
    // dispatch({ type: "FETCH_PROFILE_GRAPHS", payload: profileId });
  }, []);
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Chart Graph</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Salary Between time",
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

export default SalaryGraph;

