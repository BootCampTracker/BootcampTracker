import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './ComparisonSalaryGraph.css';


// Salary graph component
function ComparisonSalaryGraph() {

  // bring in compare store which holds the data for our graphs
  const searchResults = useSelector(store => store.compare);


  // Set chartData initial state
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Year",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }]
  });

  useEffect(() => {
    // Declare empty array variables to hold data as we perform logic
    let oneYearSalaryArr = [];
    let twoYearSalaryArr = [];
    let threeYearSalaryArr = [];
    let fourYearSalaryArr = [];
    let fiveYearSalaryArr = [];

    // Loop through searchResults array and sort salaries into new arrays 
    // based on the number of days between graduation date and hire date so
    // that we have seperate arrays for salaries by year
    for (let i of searchResults) {
      const oneDay = 24 * 60 * 60 * 1000; // Assign the value of 1day in milliseconds
      const firstDate = new Date(i.graduation_date); // Set bootcamp graduation date variable
      const secondDate = new Date(i.date_hired); // Set job hire date variable

      // Calculate the difference (in days) between graduation date and
      // hire date and assign to variable
      const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

      // Based on the number of days (diffDays), sort job salaries into their 
      // respective arrays.  Each array represents 1yr, 2yr, etc since 
      // bootcamp graduation day
      if (diffDays <= 365) {
        oneYearSalaryArr.push(i.salary);
      }
      else if (diffDays <= 730 && diffDays > 365) {
        twoYearSalaryArr.push(i.salary);
      }
      else if (diffDays <= 1095 && diffDays > 730) {
        threeYearSalaryArr.push(i.salary);
      }
      else if (diffDays <= 1460 && diffDays > 1095) {
        fourYearSalaryArr.push(i.salary);
      }
      else if (diffDays <= 1825 && diffDays > 1460) {
        fiveYearSalaryArr.push(i.salary);
      }
    };

    // Compute the average salary for each array of salaries
    let initialValue = 0;
    const yearThreeSalarySum = Math.round(threeYearSalaryArr.reduce((accumulator, currentValue) =>
      accumulator + currentValue, initialValue) / threeYearSalaryArr.length);
    const yearOneSalarySum = Math.round(oneYearSalaryArr.reduce((accumulator, currentValue) =>
      accumulator + currentValue, initialValue) / oneYearSalaryArr.length);
    const yearTwoSalarySum = Math.round(twoYearSalaryArr.reduce((accumulator, currentValue) =>
      accumulator + currentValue, initialValue) / twoYearSalaryArr.length);
    const yearFourSalarySum = Math.round(fourYearSalaryArr.reduce((accumulator, currentValue) =>
      accumulator + currentValue, initialValue) / fourYearSalaryArr.length);
    const yearFiveSalarySum = Math.round(fiveYearSalaryArr.reduce((accumulator, currentValue) =>
      accumulator + currentValue, initialValue) / fiveYearSalaryArr.length);

    // After the above calculations are complete, pass data into finalData array 
    // which will be used to set chartData state variable
    const finalData = [
      {
        year: 0,
        avgSalaries: 0
      },
      {
        year: 1 + 'yr',
        avgSalaries: yearOneSalarySum
      },
      {
        year: 2 + 'yr',
        avgSalaries: yearTwoSalarySum
      },
      {
        year: 3 + 'yr',
        avgSalaries: yearThreeSalarySum
      },
      {
        year: 4 + 'yr',
        avgSalaries: yearFourSalarySum
      },
      {
        year: 5 + 'yr',
        avgSalaries: yearFiveSalarySum
      },
    ];

    // Set chartData state using our finalData array data
    setChartData({
      labels: finalData.map((data) => data.year),
      datasets: [
        {
          label: "Year",
          data: finalData.map((data) => data.avgSalaries),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0"
          ],
          borderColor: "gray",
          borderWidth: 2
        }]
    })

    // If the value of searchResults changes, run useEffect hook to recalculate
    // our new data
  }, [searchResults]);

  // Render to DOM
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center", margin: 0 }}>Average Salaries over Time</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Salaries over Time"
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
            },
            x: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

// Export graph component
export default ComparisonSalaryGraph;