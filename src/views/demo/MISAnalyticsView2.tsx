import React, { useEffect, useRef, useState, useMemo } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import AxiosBase from '../../services/axios/AxiosBase';
import { parse } from 'terraformer-wkt-parser';
import { FaIndustry, FaUser, FaRecycle, FaTruck, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Divider, Select, MenuItem, Box } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';

// Helper function
function getCategoryColor(category) {
  switch (category) {
    case 'Producer':
      return '#FB923C'; // matches bg-orange-500 (#FB923C)
    case 'Distributor':
      return '#3B82F6'; // matches bg-blue-500 (#3B82F6)
    case 'Collector':
      return '#FBBF24'; // <--- matches bg-yellow-500
    case 'Recycler':
      return '#22C55E'; // matches bg-green-500 (#22C55E)
    default:
      return 'gray';
  }
}
const DistrictMap = ({ onDistrictClick }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [vectorLayer, setVectorLayer] = useState(null);
  const [applicantLayer, setApplicantLayer] = useState(null); // NEW LAYER FOR POINTS

  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [stateDistrictData, setStateDistrictData] = useState(null);

  // ---------- Applicant data and filters ----------
  const [applicantData, setApplicantData] = useState([]);
  const [districtOptions,  setDistrictOptions]= useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [enabledCategories, setEnabledCategories] = useState<string[]>([
    'Producer', 'Distributor', 'Collector', 'Recycler'
  ]);
  const [hasFetchedDistricts, setHasFetchedDistricts] = useState(false);

  // Define default center/zoom (the same ones you used to initialize the map)
  const [DEFAULT_CENTER, setDefaultCenter] = useState([8054803.349056441,3623248.3407283584]); 
  const [DEFAULT_ZOOM, setDefaultZoom] = useState(6.53343814691434);
  const [RADIUS, setRadius] = useState(4)
  

  // ================ 1) Map Initialization =================
  useEffect(() => {
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        zoom: 7,
        center: [8127130, 3658593], // Lahore in EPSG:3857
      }),
    });

    const initialVectorLayer = new VectorLayer({
      source: new VectorSource(),
    });

    // District polygons
    initialMap.addLayer(initialVectorLayer);
    setVectorLayer(initialVectorLayer);

    setMapInstance(initialMap);

    return () => initialMap.setTarget(null);
    
  }, []);

  // ================ 2) Applicant Layer for Points ===========
  useEffect(() => {
    if (!mapInstance) return;

    // Create a vector layer for applicant points
    const newApplicantLayer = new VectorLayer({
      source: new VectorSource(),
      style: (feature) => {
        const category = feature.get('category'); 
        return new Style({
          image: new CircleStyle({
            radius: RADIUS,
            fill: new Fill({ color: getCategoryColor(category) }),
            stroke: new Stroke({ color: '#fff', width: 1 }),
          }),
        });
      },
    });

    // Add it to the map
    mapInstance.addLayer(newApplicantLayer);
    setApplicantLayer(newApplicantLayer);
  }, [mapInstance]);

  // ================ 3) Fetch Applicant Data ================
  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        const resp = await AxiosBase.get('/pmc/applicant-location-public/');
        setApplicantData(resp.data);
  
        // Extract unique district names directly from resp.data
        const distinctDistricts = new Set(
          resp.data.map((row) => row.district_name).filter(Boolean)
        );
        const sortedDistricts = Array.from(distinctDistricts).sort();
        setDistrictOptions(sortedDistricts);
  
      } catch (error) {
        console.error('Error fetching applicant data:', error);
      }
    };
    fetchApplicantData();
  }, []);
  

  const districtFilteredData = useMemo(() => {
      if (!selectedDistrict) return applicantData;
      return applicantData.filter((item) => item.district_name === selectedDistrict);
    }, [selectedDistrict, applicantData]);
    
    const filteredApplicants = useMemo(() => {
      return districtFilteredData.filter((item) =>
        enabledCategories.includes(item.category)
      );
    }, [districtFilteredData, enabledCategories]);

  // ================ 4) When applicantData changes, add features to applicantLayer
  

  useEffect(() => {
    if (!applicantLayer) return;

    const source = applicantLayer.getSource();
    source.clear(); // remove old points

    filteredApplicants.forEach((app) => {
      if (app.latitude && app.longitude) {
        // convert from lat/lon to map coords
        const coords = fromLonLat([Number(app.longitude), Number(app.latitude)]);
        const feature = new Feature({
          geometry: new Point(coords),
          category: app.category, // used in layer's style function
        });
        source.addFeature(feature);
      }
    });
  }, [filteredApplicants, applicantLayer]);

  // ================ 5) Fetch District Polygons =============
  useEffect(() => {
    if (!mapInstance || !vectorLayer || hasFetchedDistricts) return;

    const fetchDistrictGeoms = async () => {
      let districtData = stateDistrictData;
      if (!districtData) {
        const response = await AxiosBase.get('/pmc/districts-public');
        districtData = response.data.filter((d) => d.geom);
        // optionally store for later use
      }

      const geoJsonFeatures = districtData.map((district) => ({
        type: 'Feature',
        geometry: parse(district.geom.replace('SRID=4326;', '')),
        properties: {
          district_id: district.district_id,
          district_name: district.district_name,
          district_code: district.district_code,
        },
      }));

      const geoJson = { type: 'FeatureCollection', features: geoJsonFeatures };
      const vectorSource = vectorLayer.getSource();
      vectorSource.clear();
      vectorSource.addFeatures(
        new GeoJSON().readFeatures(geoJson, { featureProjection: 'EPSG:3857' })
      );

      // Fit map
      const extent = vectorSource.getExtent();
      mapInstance.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        maxZoom: 10,
      });

      setHasFetchedDistricts(true);
    };

    fetchDistrictGeoms();
  }, [mapInstance, vectorLayer, hasFetchedDistricts, stateDistrictData]);

  // ================ 6) District Style / Click to Select =====
  // If you want the district layer to highlight selectedDistrictId
  // either define a style callback on `vectorLayer` or a separate effect:
  useEffect(() => {
    if (!vectorLayer) return;
    vectorLayer.setStyle((feature) => {
      const isSelected = feature.get('district_id') === selectedDistrictId;
      return new Style({
        stroke: new Stroke({
          color: isSelected ? 'red' : 'blue',
          width: isSelected ? 3 : 2,
        }),
        fill: new Fill({
          color: isSelected ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 0, 255, 0.1)',
        }),
      });
    });
  }, [vectorLayer, selectedDistrictId]);

  // ================ 7) Map Click -> District Select ==========
  useEffect(() => {
    if (!mapInstance || !vectorLayer) return;
  
    const handleMapClick = (event) => {
      const features = mapInstance.getFeaturesAtPixel(event.pixel);
  
      if (features && features.length > 0) {
        const selectedFeature = features[0];
        const props = selectedFeature.getProperties();
        const clickedDistrictName = props.district_name;
        
        if (selectedDistrict === clickedDistrictName) {
          // 1) Same district clicked again → deselect
          setSelectedDistrict(null);
          setSelectedDistrictId(null);
  
          // 1a) Go back to the default center/zoom
          mapInstance.getView().setCenter(DEFAULT_CENTER);
          mapInstance.getView().setZoom(DEFAULT_ZOOM);
          setRadius(3);
        } else {
          // 2) New district selected → set it
          setSelectedDistrict(clickedDistrictName);
          setSelectedDistrictId(props.district_id);
          setRadius(5);
          // 2a) Zoom and center on the selected district geometry
          const geometry = selectedFeature.getGeometry();
          // Fit the view to that polygon geometry (with optional maxZoom)
          mapInstance.getView().fit(geometry.getExtent(), {
            padding: [50, 50, 50, 50],
            maxZoom: 10, // or any suitable max zoom
          });
        }
      } else {
        // 3) Clicked outside any district → deselect
        setSelectedDistrict(null);
        setSelectedDistrictId(null);
        setRadius(3);
  
        // 3a) Reset to default center/zoom
        mapInstance.getView().setCenter(DEFAULT_CENTER);
        mapInstance.getView().setZoom(DEFAULT_ZOOM);
      }
    };
  
    mapInstance.on('click', handleMapClick);
    return () => mapInstance.un('click', handleMapClick);
  }, [mapInstance, vectorLayer, selectedDistrict]);

  // ================ 8) Filter + Tiles + Table as before ======
  // const districtFilteredData = useMemo(() => {
  //   if (!selectedDistrict) return applicantData;
  //   return applicantData.filter((item) => item.district_name === selectedDistrict);
  // }, [selectedDistrict, applicantData]);

  function computeCategoryStats(dataArray) {
    const result = {
      Total: dataArray.length,
      Producer: 0,
      Distributor: 0,
      Collector: 0,
      Recycler: 0,
    };
    dataArray.forEach((item) => {
      if (item.category === 'Producer') result.Producer++;
      if (item.category === 'Distributor') result.Distributor++;
      if (item.category === 'Collector') result.Collector++;
      if (item.category === 'Recycler') result.Recycler++;
    });
    return result;
  }
  // set district options
  // const districtOptions = useMemo(() => {
  //   // Extract unique district names from data
  //   const distinct = new Set(applicantData.map((row) => row.district_name).filter(Boolean));
  //   return Array.from(distinct).sort(); // convert to array, sort alphabetically
  // }, [applicantData]);

  // const handleColumnFiltersChange = (updaterOrValue) => {
  //   // 1) Resolve the new filter data from MRT
  //   let newFilters;
  
  //   if (typeof updaterOrValue === 'function') {
  //     // It's a functional state updater
  //     setColumnFilters((old) => {
  //       newFilters = updaterOrValue(old);
  //       return newFilters;
  //     });
  //   } else {
  //     // It's already the new filters array or object
  //     newFilters = updaterOrValue;
  //     setColumnFilters(newFilters);
  //   }
  
  //   // 2) Once we have newFilters, parse out district/category
  //   //    Because setState can be async, we either parse inside
  //   //    the same tick or in a small effect. If you do it synchronously:
  //   setTimeout(() => {
  //     let filtersArray = [];
  //     if (Array.isArray(newFilters)) {
  //       filtersArray = newFilters;
  //     } else if (typeof newFilters === 'object' && newFilters !== null) {
  //       filtersArray = Object.values(newFilters);
  //     }
  
  //     let newSelectedDistrict = null;
  //     let newEnabledCats = ['Producer', 'Distributor', 'Collector', 'Recycler'];
  
  //     filtersArray.forEach((f) => {
  //       if (f.id === 'district_name') {
  //         newSelectedDistrict = f.value || null;
  //       }
  //       if (f.id === 'category') {
  //         // If user picks e.g. 'Collector' only, then filter to just that
  //         if (f.value) {
  //           newEnabledCats = [f.value];
  //         }
  //       }
  //     });
  
  //     // 3) Update your top-level states
  //     setSelectedDistrict(newSelectedDistrict);
  //     setEnabledCategories(newEnabledCats);
  //   }, 0);
  // };


  const categoryStats = computeCategoryStats(districtFilteredData);

  // const filteredApplicants = useMemo(() => {
  //   return districtFilteredData.filter((item) =>
  //     enabledCategories.includes(item.category)
  //   );
  // }, [districtFilteredData, enabledCategories]);

  const enabledTotal = enabledCategories.reduce((acc, cat) => acc + categoryStats[cat], 0);



  const [columnFilters, setColumnFilters] = useState([]);
   // 6) handle MRT filter changes
   const handleColumnFiltersChange = (updaterOrValue) => {
    // The new filter state could be:
    //  - an array
    //  - an object
    //  - a functional updater (like (old) => newFilters)
    let newFilters;
    // alert('its here 2')

    if (typeof updaterOrValue === 'function') {
      // It's a functional updater
      setColumnFilters((old) => {
        newFilters = updaterOrValue(old);
        return newFilters;
      });
    } else {
      // It's already the new filters array or object
      setColumnFilters(updaterOrValue);
      newFilters = updaterOrValue;
    }

    // Because state setting is async, we parse inside the setter
    // or parse after a small delay.  If it's an object, you might need Object.values
    // But typically it's an array: e.g. [{ id: 'district_name', value: 'Lahore' }]
  };

  // 7) parse the new columnFilters each time it changes
  useEffect(() => {
    // Because "columnFilters" might be an array or an object, let's unify it
    let filtersArray = [];
    if (Array.isArray(columnFilters)) {
      filtersArray = columnFilters;
    } else if (typeof columnFilters === 'object' && columnFilters !== null) {
      filtersArray = Object.values(columnFilters);
    }

    // default
    let newSelectedDistrict = null;
    let newEnabledCats = ['Producer', 'Distributor', 'Collector', 'Recycler'];

    filtersArray.forEach((f) => {
      if (f.id === 'district_name') {
        newSelectedDistrict = f.value || null;
      }
      if (f.id === 'category') {
        // if user picked 'Collector', that means we only want "Collector"
        if (f.value) {
          newEnabledCats = [f.value];
        }
      }
    });

    setSelectedDistrict(newSelectedDistrict);
    setEnabledCategories(newEnabledCats);
  }, [columnFilters]);

  // Render
  return (
    <div className="banner-container2 grid">
      <header className="banner-header">
        <Link
          to="/pub"
          className="transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <div className="logo-section">
            <img
              src="/img/logo/epa_logo-removebg-preview.png"
              alt="GOP Logo"
              className="header-logo"
            />
            <img
              src="/img/logo/epccd.png"
              alt="EPCCD Logo"
              className="header-logo"
            />
            <img src="/img/logo/gop.png" alt="GOP Logo" className="header-logo" />
            <span className="header-text">PLMIS</span>
          </div>
        </Link>
        <h6 className="header-text">
          <span className="font-bold">MIS</span>
          <span className="text-sm ml-2">Public Directory</span>
        </h6>
        <nav className="banner-nav">
          <Link
            to="/sign-in"
            className="nav-link transition-all duration-300 ease-in-out transform hover:scale-105"
            style={{ paddingLeft: 300 }}
          >
            Login
          </Link>
        </nav>
      </header>

      <CategoryTiles
        stats={categoryStats}
        enabledCategories={enabledCategories}
        setEnabledCategories={setEnabledCategories}
        enabledTotal={enabledTotal}
      />

      <div className="flex flex-col md:flex-row">
        <div
          ref={mapRef}
          style={{ height: '600px', width: '500px' }}
          className="mb-4"
        />
        <div className="ml-4 flex-grow">
        <MyDataTable
            data={filteredApplicants}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
            enabledCategories={enabledCategories}
            setEnabledCategories={setEnabledCategories}
            columnFilters={columnFilters}
            districtOptions={districtOptions}
            onColumnFiltersChange={handleColumnFiltersChange}
          />
        </div>
      </div>

      <Divider textAlign="left" />

      <footer className="footer-container">
        <span className="footer-text">
          Copyright &copy; {new Date().getFullYear()}
          {" "}
          <span className="font-semibold">PLMIS</span> All rights reserved.
          <br />
          Plastic Management Cell, Strategic Planning &amp; Implementation Unit,
          Environmental Protection Agency, and Environment Protection &amp;
          Climate Change Department, Government of the Punjab.
        </span>
      </footer>
    </div>
  );
};

// --------------------- CategoryTiles ---------------------
const CategoryTiles = ({
  stats,               // { Total, Producer, Distributor, Collector, Recycler }
  enabledCategories,   // e.g. ['Producer', 'Distributor', ...]
  setEnabledCategories,
  enabledTotal,
}) => {
  // Toggle category
  const handleTileClick = (cat) => {
    if (cat === 'Total') {
      // If "Total" tile is clicked, maybe toggle all on/off
      if (enabledCategories.length === 4) {
        setEnabledCategories([]); // disable all
      } else {
        setEnabledCategories(['Producer', 'Distributor', 'Collector', 'Recycler']);
      }
      return;
    }
    // For an individual category, toggle it
    if (enabledCategories.includes(cat)) {
      setEnabledCategories(enabledCategories.filter((c) => c !== cat));
    } else {
      setEnabledCategories([...enabledCategories, cat]);
    }
  };

  // Determine if tile is “enabled” visually
  const isTileEnabled = (cat) => {
    if (cat === 'Total') {
      // "Total" is enabled if there's at least one category enabled
      return enabledCategories.length > 0;
    }
    return enabledCategories.includes(cat);
  };

  // If the Total tile is *disabled*, show 0.
  // Otherwise, show the sum of enabled categories.
  function getTileDisplayValue(cat) {
    if (cat === 'Total') {
      if (!isTileEnabled('Total')) {
        return 0; // If the Total tile is disabled, show 0
      }
      // If the Total tile is enabled, show the sum of enabled categories
      return enabledTotal;
    }
    // For categories, always show the “raw” stats
    return stats[cat] || 0;
  }

  const tileDefs = [
    { key: 'Total',       bgColor: 'bg-gray-500',    icon: <FaChartBar className="text-white text-3xl" /> },
    { key: 'Producer',    bgColor: 'bg-orange-500',  icon: <FaIndustry className="text-white text-3xl" /> },
    { key: 'Distributor', bgColor: 'bg-blue-500',    icon: <FaUser className="text-white text-3xl" /> },
    { key: 'Collector',   bgColor: 'bg-yellow-500',  icon: <FaTruck className="text-white text-3xl" /> },
    { key: 'Recycler',    bgColor: 'bg-green-500',   icon: <FaRecycle className="text-white text-3xl" /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
      {tileDefs.map((tile) => {
        const enabled = isTileEnabled(tile.key);
        const value = getTileDisplayValue(tile.key);

        return (
          <div
            key={tile.key}
            onClick={() => handleTileClick(tile.key)}
            className={`shadow-md rounded p-6 w-full cursor-pointer transition
              ${enabled ? 'opacity-100' : 'opacity-50'}
              ${tile.bgColor}
            `}
          >
            <div className="flex items-center space-x-2">
              {tile.icon}
              {/* Title and number on the same line */}
              <h2 className="text-2xl font-bold text-white">
                {tile.key}
              </h2>
              <p className="text-2xl font-bold text-white">
                {value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --------------------- MyDataTable ---------------------
// const MyDataTable = ({ data }) => {
//   // A helper map from category name to icon
  const categoryIconMap = {
    Producer:   <FaIndustry className="text-xl" />, 
    Distributor:<FaUser className="text-xl" />, 
    Collector:  <FaTruck className="text-xl" />, 
    Recycler:   <FaRecycle className="text-xl" />, 
  };

  // Map from category to Tailwind text color classes
  const categoryColorClassMap = {
    Producer:    'text-orange-500',  
    Distributor: 'text-blue-500',  
    Collector:   'text-yellow-500',
    Recycler:    'text-green-500',
  };


  // const columns = useMemo(
  //   () => [
  //     { accessorKey: 'district_name',    header: 'District', 
  //       minSize: 50,
  //       maxSize: 50,
  //       size: 50, },
  //     { accessorKey: 'tehsil_name',    header: 'Tehsil', 
  //       minSize: 50,
  //       maxSize: 50,
  //       size: 50,  },
  //       {
  //         accessorKey: 'category',
  //         header: 'Category',
  //         // Use a custom Cell to render the icon instead of text
  //         Cell: ({ cell }) => {
  //           const categoryValue = cell.getValue(); 
  //           // e.g. "Producer", "Collector", etc.
  //           const icon = categoryIconMap[categoryValue];
  //           const colorClass = categoryColorClassMap[categoryValue] || 'text-gray-500';
    
  //           return icon ? (
  //             <div className={`flex items-center ${colorClass}`}>
  //               {icon /* The icon itself */}
  //               <span className="ml-1">
  //                 {categoryValue /* If you also want text next to the icon */}
  //               </span>
  //             </div>
  //           ) : (
  //             // fallback if category isn't known
  //             categoryValue
  //           );
  //         },
  //         minSize: 20,
  //         maxSize: 20,
  //         size: 20,
  //       },
  //     { accessorKey: 'business_name',    header: 'Business Name', 
  //       minSize: 50,
  //       maxSize: 50,
  //       size: 50,  },
  //   ],
  //   []
  // );

  // return <MaterialReactTable 
  // columns={columns} 
  // data={data}
  // enableRowStriping 
  // initialState={{
  //   density: 'compact',
  //   pagination: { pageSize: 12 }, // set default rows per page to 12
  // }}
  // />;

  const MyDataTable = ({
    data,
    selectedDistrict,
    setSelectedDistrict,
    enabledCategories,
    setEnabledCategories,
    columnFilters,
    districtOptions,
    onColumnFiltersChange
  }) => {
console.log('districtOptions', districtOptions)

  // // // 1) Gather unique district names for the District filter
  // const districtOptions = useMemo(() => {
  //   // Extract unique district names from data
  //   const distinct = new Set(data.map((row) => row.district_name).filter(Boolean));
  //   return Array.from(distinct).sort(); // convert to array, sort alphabetically
  // }, [data]);


    // // 1) Gather unique district names for the District filter
    // const districtOptions = useMemo(() => {
    //   // Extract unique district names from data
    //   const distinct = new Set(data.map((row) => row.district_name).filter(Boolean));
    //   return Array.from(distinct).sort(); // convert to array, sort alphabetically
    // }, [data]);

  const columns = useMemo(
    () => [
      // District Column with a custom "dropdown" filter
      {
        accessorKey: 'district_name',
        header: 'District',
        // filterFn: 'equals', // or 'includesString' if you want partial matches
        // Provide a custom Filter component
        // Filter: ({ column, table }) => {
        //   const filterValue = column.getFilterValue() || '';
        //   return (
        //     <Select
        //       displayEmpty
        //       value={filterValue} // store the filter state
        //       onChange={(e) => {
        //         column.setFilterValue(e.target.value || undefined)
        //         // alert('its here')
        //       }
        //       }
        //       style={{ width: '100%' }}
        //     >
        //       <MenuItem value="">
        //         <em>All Districts</em>
        //       </MenuItem>
        //       {districtOptions.map((dist) => (
        //         <MenuItem key={dist} value={dist}>
        //           {dist}
        //         </MenuItem>
        //       ))}
        //     </Select>
        //   );
        // },
        // // Enable column filtering
        // enableColumnFilter: true,
        // sizing
        minSize: 50,
        maxSize: 50,
        size: 50,
      },
      {
        accessorKey: 'tehsil_name',
        header: 'Tehsil',
        minSize: 50,
        maxSize: 50,
        size: 50,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        // filterFn: 'equals',
        // enableColumnFilter: true,
        // // Custom Filter for category icons
        // Filter: ({ column }) => {
        //   const filterValue = column.getFilterValue() || '';

        //   return (
        //     <Select
        //       displayEmpty
        //       value={filterValue}
        //       onChange={(e) =>
        //         column.setFilterValue(e.target.value || undefined)
        //       }
        //       style={{ width: '100%' }}
        //     >
        //       <MenuItem value="">
        //         <em>All Categories</em>
        //       </MenuItem>
        //       {Object.keys(categoryIconMap).map((cat) => (
        //         <MenuItem key={cat} value={cat}>
        //           <Box
        //             className={`flex items-center ${
        //               categoryColorClassMap[cat] || ''
        //             }`}
        //           >
        //             {categoryIconMap[cat]}
        //             <span style={{ marginLeft: '0.5rem' }}>{cat}</span>
        //           </Box>
        //         </MenuItem>
        //       ))}
        //     </Select>
        //   );
        // },
        Cell: ({ cell }) => {
          const categoryValue = cell.getValue();
          const icon = categoryIconMap[categoryValue];
          const colorClass = categoryColorClassMap[categoryValue] || 'text-gray-500';

          return icon ? (
            <div className={`flex items-center ${colorClass}`}>
              {icon /* The icon itself */}
              <span className="ml-1">{categoryValue}</span>
            </div>
          ) : (
            categoryValue
          );
        },
        minSize: 50,
        maxSize: 50,
        size: 50,
      },
      {
        accessorKey: 'business_name',
        header: 'Business Name',
        minSize: 50,
        maxSize: 50,
        size: 50,
      },
      {
        accessorKey: 'postal_address',
        header:'Postal Address',
        minSize: 50,
        maxSize: 100,
        size: 100,
      },
      {
        accessorKey: 'material_flow_kg_per_day',
        header:'Material Flow (Kg/Day)',
        minSize: 50,
        maxSize: 50,
        size: 50,
      }
      // ... any other columns ...
    ],
    [districtOptions],
  );

  

  return (<>{ 
    districtOptions.length > 0 &&
    <MaterialReactTable
      columns={columns}
      data={data}
      // manualFiltering
      // enableColumnFilters
      // columnFilters={columnFilters}
      // onColumnFiltersChange={onColumnFiltersChange}
      // show filters by default
      initialState={{
        showColumnFilters: false, // Hide column filters by default
        // density: 'compact', // Set compact view
        pagination: { pageSize: 8 }, // Set 7 rows per page
      }}
    />
  }
  </>
    
  );

};

export default DistrictMap;
