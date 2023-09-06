import { Bar } from "react-chartjs-2";
import { useState } from "react";
import { useSelector } from "react-redux";
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js/auto';
import './ComparisonSalaryGraph.css';

Chart.register(CategoryScale);


function ComparisonSalaryGraph() {

  // bring in compare store which holds the data for our graphs
  // const [ data, setData ] = useState([]);
  // const searchResults = useSelector(store => store.compare);


//   const [chartData, setChartData] = useState({
//     labels: data.map((data) => data.salary),
//     datasets: [
//       {
//         label: "Users Gained ",
//         data: data.map((data) => data.userGain),
//         backgroundColor: [
//           "rgba(75,192,192,1)",
//           "#ecf0f1",
//           "#50AF95",
//           "#f3ba2f",
//           "#2a71d0"
//         ],
//         borderColor: "blue",
//         borderWidth: 2
//       }
//     ]
//   });

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Salary over Time</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Salaries over Time"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};

export default ComparisonSalaryGraph;