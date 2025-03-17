import React, { useEffect, useRef, useState, useMemo } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import { Fill, Stroke, Style, Text, Circle as CircleStyle } from 'ol/style';
import AxiosBase from '../../services/axios/AxiosBase';
import { MaterialReactTable } from 'material-react-table';

const ClubDirectory = () => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [districtLayer, setDistrictLayer] = useState(null);
  const [clubLayer, setClubLayer] = useState(null);
  const [clubData, setClubData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize Map
  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        zoom: 7,
        center: [8127130, 3658593], // Lahore EPSG:3857
      }),
    });
  
    const districtVecLayer = new VectorLayer({ source: new VectorSource() });
    const clubVecLayer = new VectorLayer({ source: new VectorSource() });
  
    map.addLayer(districtVecLayer);
    map.addLayer(clubVecLayer); // <--- THIS WAS THE ERROR LINE
  
    setDistrictLayer(districtVecLayer);
    setClubLayer(clubVecLayer); // Ensure you store the second layer as well
    setMapInstance(map);
  
    return () => map.setTarget(null);
  }, []);

  // Load Districts GeoJSON with counts
// Fetch and set district polygons with club counts
useEffect(() => {
  if (!districtLayer || !mapInstance) return;

  const fetchDistricts = async () => {
    setLoading(true);
    try {
      const res = await AxiosBase.get('/pmc/idm_districts-club-counts/');
      const geojson = res.data;

      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojson, {
          featureProjection: 'EPSG:3857',
        }),
      });

      districtLayer.setSource(vectorSource);

      districtLayer.setStyle((feature) => {
        const clubCount = feature.get('club_count');
        const districtName = feature.get('name');

        return new Style({
          stroke: new Stroke({ color: 'blue', width: 2 }),
          fill: new Fill({ color: 'rgba(0, 0, 255, 0.1)' }),
          text: new Text({
            text: `${districtName} (${clubCount})`,
            font: '12px sans-serif',
            fill: new Fill({ color: '#000' }),
            stroke: new Stroke({ color: '#fff', width: 3 }),
          }),
        });
      });

      // Optional: Zoom to extent
      mapInstance.getView().fit(vectorSource.getExtent(), {
        padding: [50, 50, 50, 50],
        duration: 500,
      });
    } catch (error) {
      console.error('Error fetching districts:', error);
    }finally {
      setLoading(false);
    }
  };

  fetchDistricts();
}, [districtLayer, mapInstance]);


  // Load clubs as points
  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    const fetchDistricts = async () => {
      const res = await AxiosBase.get('/pmc/idm_clubs_geojson_all/')
      setClubs(res.data.features);
    }
    fetchDistricts();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: 'properties.district',    header: 'District', 
        minSize: 50,
        maxSize: 500,
        size: 150, 
      },
      { accessorKey: 'properties.name',    header: 'School Name', 
        minSize: 50,
        maxSize: 500,
        size: 225, 
      },
      { accessorKey: 'properties.address',    header: 'Address', 
        minSize: 50,
        maxSize: 500,
        size: 225, 
      },
      { accessorKey: 'properties.head_name',    header: 'Head Name', 
        minSize: 50,
        maxSize: 500,
        size: 200, 
      },
    ],
    []
  );

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
          data={clubs}
          initialState={{ pagination: { pageSize: 15 } }}
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
            muiTableBodyRowProps={{
                sx: {
                    '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' }, // Alternate row colors
                    '&:hover': { backgroundColor: '#e0f7fa' }, // Hover effect
                },
            }}
            enableZebraStripes={true}
            enableColumnResizing={true}
            // columnResizeMode="onChange" // default
            // enableGlobalFilter={false} // Disables the global search/filter box
            enablePagination={true} // Optionally disable pagination controls
            // enableSorting={false} // Optionally disable column sorting
        />
      </div>
    </div>
  );
};

export default ClubDirectory;
