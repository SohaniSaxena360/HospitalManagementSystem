import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { API } from "../api";

const BedOccupancy = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/analytics/occupancy").then(res => {
      setData({
        labels: ["Occupied", "Free"],
        datasets: [
          {
            data: [res.data.occupied, res.data.free],
            backgroundColor: ["#FF6384", "#36A2EB"]
          }
        ]
      });
    });
  }, []);

  if (!data) return <p>Loading...</p>;

  return <Pie data={data} />;
};

export default BedOccupancy;
