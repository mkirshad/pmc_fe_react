import React, { useEffect, useRef, useState, useMemo } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import { Fill, Stroke, Style, Text } from 'ol/style';
import AxiosBase from '../../services/axios/AxiosBase';
import { MaterialReactTable } from 'material-react-table';

const ClubDirectory = () => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [districtLayer, setDistrictLayer] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtData, setDistrictData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Map
  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({ zoom: 7, center: [8127130, 3658593] }),
    });

    const districtVecLayer = new VectorLayer({ source: new VectorSource() });
    map.addLayer(districtVecLayer);

    setDistrictLayer(districtVecLayer);
    setMapInstance(map);

    return () => map.setTarget(null);
  }, []);

  // Fetch districts once
  useEffect(() => {
    const fetchDistricts = async () => {
      setLoading(true);
      try {
        const res = await AxiosBase.get('/pmc/idm_districts-club-counts/');
        setDistrictData(res.data);
        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(res.data, { featureProjection: 'EPSG:3857' }),
        });

        districtLayer.setSource(vectorSource);

        mapInstance.getView().fit(vectorSource.getExtent(), { padding: [50, 50, 50, 50], duration: 500 });
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
      finally {
        setLoading(false);
      }
    };

    if (districtLayer && mapInstance) {
      fetchDistricts();
    }
  }, [districtLayer, mapInstance]);

  // District style
  useEffect(() => {
    if (!districtLayer) return;

    districtLayer.setStyle((feature) => {
      const isSelected = feature.get('id') === selectedDistrict;
      return new Style({
        stroke: new Stroke({ color: isSelected ? 'red' : 'blue', width: isSelected ? 3 : 2 }),
        fill: new Fill({ color: isSelected ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 0, 255, 0.1)' }),
        text: new Text({
          text: `${feature.get('name')} (${feature.get('club_count')})`,
          font: '12px sans-serif',
          fill: new Fill({ color: '#000' }),
          stroke: new Stroke({ color: '#fff', width: 3 }),
        }),
      });
    });
  }, [districtLayer, selectedDistrict]);

  // Fetch clubs
  useEffect(() => {
    const fetchClubs = async () => {
      const res = await AxiosBase.get('/pmc/idm_clubs_geojson_all/');
      setClubs(res.data.features);
    };
    fetchClubs();
  }, []);

  // Map click handler
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
          mapInstance.getView().fit(selectedFeature.getGeometry().getExtent(), { padding: [50, 50, 50, 50], maxZoom: 10 });
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

  const filteredClubs = useMemo(() => {
    if (!selectedDistrict) return clubs;
    return clubs.filter((c) => c.properties.district_id === selectedDistrict);
  }, [selectedDistrict, clubs]);

  const columns = useMemo(() => [
    { accessorKey: 'properties.district', header: 'District', size: 150 },
    { accessorKey: 'properties.name', header: 'School Name', size: 225 },
    { accessorKey: 'properties.address', header: 'Address', size: 225 },
    { accessorKey: 'properties.head_name', header: 'Head Name', size: 200 },
  ], []);

  return (
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
        />
      </div>
    </div>
  );
};

export default ClubDirectory;