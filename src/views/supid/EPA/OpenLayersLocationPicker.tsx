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

const OpenLayersLocationPicker = ({ onLocationSelect, savedLocation, isEditing }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markerFeature, setMarkerFeature] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    const vectorSource = new VectorSource();
    const initialCoords = savedLocation && isEditing
      ? fromLonLat([savedLocation.lng, savedLocation.lat]) // Use saved location if editing
      : fromLonLat([74.3436, 31.5497]); // Default location (Lahore)

    const marker = new Feature({
      geometry: new Point(initialCoords),
    });

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

    const olMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        markerLayer,
      ],
      view: new View({
        center: initialCoords,
        zoom: 12,
      }),
    });

    setMap(olMap);

    if (!isEditing) {
      getCurrentLocation(olMap, marker);
      const modify = new Modify({ source: vectorSource });
      olMap.addInteraction(modify);
      modify.on("modifyend", (event) => {
        const newCoords = event.features.item(0).getGeometry().getCoordinates();
        const newLonLat = toLonLat(newCoords);
        setLocation({ lat: newLonLat[1], lng: newLonLat[0] });
        onLocationSelect({ lat: newLonLat[1], lng: newLonLat[0] });
      });
    }

    return () => olMap.setTarget(null);
  }, []);

  const getCurrentLocation = (olMap, marker) => {
    if (navigator.geolocation && !isEditing) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = fromLonLat([position.coords.longitude, position.coords.latitude]);
          marker.getGeometry().setCoordinates(userCoords);
          olMap.getView().setCenter(userCoords);
          olMap.getView().setZoom(15);
          setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          onLocationSelect({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <div>
      <div ref={mapRef} style={{ height: "600px", width: "100%" }} />
      {!isEditing && (
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
      )}
    </div>
  );
};


export default OpenLayersLocationPicker;
