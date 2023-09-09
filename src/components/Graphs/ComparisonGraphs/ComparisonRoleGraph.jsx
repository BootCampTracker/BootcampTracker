import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


// Roles over time graph component
function ComparisonRoleGraph() {

    // Bring in compare store which holds the data for our graph
    const searchResults = useSelector(store => store.compare);

    // Declare a variable to hold our user count for computing roles over time
    let userCount = 0;

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

    // Function that creates a set object of user_ids. Set objects only keep one 
    // copy of each value put in. We can then use the size method to obtain the 
    // number of unique users
    function countUniqueUsers(array) {
        return userCount = new Set(array).size;
    }

    // Hook that runs when searchResults variable changes
    useEffect(() => {

        // 
        let rolesInFirstYear = 0;
        let rolesInSecondYear = 0;
        let rolesInThirdYear = 0;
        let rolesInFourthYear = 0;
        let rolesInFifthYear = 0;

        // Holds all user_id's returned in searchResults
        let userIdArray = [];

        // Loop through searchResults array and count roles per year 
        // based on the number of days between graduation date and hire date
        // so that we have seperate counts for roles by year
        for (let i of searchResults) {
            const oneDay = 24 * 60 * 60 * 1000; // Total milliseconds in a day
            const firstDate = new Date(i.graduation_date); // Set graduation date variable
            const secondDate = new Date(i.date_hired); // Set hire date variable

            // Calculate the difference (in days) between graduation date and
            // hire date and assign to variable
            const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

            // Push all user_id's into userIdArray
            userIdArray.push(i.user_id);

            // Count the number of roles per year and assign to variables
            if (diffDays <= 365) {
                rolesInFirstYear += 1;
            }
            else if (diffDays <= 730 && diffDays > 365) {
                rolesInSecondYear += 1;
            }
            else if (diffDays <= 1095 && diffDays > 730) {
                rolesInThirdYear += 1;
            }
            else if (diffDays <= 1460 && diffDays > 1095) {
                rolesInFourthYear += 1;
            }
            else if (diffDays <= 1825 && diffDays > 1460) {
                rolesInFifthYear += 1;
            }
        };

        console.log('roles by years (3):', rolesInFirstYear, rolesInSecondYear, rolesInThirdYear);


        // Compute number of unique users in searchResults to use when 
        // calculating roles over time, returns a number assigned to userCount
        // variable
        countUniqueUsers(userIdArray);


        console.log('usersArray is:', userIdArray);
        console.log('userCount is:', userCount);


        // Calculate the average number of roles per year
        const yearOneRoleAvg = rolesInFirstYear / userCount;
        const yearTwoRoleAvg = (rolesInFirstYear + rolesInSecondYear) / userCount;
        const yearThreeRoleAvg = (rolesInFirstYear + rolesInSecondYear + rolesInThirdYear) / userCount;
        const yearFourRoleAvg = (rolesInFirstYear + rolesInSecondYear + rolesInThirdYear + rolesInFourthYear) / userCount;
        const yearFiveRoleAvg = (rolesInFirstYear + rolesInSecondYear + rolesInThirdYear + rolesInFourthYear + rolesInFifthYear) / userCount;

        console.log('Avg roles by year (3):', yearOneRoleAvg, yearTwoRoleAvg, yearThreeRoleAvg);


        // Declare finalData array to send to chartData state variable
        const finalData = [
            // First object is used to set graph origin point at zero
            {
                year: 0,
                avgRoleCount: 0
            },
            {
                year: 1 + 'yr',
                avgRoleCount: yearOneRoleAvg
            },
            {
                year: 2 + 'yr',
                avgRoleCount: yearTwoRoleAvg
            },
            {
                year: 3 + 'yr',
                avgRoleCount: yearThreeRoleAvg
            },
            {
                year: 4 + 'yr',
                avgRoleCount: yearFourRoleAvg
            },
            {
                year: 5 + 'yr',
                avgRoleCount: yearFiveRoleAvg
            },
        ];

        setChartData({
            labels: finalData.map((data) => data.year),
            datasets: [
                {
                    label: "Year",
                    data: finalData.map((data) => data.avgRoleCount),
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