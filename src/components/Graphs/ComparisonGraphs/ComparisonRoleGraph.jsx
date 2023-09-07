import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


// Role graph component
function ComparisonRoleGraph() {

    // bring in compare store which holds the data for our graph
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
        let oneYearRoleArr = [];
        let twoYearRoleArr = [];
        let threeYearRoleArr = [];
        let fourYearRoleArr = [];
        let fiveYearRoleArr = [];

        // Loop through searchResults array and sort roles into new arrays 
        // based on the number of days between graduation date and hire date so
        // that we have seperate arrays for salaries by year
        for (let i of searchResults) {
            const oneDay = 24 * 60 * 60 * 1000; // in milliseconds
            const firstDate = new Date(i.graduation_date);
            const secondDate = new Date(i.date_hired);
            const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

            if (diffDays <= 365) {
                oneYearRoleArr.push(i.role);
            }
            else if (diffDays <= 730 && diffDays > 365) {
                twoYearRoleArr.push(i.role);
            }
            else if (diffDays <= 1095 && diffDays > 730) {
                threeYearRoleArr.push(i.role);
            }
            else if (diffDays <= 1460 && diffDays > 1095) {
                fourYearRoleArr.push(i.role);
            }
            else if (diffDays <= 1825 && diffDays > 1460) {
                fiveYearRoleArr.push(i.role);
            }
        };

        // Get the role average by year
        let initialValue = 0;
        const yearThreeRoleSum = Math.round(threeYearRoleArr.reduce((accumulator, currentValue) =>
            accumulator + currentValue, initialValue) / threeYearRoleArr.length);
        const yearOneRoleSum = Math.round(oneYearRoleArr.reduce((accumulator, currentValue) =>
            accumulator + currentValue, initialValue) / oneYearRoleArr.length);
        const yearTwoRoleSum = Math.round(twoYearRoleArr.reduce((accumulator, currentValue) =>
            accumulator + currentValue, initialValue) / twoYearRoleArr.length);
        const yearFourRoleSum = Math.round(fourYearRoleArr.reduce((accumulator, currentValue) =>
            accumulator + currentValue, initialValue) / fourYearRoleArr.length);
        const yearFiveRoleSum = Math.round(fiveYearRoleArr.reduce((accumulator, currentValue) =>
            accumulator + currentValue, initialValue) / fiveYearRoleArr.length);

        // Set data array to send to chartData
        const finalData = [
            {
                year: 0,
                avgSalaries: 0
            },
            {
                year: 1 + 'yr',
                avgSalaries: yearOneRoleSum
            },
            {
                year: 2 + 'yr',
                avgSalaries: yearTwoRoleSum
            },
            {
                year: 3 + 'yr',
                avgSalaries: yearThreeRoleSum
            },
            {
                year: 4 + 'yr',
                avgSalaries: yearFourRoleSum
            },
            {
                year: 5 + 'yr',
                avgSalaries: yearFiveRoleSum
            },
        ];

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

    }, [searchResults]);

    console.log('searchResults are:', searchResults)
    // 'Showing results for '
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center", margin: 0 }}>Average Roles over Time</h2>
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: false,
                            text: "Roles over Time"
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
                            // type: "time",
                            // time: {
                            //     unit: "year",
                            // }
                        },
                    },
                }}
            />
        </div>
    );
};

export default ComparisonRoleGraph;