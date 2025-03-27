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

const ClubDirectory = () => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [districtLayer, setDistrictLayer] = useState(null);
  const [clubLayer, setClubLayer] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [loading, setLoading] = useState(false);
  const [districtStats, setDistrictStats] = useState([]);

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
      return new Style({
        stroke: new Stroke({ color: isSelected ? 'red' : 'blue', width: isSelected ? 3 : 2 }),
        fill: new Fill({ color: isSelected ? 'rgba(255,0,0,0.1)' : 'rgba(0,0,255,0.1)' }),
        text: new Text({
          text: `${feature.get('name')} (${feature.get('club_count')})`,
          font: '12px sans-serif',
          fill: new Fill({ color: '#000' }),
          stroke: new Stroke({ color: '#fff', width: 3 }),
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
  useEffect(() => {
    if (!clubLayer) return;
    const source = clubLayer.getSource();
    source.clear();

    clubs.forEach((club) => {
      const coords = fromLonLat(club.geometry.coordinates);
      const feature = new Feature({ geometry: new Point(coords) });
      feature.setStyle(new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({ color: '#22C55E' }),
          stroke: new Stroke({ color: '#fff', width: 1 }),
        }),
      }));
      source.addFeature(feature);
    });
  }, [clubLayer, clubs]);

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
          mapInstance.getView().setZoom(7);
        } else {
          setSelectedDistrict(districtId);
          mapInstance.getView().fit(selectedFeature.getGeometry().getExtent(), { padding: [50,50,50,50], maxZoom: 10 });
        }
      } else {
        setSelectedDistrict(null);
        mapInstance.getView().setCenter([8127130, 3658593]);
        mapInstance.getView().setZoom(7);
      }
    };

    mapInstance.on('click', handleMapClick);
    return () => mapInstance.un('click', handleMapClick);
  }, [mapInstance, districtLayer, selectedDistrict]);

  const filteredClubs = useMemo(() => (
    selectedDistrict ? clubs.filter((c) => c.properties.district_id === selectedDistrict) : clubs
  ), [selectedDistrict, clubs]);

  const columns = useMemo(() => [
    { accessorKey: 'properties.district', header: 'District', size: 150 },
    { accessorKey: 'properties.name', header: 'School Name', size: 225 },
    { accessorKey: 'properties.address', header: 'Address', size: 225 },
    { accessorKey: 'properties.head_name', header: 'Head Name', size: 200 },
  ], []);

  const topDistricts = useMemo(() => {
    const sortedDistricts = [...districtStats]
      .sort((a, b) => b.properties.club_count - a.properties.club_count)
      .slice(0, 4);
    
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
  return (

    <div className="flex flex-col p-4 gap-4">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
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
    </div>
  );
};

export default ClubDirectory;
