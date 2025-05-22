'use client';

import { FaChartLine } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

// Fix Leaflet icon issue
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src || markerIcon2x,
  iconUrl: markerIcon.src || markerIcon,
  shadowUrl: markerShadow.src || markerShadow,
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
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/data/waste_data_2028.csv");
        if (!res.ok) throw new Error("Failed to fetch CSV data");
        const csvText = await res.text();

        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        const formattedData: WasteData[] = parsed.data.map((row) => {
          const r = row as Record<string, string>;
          return {
            Year: r.Year || "Unknown",
            Category: r.Category || "Unknown",
            Volume: parseFloat(r["Volume (kg)"]) || 0,
            Location: r.Location || "Unknown",
            lat: parseFloat(r.Latitude) || 0,
            lng: parseFloat(r.Longitude) || 0,
          };
        });

        setData(formattedData);
        setCategories(["All", ...Array.from(new Set(formattedData.map(d => d.Category)))]);
      } catch (error) {
        console.error("CSV fetch or parse error:", error);
      }
    }
    fetchData();
  }, []);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    if (filteredCategory === "All") return data;
    return data.filter(item => item.Category === filteredCategory);
  }, [filteredCategory, data]);

  const topWasteLocations = useMemo(() => filteredData.filter(item => item.Volume > 100), [filteredData]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <FaChartLine className="text-4xl text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Waste Prediction</h1>
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Our predictive analytics dashboard helps municipalities optimize waste collection routes.
      </p>

      <div className="mb-4">
        <select
          className="p-2 border rounded-md"
          aria-label="Filter waste by category"
          value={filteredCategory}
          onChange={(e) => setFilteredCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

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

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <MapComponent locations={topWasteLocations} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <MapContainer
          center={[3.139, 101.6869]}
          zoom={6}
          style={{ height: "500px", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {topWasteLocations.map((loc, idx) => (
            <Marker key={idx} position={[loc.lat, loc.lng]}>
              <Popup>
                {loc.Location}: {loc.Volume} kg
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
