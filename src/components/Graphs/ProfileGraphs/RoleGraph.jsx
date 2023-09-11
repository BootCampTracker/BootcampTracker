// HOOKS
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
// Chart.js
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

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
    labels: [],
    datasets: [
      {
        label: "Roles/Time ",
        data: [],
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

            // 
            let rolesInFirstYear = 0;
            let rolesInSecondYear = 0;
            let rolesInThirdYear = 0;
            let rolesInFourthYear = 0;
            let rolesInFifthYear = 0;
    
            // Loop through searchResults array and count roles per year 
            // based on the number of days between graduation date and hire date
            // so that we have seperate counts for roles by year
            for (let i of profileData) {
                const oneDay = 24 * 60 * 60 * 1000; // Total milliseconds in a day
                const firstDate = new Date(i.graduation_date); // Set graduation date variable
                const secondDate = new Date(i.date_hired); // Set hire date variable
    
                // Calculate the difference (in days) between graduation date and
                // hire date and assign to variable
                const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    
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
    
        // Calculate the average number of roles per year
        const yearOneRole = rolesInFirstYear;
        const yearTwoRole = (rolesInFirstYear + rolesInSecondYear);
        const yearThreeRole = (rolesInFirstYear + rolesInSecondYear + rolesInThirdYear);
        const yearFourRole = (rolesInFirstYear + rolesInSecondYear + rolesInThirdYear + rolesInFourthYear);
        const yearFiveRole = (rolesInFirstYear + rolesInSecondYear + rolesInThirdYear + rolesInFourthYear + rolesInFifthYear);




        // Declare finalData array to send to chartData state variable
        const finalData = [
            // First object is used to set graph origin point at zero
            {
                year: 0,
                roleCount: 0
            },
            {
                year: 1 + 'yr',
                roleCount: yearOneRole
            },
            {
                year: 2 + 'yr',
                roleCount: yearTwoRole
            },
            {
                year: 3 + 'yr',
                roleCount: yearThreeRole
            },
            {
                year: 4 + 'yr',
                roleCount: yearFourRole
            },
            {
                year: 5 + 'yr',
                roleCount: yearFiveRole
            },
        ];

    setChartData({
      labels: finalData.map((data) => data.year),
      datasets: [
          {
              label: "Year",
              data: finalData.map((data) => data.roleCount),
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

    // Update Graphs when profile information are changed
  }, [profileData]);


  return (
        <div>
            <h2 style={{ textAlign: "center", margin: 0 }}>Roles over Time</h2>
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
                        },
                    },
                }}
            />
        </div>
  );
};

export default RoleGraph;
