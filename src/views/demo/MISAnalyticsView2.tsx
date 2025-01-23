// src/DistrictMap.js
import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import { Fill, Stroke, Style } from 'ol/style';
import AxiosBase from '../../services/axios/AxiosBase';
import { parse } from 'terraformer-wkt-parser';

const DistrictMap = ({ onDistrictClick }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [vectorLayer, setVectorLayer] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);

  useEffect(() => {
    // Initialize the map
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(), // OpenStreetMap tiles
        }),
      ],
      view: new View({
        zoom: 7, // Default zoom level
        center: [8127130, 3658593], // Coordinates for Lahore in EPSG:3857
      }),
    });

    // Add vector layer for GeoJSON data
    const initialVectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: (feature) => {
        const isSelected = feature.get('district_id') === selectedDistrictId;
        return new Style({
          stroke: new Stroke({
            color: isSelected ? 'red' : 'blue',
            width: isSelected ? 3 : 2,
          }),
          fill: new Fill({
            color: isSelected ? 'rgba(255, 0, 0, 0.4)' : 'rgba(0, 0, 255, 0.2)',
          }),
        });
      },
    });

    initialMap.addLayer(initialVectorLayer);
    setMapInstance(initialMap);
    setVectorLayer(initialVectorLayer);

    return () => initialMap.setTarget(null); // Cleanup on unmount
  }, [selectedDistrictId]);

  useEffect(() => {
    // Fetch districts and populate the map
    const fetchData = async () => {
      const response = await AxiosBase.get('/pmc/districts', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Transform the data into GeoJSON
      const geoJsonFeatures = response.data.map((district) => ({
        type: 'Feature',
        geometry: parse(district.geom.replace('SRID=4326;', '')),
        properties: {
          district_id: district.district_id,
          district_name: district.district_name,
          district_code: district.district_code,
        },
      }));

      const geoJson = {
        type: 'FeatureCollection',
        features: geoJsonFeatures,
      };

      if (vectorLayer) {
        const vectorSource = vectorLayer.getSource();
        vectorSource.clear();
        vectorSource.addFeatures(
          new GeoJSON().readFeatures(geoJson, {
            featureProjection: 'EPSG:3857', // Match Web Mercator projection
          })
        );

        // Fit the map to the extent of the districts while keeping the base map
        const extent = vectorSource.getExtent();
        mapInstance.getView().fit(extent, {
          padding: [50, 50, 50, 50], // Padding for better visibility
          maxZoom: 10, // Set a maximum zoom level to avoid over-zooming
        });
      }
    };

    fetchData();
  }, [vectorLayer, mapInstance]);

  // Add click interaction
  useEffect(() => {
    if (!mapInstance || !vectorLayer) return;

    const handleMapClick = (event) => {
      const features = mapInstance.getFeaturesAtPixel(event.pixel);
      if (features && features.length > 0) {
        const selectedFeature = features[0];
        const properties = selectedFeature.getProperties();
        setSelectedDistrictId(properties.district_id);
        if (onDistrictClick) {
          onDistrictClick(properties);
        }
      }
    };

    mapInstance.on('click', handleMapClick);

    return () => mapInstance.un('click', handleMapClick); // Cleanup
  }, [mapInstance, vectorLayer]);

  return <div ref={mapRef} style={{ height: '600px', width: '100%' }} />;
};

export default DistrictMap;
