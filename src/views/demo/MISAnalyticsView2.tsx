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
import { FaIndustry, FaUser, FaRecycle, FaTruck, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Divider } from '@mui/material';

const DistrictMap = ({ onDistrictClick }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [vectorLayer, setVectorLayer] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);

  const [tilesData, setTilesData] = useState([]);
  const [dataApplicants, setDataApplicants] = useState([]);
  
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
      const response = await AxiosBase.get('/pmc/districts-public', {
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






      
      try{
        const respons = await AxiosBase.get('/pmc/mis-applicant-statistics/', {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            });
          console.log(respons.data)
    
          const { district_data, registration_statistics, grid_data } = respons.data;
    
            // Validate district_data
            if (!district_data || !Array.isArray(district_data)) {
              throw new Error('Invalid district_data format');
            }
    
            // Validate registration_statistics
            if (!registration_statistics || !Array.isArray(registration_statistics)) {
              throw new Error('Invalid registration_statistics format');
            }
    
            // Validate grid_data
            if (!grid_data || !Array.isArray(grid_data)) {
              throw new Error('Invalid grid_data format');
            }
    
            // Proceed with data processing...
          
    
          const iconMap: Record<string, JSX.Element> = {
            Total: <FaChartBar className="text-white text-3xl" />,
            Producer: <FaIndustry className="text-white text-3xl" />,
            Consumer: <FaUser className="text-white text-3xl" />,
            Recycler: <FaRecycle className="text-white text-3xl" />,
            Collector: <FaTruck className="text-white text-3xl" />,
          };
      
          const colorMap: Record<string, string> = {
            Producer: 'bg-orange-500',
            Consumer: 'bg-blue-500',
            Recycler: 'bg-green-500',
            Collector: 'bg-yellow-500',
          };
    
            // Map registration_statistics into tilesData
        // Map registration_statistics into tilesData
        const dynamicTiles = respons.data.registration_statistics.map((stat: any) => ({
          title: stat.registration_for,
          data: [
            { value: stat.Applications, label: 'Applications', title: 'Applications' },
            { value: stat.DO, label: 'DO', title: 'District Officer (Environment)/Assistant/Deputy Director/District In-Charge' },
            { value: stat.PMC, label: 'PMC', title: 'Plastic Management Cell' },
            { value: stat.APPLICANT, label: 'Applicant', title: 'Applicant' },
            { value: stat.Licenses, label: 'Licenses', title: 'Licenses' },
          ],
          color: colorMap[stat.registration_for] || 'bg-gray-500',
          icon: iconMap[stat.registration_for] || null,
        }));
        
            
    
              // Process district-wise statistics for ApexCharts
              const districts = Array.from(new Set(
                district_data
                  .map(item => item.businessprofile__district__district_name?.trim() || 'Unknown')
                  .filter(name => name !== 'Unknown')
              ));
    
              const categories = Array.from(new Set(
                district_data
                  .map(item => item.registration_for || 'Unknown')
                  .filter(category => category !== 'Unknown')
              ));
    
              const series = categories.map(category => {
                const dataPoints = districts.map(district => {
                  const record = respons.data.district_data.find(item => item.registration_for === category && item.businessprofile__district__district_name === district);
                  return record ? record.count : 0;
                });
                return { name: category, data: dataPoints };
              });
    

              setTilesData(dynamicTiles);
              
    
              // Grid data
              setDataApplicants(respons.data.grid_data);
            }catch(error){
              const errorDetails = {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            };
    
            navigate('/error', { state: { error: errorDetails } });
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

  
  return (
  
    <div className="banner-container2 grid">
    
      <header className="banner-header" >
        <Link to="/pub" className='transition-all duration-300 ease-in-out transform hover:scale-105'>
          <div className="logo-section">
              <img
              src="/img/logo/epa_logo-removebg-preview.png"
              alt="GOP Logo"
              className="header-logo"
              />
              <img src="/img/logo/epccd.png" alt="EPCCD Logo" className="header-logo" />
              <img src="/img/logo/gop.png" alt="GOP Logo" className="header-logo" />

              <span className="header-text">PLMIS</span>
          </div>
      </Link>
      <h6 className="header-text">Public Directory - MIS</h6>
      <nav className="banner-nav">
        <Link to="/sign-in" className="nav-link transition-all duration-300 ease-in-out transform hover:scale-105"
        style={{paddingLeft:300}}
        >
          Login
        </Link>
      </nav>
    </header>
  
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {tilesData.map((tile, index) => (
            <Tile key={index} title={tile.title} data={tile.data} color={tile.color} icon={tile.icon} />
          ))}
        </div>

      <div>
        <div ref={mapRef} style={{ height: '600px', width: '500px' }} className='mb-4' />
      </div>







      <div className="mb-0">
                <Divider textAlign="left">
                </Divider>
        </div>
        <footer className="footer-container ">
            <span className="footer-text">
                Copyright &copy; {new Date().getFullYear()}{" "}
                <span className="font-semibold">PLMIS</span> All rights reserved. <br />
                Plastic Management Cell, Strategic Planning & Implementation Unit,
                Environmental Protection Agency, and Environment Protection & Climate
                Change Department, Government of the Punjab.
            </span>
        </footer>

  </div>
  ); // Adjust the width to 50%
};


interface TileProps {
  title: string;
  data: {
    value: number;
    label: string;
  }[];
  color: string;
  icon: React.ReactNode;
}

const Tile: React.FC<TileProps> = ({ title, data, color, icon }) => {
  return (
    <div className={`shadow-md rounded p-6 w-full ${color}`}>
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-2xl font-bold text-white ml-2">{title}</h2>
      {data.map((item, index) => (
          (index === 0 )?
          <div key={index} className="text-center" title={item.title}> {/* Use item.title for the tooltip */}
            <p className="text-3xl font-bold text-white ml-3">{item.value}</p>
          </div>
          :null
        ))}
      </div>
    </div>
  );
};

export default DistrictMap;
