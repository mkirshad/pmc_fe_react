import React, { useEffect, useRef, useState, useMemo } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import { Fill, Stroke, Style, Text, Circle as CircleStyle } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import AxiosBase from '../../services/axios/AxiosBase';
import { MaterialReactTable } from 'material-react-table';
import { FaChartBar, FaCity, FaBuilding, FaMapMarkedAlt, FaLandmark } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const ClubDirectory = () => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [districtLayer, setDistrictLayer] = useState(null);
  const [clubLayer, setClubLayer] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [loading, setLoading] = useState(false);
  const [districtStats, setDistrictStats] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showNotice, setShowNotice] = useState(true);
  // Initialize Map
  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({ zoom: 7, center: [8127130, 3658593] }),
    });

    const districtVecLayer = new VectorLayer({ source: new VectorSource() });
    const clubsVecLayer = new VectorLayer({ source: new VectorSource() });

    map.addLayer(districtVecLayer);
    map.addLayer(clubsVecLayer);

    setDistrictLayer(districtVecLayer);
    setClubLayer(clubsVecLayer);
    setMapInstance(map);

    return () => map.setTarget(null);
  }, []);

  // Fetch and display districts once
  useEffect(() => {
    if (!districtLayer || !mapInstance) return;

    const fetchDistricts = async () => {
      setLoading(true);
      try {
        const res = await AxiosBase.get('/pmc/idm_districts-club-counts/');
        setDistrictStats(res.data.features);
        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(res.data, { featureProjection: 'EPSG:3857' }),
        });
        districtLayer.setSource(vectorSource);
        mapInstance.getView().fit(vectorSource.getExtent(), { padding: [50, 50, 50, 50], duration: 500 });
      } catch (error) {
        console.error('Error fetching districts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [districtLayer, mapInstance]);

  // District styling with selection
  useEffect(() => {
    if (!districtLayer) return;

    districtLayer.setStyle((feature) => {
      const isSelected = feature.get('id') === selectedDistrict;
      if(feature.get('club_count')===0) return;
      return new Style({
        stroke: new Stroke({ color: isSelected ? 'red' : 'blue', width: isSelected ? 3 : 2 }),
        fill: new Fill({ color: isSelected ? 'rgba(255,0,0,0.1)' : 'rgba(0,0,255,0.1)' }),
        text: new Text({
          text: `${feature.get('name')} (${feature.get('club_count')})`,
          font: 'bold 10px sans-serif',
          fill: new Fill({ color: '#000' }),
          stroke: new Stroke({ color: '#fff', width: 3 }),
          overflow: true, // <<< This allows text outside of geometry
          // placement: 'point', // <<< Ensures it's placed at centroid, not along line
        }),
      });
    });
  }, [districtLayer, selectedDistrict]);

  // Fetch clubs once
  useEffect(() => {
    const fetchClubs = async () => {
      const res = await AxiosBase.get('/pmc/idm_clubs_geojson_all/');
      setClubs(res.data.features);
    };
    fetchClubs();
  }, []);

  // Display club points
  // Comment Temporarily
  // useEffect(() => {
  //   if (!clubLayer) return;
  //   const source = clubLayer.getSource();
  //   source.clear();

  //   clubs.forEach((club) => {
  //     const coords = fromLonLat(club.geometry.coordinates);
  //     const feature = new Feature({ geometry: new Point(coords) });
  //     feature.setStyle(new Style({
  //       image: new CircleStyle({
  //         radius: 5,
  //         fill: new Fill({ color: '#22C55E' }),
  //         stroke: new Stroke({ color: '#fff', width: 1 }),
  //       }),
  //     }));
  //     source.addFeature(feature);
  //   });
  // }, [clubLayer, clubs]);

  // Handle map click for district selection
  useEffect(() => {
    if (!mapInstance || !districtLayer) return;

    const handleMapClick = (event) => {
      const features = mapInstance.getFeaturesAtPixel(event.pixel);
      if (features.length > 0) {
        const selectedFeature = features[0];
        const districtId = selectedFeature.get('id');
        if (selectedDistrict === districtId) {
          setSelectedDistrict(null);
          mapInstance.getView().setCenter([8127130, 3658593]);
          // mapInstance.getView().setZoom(7); // Temporary Comment
        } else {
          setSelectedDistrict(districtId);
          // mapInstance.getView().fit(selectedFeature.getGeometry().getExtent(), { padding: [50,50,50,50], maxZoom: 10 });  // Temporary Comment
        }
      } else {
        setSelectedDistrict(null);
        mapInstance.getView().setCenter([8127130, 3658593]);
        // mapInstance.getView().setZoom(7);  // Temporary Comment
      }
    };

    mapInstance.on('click', handleMapClick);
    return () => mapInstance.un('click', handleMapClick);
  }, [mapInstance, districtLayer, selectedDistrict]);

  const filteredClubs = useMemo(() => (
    selectedDistrict ? clubs.filter((c) => c.properties.district_id === selectedDistrict) : clubs
  ), [selectedDistrict, clubs]);

  const columns = useMemo(() => [
    {
      accessorKey: 'properties.district',
      header: 'District',
      size: 150,
      Cell: ({ cell }) => (
        <a
          href={`#`} // Modify the URL if needed
          className="text-blue-500 hover:underline"
          onClick={(e) => {
            e.preventDefault();
            setSelectedClub(cell.row.original.properties);
          }}
        >
          {cell.getValue()}
        </a>
      ),
    },
    {
      accessorKey: 'properties.name',
      header: 'School Name',
      size: 225,
      Cell: ({ cell }) => (
        <a
          href={`#`} // Modify the URL if needed
          className="text-blue-500 hover:underline"
          onClick={(e) => {
            e.preventDefault();
            setSelectedClub(cell.row.original.properties);
          }}
        >
          {cell.getValue()}
        </a>
      ),
    },
    {
      accessorKey: 'properties.address',
      header: 'Address',
      size: 225,
      Cell: ({ cell }) => (
        <a
          href={`#`} // Modify the URL if needed
          className="text-blue-500 hover:underline"
          onClick={(e) => {
            e.preventDefault();
            setSelectedClub(cell.row.original.properties);
          }}
        >
          {cell.getValue()}
        </a>
      ),
    },
    {
      accessorKey: 'properties.head_name',
      header: 'Head Name',
      size: 200,
      Cell: ({ cell }) => (
        <a
          href={`#`} // Modify the URL if needed
          className="text-blue-500 hover:underline"
          onClick={(e) => {
            e.preventDefault();
            setSelectedClub(cell.row.original.properties);
          }}
        >
          {cell.getValue()}
        </a>
      ),
    },
  ], []);
  

  const topDistricts = useMemo(() => {
    const sortedDistricts = [...districtStats]
      .sort((a, b) => b.properties.club_count - a.properties.club_count)
      .slice(0, 3);
    
    return [{ properties: { name: "Total Clubs", club_count: clubs.length, id:null } }, ...sortedDistricts];
  }, [districtStats, clubs]);  
  
  const tileDefs = [
    { bgColor: 'bg-gray-500', icon: <FaChartBar className="text-white text-3xl" /> },
    { bgColor: 'bg-orange-500', icon: <FaCity className="text-white text-3xl" /> },
    { bgColor: 'bg-blue-500', icon: <FaBuilding className="text-white text-3xl" /> },
    { bgColor: 'bg-yellow-500', icon: <FaMapMarkedAlt className="text-white text-3xl" /> },
    { bgColor: 'bg-green-500', icon: <FaLandmark className="text-white text-3xl" /> },
  ];
// console.log('topDistricts',topDistricts)
const handleRowClick = (row) => {
    setSelectedClub(row.original.properties);
  };
  
  return (

    <div className="flex flex-col p-4 gap-4">
      {showNotice && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded relative">
          <p className="font-medium">
            To access Head Contact Number and Club Notification, please click on the Club Name.
          </p>
          <button
            className="absolute top-2 right-2 text-yellow-700 hover:text-yellow-900"
            onClick={() => setShowNotice(false)}
          >
            ×
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {topDistricts.map((dist, idx) => (
            <div
              key={idx}
             
              className={`shadow-md rounded p-6 w-full cursor-pointer transition 
                ${selectedDistrict===null || selectedDistrict===dist.properties.id ? 'opacity-100':'opacity-50'}
                ${tileDefs[idx].bgColor}
                `}
                onClick={() => setSelectedDistrict(dist.properties.id)}
            >
              <div className="flex items-center space-x-2">
                {tileDefs[idx].icon}
                <h2 className="text-2xl font-bold text-white">
                  {dist.properties.name}
                </h2>
                <p className="text-2xl font-bold text-white">
                  {dist.properties.club_count}
                </p>
              </div>
            </div>
        ))}
      </div>

      <div className="flex flex-row p-4 gap-4">
        <div className="relative w-1/2">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          )}
          <div ref={mapRef} style={{ height: '850px' }} />
        </div>

        <div style={{ flex: 1 }}>
          <MaterialReactTable
            columns={columns}
            data={filteredClubs}
            initialState={{ pagination: { pageSize: 15 } }}
            enableZebraStripes
            enableColumnResizing
            muiTableBodyRowProps={({ row }) => ({
                onClick: () => handleRowClick(row),
                style: { cursor: 'pointer' }, // Make rows visually clickable
                sx: {
                    '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' }, // Alternate row colors
                    '&:hover': { backgroundColor: '#e0f7fa' }, // Hover effect
                },
              })}

              muiTableProps={{
                sx: {
                    border: '1px solid #ddd', // Table border
                },
            }}
            muiTableHeadCellProps={{
                sx: {
                    backgroundColor: '#f5f5f5', // Header background
                    fontWeight: 'bold',
                    borderBottom: '2px solid #ccc',
                    textAlign: 'center',
                },
            }}
            muiTableBodyCellProps={{
                sx: {
                    borderRight: '1px solid #ddd', // Column border
                    padding: '10px',
                },
            }}
          />
        </div>
      </div>

      
      <Modal open={!!selectedClub} onClose={() => setSelectedClub(null)} aria-labelledby="club-details-modal">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-lg">
                {selectedClub && (
                    <>
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedClub.name}</h2>

                    {/* Info Grid */}
                    <div className="space-y-3">
                        <p className="text-gray-600">
                        <span className="font-semibold text-gray-900">District:</span> {selectedClub.district}
                        </p>
                        <p className="text-gray-600">
                        <span className="font-semibold text-gray-900">Address:</span> {selectedClub.address}
                        </p>
                        <p className="text-gray-600">
                        <span className="font-semibold text-gray-900">Head Name:</span> {selectedClub.head_name}
                        </p>
                        <p className="text-gray-600">
                        <span className="font-semibold text-gray-900">Head Mobile:</span> {selectedClub.head_mobile}
                        </p>

                        {/* Notification Bell */}
                        {selectedClub.notification_path && (
                        <div className="flex items-center space-x-2 border-t pt-3">
                            <FaFilePdf
                            size={24}
                            className="text-blue-500 cursor-pointer transition-transform transform hover:scale-110"
                            onClick={() => window.open(`/api/pmc/media${selectedClub.notification_path}`, "_blank")}
                            />
                            <a
                            href={`/api/pmc/media${selectedClub.notification_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 font-semibold hover:underline"
                            >
                            View Notification
                            </a>
                        </div>
                        )}
                    </div>

                    {/* Close Button */}
                    <div className="mt-5 flex justify-end">
                        <button
                        onClick={() => setSelectedClub(null)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                        >
                        Close
                        </button>
                    </div>
                    </>
                )}
                </div>
            </div>
        </Modal>

    </div>
  );
};

export default ClubDirectory;
