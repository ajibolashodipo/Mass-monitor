                  let chart= new Chart(myChart, {
              type: 'line',

              //the data for our dataset
              data: {
                labels: dateArray,
                datasets: [ {
                  label: 'Weight',
                  backgroundColor: "#5bc0de",
                  borderColor: '#00f5a3',
                  data:weightArray,
                  borderWidth:3
                  hoverBorderColor: "#000"
                } ]
              },
              options: {
                responsive: true,
                scales: {
                  xAxes: [ {
                    type: 'time',
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Date'
                    },
                    ticks: {
                      major: {
                        fontStyle: 'bold',
                        fontColor: '#FF0000'
                      }
                    }
                  } ],
                  yAxes: [ {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Weight(kg)'
                    }
                  } ]
                },
                title:{
                  display: true,
                  text: 'Plot of Weights over Time',
                  fontSize:15
                },
                layout:{
                  padding:{
                    left: 20,
                    right:0,
                    bottom:20,
                    top:0
                  }
                }
              }
            };)

            