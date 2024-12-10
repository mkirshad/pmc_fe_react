import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import './KPIDashboard.css';
import { GoogleMap, LoadScript, Marker, InfoWindow  } from '@react-google-maps/api';
const MAP_API_KEY = 'AIzaSyAp9U6ooUgEpbwOwfsxteu9HiyNWWEuOCY';

// Define types for dummy data structure
interface DistrictCompliance {
  district: string;
  compliance: number;
}
interface KPIData {
  plasticReduction: number;
  recyclingRate: number;
  airQualityIndex: number;
  registeredProducers: number;
  awarenessEvents: number;
}
interface DummyData {
  map: DistrictCompliance[];
  kpis: KPIData;
}

// Dummy JSON Data for KPIs
const dummyData: DummyData = {
  map: [
    { district: 'Lahore', compliance: 80 },
    { district: 'Multan', compliance: 60 },
    { district: 'Faisalabad', compliance: 90 },
    { district: 'Rawalpindi', compliance: 75 },
  ],
  kpis: {
    plasticReduction: 30,
    recyclingRate: 60,
    airQualityIndex: 85,
    registeredProducers: 120,
    awarenessEvents: 25,
  },
};

// Chart options for ApexCharts
const complianceChartOptions = {
  series: [
    {
      name: 'Compliance Rate',
      data: dummyData.map.map((d) => d.compliance),
    },
  ],
  options: {
    chart: { type: 'bar' },
    xaxis: {
      categories: dummyData.map.map((d) => d.district),
      title: { text: 'Districts' },
    },
    yaxis: { title: { text: 'Compliance (%)' } },
    colors: ['#2E93fA'],
  },
};

const pieData1 = 
{
          
  series: [44],
  options: {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10
      }
    },
    grid: {
      padding: {
        bottom: -80
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  },

};


interface SparklineData {
  chart: {
    id: string;
    group: string;
    type: string;
    height: number;
    sparkline: {
      enabled: boolean;
    };
  };
  stroke: {
    curve: string;
  };
  fill: {
    opacity: number;
  };
  series: {
    name: string;
    data: number[];
  }[];
  labels: string[];
  xaxis: {
    type: string;
  };
  yaxis: {
    min: number;
  };
  colors: string[];
  title: {
    text: string;
    offsetX: number;
    style: {
      fontSize: string;
      cssClass: string;
    };
  };
  subtitle: {
    text: string;
    offsetX: number;
    style: {
      fontSize: string;
      cssClass: string;
    };
  };
}

const randomizeArray = (arg: number[]): number[] => {
  const array = arg.slice();
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue
 = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const sparklineData: number[] = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

const spark31: SparklineData = {
  chart: {
    id: 'sparkline3',
    group: 'sparklines',
    type: 'area',
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    curve: 'straight',
  },
  fill: {
    opacity: 1,
  },
  series: [
    {
      name: 'Producers',
      data: randomizeArray(sparklineData),
    },
  ],
  labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    min: 0,
  },
  colors: ['#008FFB', ],
  title: {
    text: '1234',
    offsetX: 30,
    style: {
      fontSize: '24px',
      cssClass: 'apexcharts-yaxis-title',
    },
  },
};

const spark32: SparklineData = {
  chart: {
    id: 'sparkline3',
    group: 'sparklines',
    type: 'area',
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    curve: 'straight',
  },
  fill: {
    opacity: 1,
  },
  series: [
    {
      name: 'Consumers',
      data: randomizeArray(sparklineData),
    },
  ],
  labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    min: 0,
  },
  colors: ['#00E396',],
  title: {
    text: '1234',
    offsetX: 30,
    style: {
      fontSize: '24px',
      cssClass: 'apexcharts-yaxis-title',
    },
  },
};


const spark33: SparklineData = {
  chart: {
    id: 'sparkline3',
    group: 'sparklines',
    type: 'area',
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    curve: 'straight',
  },
  fill: {
    opacity: 1,
  },
  series: [
    {
      name: 'Recyclers',
      data: randomizeArray(sparklineData),
    },
  ],
  labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    min: 0,
  },
  colors: ['#FEB019',],
  title: {
    text: '1234',
    offsetX: 30,
    style: {
      fontSize: '24px',
      cssClass: 'apexcharts-yaxis-title',
    },
  },
};


const spark34: SparklineData = {
  chart: {
    id: 'sparkline3',
    group: 'sparklines',
    type: 'area',
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    curve: 'straight',
  },
  fill: {
    opacity: 1,
  },
  series: [
    {
      name: 'Collectors',
      data: randomizeArray(sparklineData),
    },
  ],
  labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    min: 0,
  },
  colors: ['#FF4560' ],
  title: {
    text: '1234',
    offsetX: 30,
    style: {
      fontSize: '24px',
      cssClass: 'apexcharts-yaxis-title',
    },
  },
};


const spark4 =
{
          
  series: [44, 55, 13, 43],
  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Producers', 'Consumers', 'Recyclers', 'Collectors'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
     colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560' ],
  },


};

// new ApexCharts(document.querySelector("#spark3"), spark3).render();

// Base component for the KPI Dashboard
interface BaseKPIDashboardProps {
  loginUrl?: string;
}

type District = {
  name: string;
  lat: number;
  lng: number;
  population: number;
  literacyRate: number;
};

const districts: District[] = [
  { name: 'Lahore', lat: 31.5204, lng: 74.3587, population: 11.13, literacyRate: 86.5 },
  { name: 'Faisalabad', lat: 31.3639, lng: 73.0734, population: 3.21, literacyRate: 75.8 },
  { name: 'Rawalpindi', lat: 33.5877, lng: 73.0479, population: 2.04, literacyRate: 82.3 },
  { name: 'Multan', lat: 30.1881, lng: 71.4889, population: 3.74, literacyRate: 65.9 },
  { name: 'Gujranwala', lat: 32.1718, lng: 74.1744, population: 4.13, literacyRate: 68.2 }
];

const getMarkerTitle = (district: District): string => {
  return `${district.name} - Pop: ${district.population}, Literacy: ${district.literacyRate}%`;
};

export const KPIDashboardBase: React.FC<BaseKPIDashboardProps> = ({
  loginUrl = '/sign-in',
  signUpUrl = '/sign-up',
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
    <iframe
        src="/index.html" // Path to the static HTML file
        style={{
            width: '100%',
            height: '100%',
            border: 'none',
        }}
        title="Landing Page"
    ></iframe>
</div>

    // <div className="dashboard-container">
    //   <header className="dashboard-header">
    //     <h1>Punjab Environmental KPIs</h1>
    //     <div className="header-buttons">
    //       <Link  to={signUpUrl} className="login-button">
    //         Sign-Up
    //       </Link>
    //       <Link style={{marginLeft:"10px"}} to={loginUrl} className="login-button">
    //         Login
    //       </Link>
    //     </div>
    //   </header>
    //   <div className="kpi-cards">
    //     {/* <KPIBlock label="Plastic Reduction" value={`${dummyData.kpis.plasticReduction}%`} color="green" /> */}
    //     {/* <ReactApexChart options={pieData1.options} series={pieData1.series} type="donut" /> */}
        
    //     <div className="bg-white p-4 rounded shadow">
    //       <h3 className="text-lg font-bold mb-4">Producers</h3>
    //       <ReactApexChart options={spark31} series={spark31.series} />
    //     </div>

    //     <div className="bg-white p-4 rounded shadow">
    //       <h3 className="text-lg font-bold mb-4">Consumers</h3>
    //       <ReactApexChart options={spark32} series={spark32.series} />
    //     </div>

    //     <div className="bg-white p-4 rounded shadow">
    //       <h3 className="text-lg font-bold mb-4">Recyclers</h3>
    //       <ReactApexChart options={spark33} series={spark33.series} />
    //     </div>

    //     <div className="bg-white p-4 rounded shadow">
    //       <h3 className="text-lg font-bold mb-4">Collectors</h3>
    //       <ReactApexChart options={spark34} series={spark34.series} />
    //     </div>
    //   </div>
    //   <div className="map-chart-section flex">
      
      
    //   <div className="chart-container w-3/12">
    //     <ReactApexChart options={spark4.options} series={spark4.series} type="pie" width={380} />
    //   </div>

    //   <div className="map-placeholder w-9/12">
    //     <LoadScript googleMapsApiKey={MAP_API_KEY}>
    //       <GoogleMap
    //         mapContainerStyle={{ width: '100%', height: '400px' }}
    //         center={{ lat: 31.5204, lng: 74.3587 }} // Initial center: Lahore
    //         zoom={8}
    //         // onLoad={(map) => setMap(map)}
    //       >
    //     {districts.map((district) => (
    //             <Marker
    //               key={district.name}
    //               position={{ lat: district.lat, lng: district.lng }}
    //               title={getMarkerTitle(district)}
    //               onClick={() => setSelectedDistrict(district)}
    //             >
    //               {selectedDistrict && selectedDistrict.name === district.name && (
    //                 <InfoWindow
    //                   position={{ lat: district.lat, lng: district.lng }}
    //                   onCloseClick={() => setSelectedDistrict(null)}
    //                 >
    //                   <div>
    //                     <h2>{district.name}</h2>
    //                     <p>Population: {district.population}M</p>
    //                     <p>Literacy Rate: {district.literacyRate}%</p>
    //                   </div>
    //                 </InfoWindow>
    //               )}
    //             </Marker>

    //     ))}

    //       </GoogleMap>
    //     </LoadScript>
    //     </div>
        
    //   </div>
    // </div>
  );
};

// KPI Block Component
interface KPIBlockProps {
  label: string;
  value: string;
  color: string;
}

const KPIBlock: React.FC<KPIBlockProps> = ({ label, value, color }) => (
  <div className={`kpi-block ${color}`}>
    <h3>{label}</h3>
    <p>{value}</p>
  </div>
);

const KPIDashboard = () => {
  return <KPIDashboardBase />
}

export default KPIDashboard; // Export only the base component
