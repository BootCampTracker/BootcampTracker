import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js/auto';
import './ComparisonSalaryGraph.css';

Chart.register(CategoryScale);


function ComparisonSalaryGraph() {
  // bring in compare store which holds the data for our graphs
  const searchResults = useSelector(store => store.compare);
  // const [chartData, setChartData] = useState({});
  const [finalData, setFinalData] = useState([]);
  const [ data1, setData1 ] = useState('');
  const [ data2, setData2 ] = useState('');

  console.log('searchResults is:', searchResults);

  // function objectCreator(num, year) {
  // }

  // let averageSalary;
  // function getAverageSalary(array) {
  //     let initialValue = 0;
  //     array.reduce((accumulator, currentValue) => 
  //     accumulator + currentValue, initialValue) / array.length;
  //     return averageSalary;
  // };

  useEffect(() => {
    // function handleComparisonData() {
    let oneYearSalaryArr = [];
    let twoYearSalaryArr = [];
    let threeYearSalaryArr = [];
    let fourYearSalaryArr = [];
    let fiveYearSalaryArr = [];

    // Loop through searchResults array and sort salaries into new arrays 
    // based on how many days between graduation date and hire date.
    for (let i of searchResults) {
      const oneDay = 24 * 60 * 60 * 1000; // in milliseconds
      const firstDate = new Date(i.graduation_date);
      const secondDate = new Date(i.date_hired);
      const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

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

    // Get the average for salaries by year
    let initialValue = 0;
    const yearThreeSalarySum = Math.round(threeYearSalaryArr.reduce((accumulator, currentValue) =>
      accumulator + currentValue, initialValue) / threeYearSalaryArr.length);
    const yearOneSalarySum = oneYearSalaryArr.reduce((accumulator, currentValue) =>
      accumulator + currentValue, initialValue) / oneYearSalaryArr.length;
    const yearTwoSalarySum = twoYearSalaryArr.reduce((accumulator, currentValue) =>
      accumulator + currentValue, initialValue) / twoYearSalaryArr.length;
    const yearFourSalarySum = Math.round(fourYearSalaryArr.reduce((accumulator, currentValue) =>
      accumulator + currentValue, initialValue) / fourYearSalaryArr.length);

    // Set data array to send to chartData
    setFinalData([
      {
        year: 1,
        avgSalaries: yearOneSalarySum
      },
      {
        year: 2,
        avgSalaries: yearTwoSalarySum
      },
      {
        year: 3,
        avgSalaries: yearThreeSalarySum
      }
    ]);

    let dataSet1 = finalData.map((data) => data.year);
    let dataSet2 = finalData.map((data) => data.avgSalaries);

    setData1(dataSet1);
    setData2(dataSet2);

  // const testArray = finalData.map((data) => data.year);
  // console.log('testArray is:', testArray);
  // console.log('finalData is:', finalData);
  // console.log('data1 is:', data1);


  // setChartData({
  //   // labels: data1,
  //   labels: data1,
  //   // labels: [ 1, 2, 3, 4, 5 ],
  //   datasets: [
  //     {
  //       label: "Year",
  //       data: data2,
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0"
  //       ],
  //       borderColor: "blue",
  //       borderWidth: 2
  //     }]
  // });


  }, [searchResults]);


  console.log('finalData is:', finalData);
  console.log('data1 is:', data1);
  console.log('finalData is:', finalData);

  // Set chartData state
  const [chartData, setChartData] = useState({
    // labels: data1,
    labels: finalData.map((data) => data.year),
    // labels: [ 1, 2, 3, 4, 5 ],
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
        borderColor: "blue",
        borderWidth: 2
      }]
  });

  console.log('chartData is:', chartData)


  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>Salary over Time</h2> */}
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
          },
          // scales: {
          //   y: {
          //     beginAtZero: true,
          //   },
          //   x: {
          //     type: "time",
          //     time: {
          //       unit: "year",
          //     },
          //   },
          // },
        }}
      />
    </div>
  );
};

export default ComparisonSalaryGraph;