
const customerChart1 = (availableVehicles, unavailableVehicles) => {
  return {
    height: 150,
    type: 'donut',
    options: {
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%'
          }
        }
      },
      labels: ['Unavailable', 'Available'],
      legend: {
        show: false
      },
      tooltip: {
        theme: 'light'
      },
      grid: {
        padding: {
          top: 20,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      colors: ['black', '#2ed8b6'],
      fill: {
        opacity: [0.8, 1]
      },
      stroke: {
        width: 0
      }
    },
    series: [unavailableVehicles, availableVehicles], 
  };
};

export default customerChart1;
