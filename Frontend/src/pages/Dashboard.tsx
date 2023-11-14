import React from "react";
import Sidebar from "../components/shared/sidebar";
import Chart from "react-apexcharts";
import Header from "./header";

const Dashboard: React.FC = () => {
  const chartOptions = {
    xaxis: {
      categories: [
        "Junio",
        "Julio",
        "Agosto",
        "Setiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
    },
  };

  const chartSeries = [
    {
      name: "Proyecto 1",
      data: [30, 40, 25, 50, 49, 21, 70, 51],
    },
    {
      name: "Proyecto 2",
      data: [23, 12, 54, 61, 32, 56, 81, 19],
    },
    {
      name: "Proyecto 3",
      data: [24, 20, 5, 75, 42, 79, 72, 35],
    },
  ];

  return (
    <div className="flex">
      <Header />
      <Sidebar />
      <div className="flex-1 p-4">
        {/* Centra el título verticalmente */}
        <h1 className="text-2xl font-bold mb-4 mt-10 ml-80 text-center">
          Informe de estado
        </h1>

        {/* Gráfico de área con contenedor de anchura personalizada */}
        <div className="bg-white rounded shadow-md p-6 ml-80">
          {" "}
          {/* Añade ml-64 para un margen izquierdo */}
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
