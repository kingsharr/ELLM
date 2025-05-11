'use client';

import { FaChartLine } from "react-icons/fa";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default icon issue
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});




interface WasteData {
  Year: string;
  Category: string;
  Volume: number;
  Location: string;
  lat: number;
  lng: number;
}

export default function PredictionPage() {
  const [data, setData] = useState<WasteData[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]); // 👈 Dynamic categories

  // Fetch CSV data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/waste_data_2028.csv"); // Place CSV in /public/data/
        const csvText = await response.text();

        const parsedData = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;

        const formattedData: WasteData[] = parsedData.map((row: any) => ({
          Year: row.Year,
          Category: row.Category,
          Volume: parseFloat(row["Volume (kg)"]),
          Location: row.Location,
          lat: parseFloat(row.Latitude),
          lng: parseFloat(row.Longitude),
        }));


        setData(formattedData);

        // Extract unique categories
        const categorySet = new Set(formattedData.map((row) => row.Category));
        setCategories(["All", ...Array.from(categorySet)]);
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
      }
    };

    fetchData();
  }, []);

  // Filtered data
  const filteredData = filteredCategory === "All" ? data : data.filter(item => item.Category === filteredCategory);

  // Locations with high waste volume
  const topWasteLocations = filteredData.filter(item => item.Volume > 100);

  

  
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <FaChartLine className="text-4xl text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Waste Prediction</h1>
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Our predictive analytics dashboard helps municipalities optimize waste collection routes.
      </p>

      {/* Category Filter */}
      <div className="mb-4">
        <select
          className="p-2 border rounded-md"
          value={filteredCategory}
          onChange={(e) => setFilteredCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      

      {/* Graph Display */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Volume" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

        
      {/* Map Display */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <MapContainer
          center={[3.139, 101.6869]} // Center of Malaysia
          zoom={6}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {topWasteLocations.map((location, index) => (
            <Marker key={index} position={[location.lat, location.lng]}>
              <Popup>
                {location.Location}: {location.Volume} kg
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}  