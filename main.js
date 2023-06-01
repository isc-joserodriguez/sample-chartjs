const ctx = document.getElementById('myChart');
const ciudades = ['Mexico', 'Colombia', 'Peru'];
const datasets = [
  {
    label: 'Temperaturas',
    data: [36, 10, 40],
    borderWidth: 1,
    backgroundColor: [
      'rgba(255, 99, 120, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(84, 191, 0, 0.2)',
      'rgba(80, 80, 10, 0.2)',
    ],
  },
];

const miGrafico = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ciudades,
    datasets,
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const addCity = (ciudad, valor) => {
  ciudades.push(ciudad);
  datasets[0].data.push(valor);
  miGrafico.update();
};

const nuevaCiudadInput = document.getElementById('nuevaCiudad');
const btnGuardar = document.getElementById('btnGuardar');
btnGuardar.addEventListener('click', async () => {
  const ciudad = nuevaCiudadInput.value;
  const {
      data: {
          main: {
            temp
        }
    }
  } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=616629f9acdc3b22b8b09553e632e5da`
      );
  addCity(ciudad, temp - 273.15);
});
