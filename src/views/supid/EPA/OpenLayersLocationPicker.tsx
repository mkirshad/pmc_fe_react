import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat, toLonLat } from "ol/proj";
import { Fill, Stroke, Style, Circle } from "ol/style";
import { Modify } from "ol/interaction";
import AxiosBase from "../../../services/axios/AxiosBase";
import { parse } from "terraformer-wkt-parser";

const OpenLayersLocationPicker = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markerFeature, setMarkerFeature] = useState(null);
  const [district, setDistrict] = useState("Fetching...");
  const [districtLayer, setDistrictLayer] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    // ✅ Vector Source for district polygons
    const districtSource = new VectorSource();

    const vectorSource = new VectorSource();
    const marker = new Feature({
      geometry: new Point(fromLonLat([74.3436, 31.5497])), // Default location (Lahore)
    });

    // ✅ Style for the Marker
    marker.setStyle(
      new Style({
        image: new Circle({
          radius: 7,
          fill: new Fill({ color: "red" }),
          stroke: new Stroke({ color: "white", width: 2 }),
        }),
      })
    );

    vectorSource.addFeature(marker);
    setMarkerFeature(marker);

    const markerLayer = new VectorLayer({ source: vectorSource });

    // ✅ District Polygon Layer
    const districtVectorLayer = new VectorLayer({
      source: districtSource,
      style: new Style({
        stroke: new Stroke({ color: "blue", width: 2 }),
        // fill: new Fill({ color: "rgba(0, 0, 255, 0.1)" }),
      }),
    });

    const olMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        districtVectorLayer, // Layer for District Boundaries
        markerLayer, // Layer for Marker
      ],
      view: new View({
        center: fromLonLat([74.3436, 31.5497]),
        zoom: 12,
      }),
    });

    setMap(olMap);
    setDistrictLayer(districtVectorLayer);

    // ✅ Fetch District Boundaries
    fetchDistrictBoundaries(districtVectorLayer);

    // ✅ Fetch User's Location
    getCurrentLocation(olMap, marker);

    // ✅ Allow Marker Dragging
    const modify = new Modify({ source: vectorSource });
    olMap.addInteraction(modify);

    modify.on("modifyend", (event) => {
      const newCoords = event.features.item(0).getGeometry().getCoordinates();
      const newLonLat = toLonLat(newCoords);
      setLocation({ lat: newLonLat[1], lng: newLonLat[0] });
      fetchDistrict(newLonLat[0], newLonLat[1]); // Fetch district based on new marker position
    });

    return () => olMap.setTarget(null);
  }, []);

  // 📌 Fetch User's Current Location
  const getCurrentLocation = (olMap, marker) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = fromLonLat([position.coords.longitude, position.coords.latitude]);
          marker.getGeometry().setCoordinates(userCoords);
          olMap.getView().setCenter(userCoords);
          olMap.getView().setZoom(15);
          fetchDistrict(position.coords.longitude, position.coords.latitude);
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    }
  };

  // 📌 Fetch District Name Based on Coordinates
  const fetchDistrict = async (lon, lat) => {
    try {
      onLocationSelect({ lat, lng: lon, district: '' });
      const response = await AxiosBase.get(`/pmc/DistrictByLatLon?lat=${lat}&lon=${lon}`);
      if (response.data && response.data.district_name) {
        setDistrict(response.data.district_name);
        onLocationSelect({ lat, lng: lon, district: response.data.district_name });
      } else {
        setDistrict("District not found");
      }
    } catch (error) {
      console.error("Error fetching district:", error);
      setDistrict("Error fetching district");
    }
  };

  // 📌 Fetch and Render District Boundaries
  const fetchDistrictBoundaries = async (districtVectorLayer) => {
    try {
      const response = await AxiosBase.get('/pmc/districts-public');
      const districtData = response.data.filter((d) => d.geom);

      const geoJsonFeatures = districtData.map((district) => ({
        type: "Feature",
        geometry: parse(district.geom.replace("SRID=4326;", "")), // Convert WKT to GeoJSON
        properties: {
          district_id: district.district_id,
          district_name: district.district_name,
        },
      }));

      const geoJson = { type: "FeatureCollection", features: geoJsonFeatures };
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geoJson, { featureProjection: "EPSG:3857" }),
      });

      districtVectorLayer.setSource(vectorSource);
    } catch (error) {
      console.error("Error fetching district boundaries:", error);
    }
  };

  return (
    <div>
      <div ref={mapRef} style={{ height: "600px", width: "100%" }} />

      {/* ✅ Go to Current Location Button */}
      <button
        type="button"
        onClick={() => getCurrentLocation(map, markerFeature)}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        📍 Go to Current Location
      </button>

      {/* ✅ Display location data */}
      {/* <div className="mt-3">
        <p><strong>Latitude:</strong> {location.lat || "Fetching..."}</p>
        <p><strong>Longitude:</strong> {location.lng || "Fetching..."}</p>
        <p><strong>District:</strong> {district || "Fetching..."}</p>
      </div> */}
    </div>
  );
};

export default OpenLayersLocationPicker;
