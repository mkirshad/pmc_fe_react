import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import './KPIDashboard.css';
import { GoogleMap, LoadScript, Marker, InfoWindow  } from '@react-google-maps/api';
import Select from 'react-select';
import DemoBoxContent from '@/components/docs/DemoBoxContent';
import { MaterialReactTable } from 'material-react-table';
import { FaIndustry, FaUser, FaRecycle, FaTruck } from 'react-icons/fa';
import { number } from 'zod';

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
const SparklineData31: number[] = [2,1];
const SparklineData32: number[] = [1,1,1];
const SparklineData33: number[] = [2];
const SparklineData34: number[] = [1,2,1];

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
      data: randomizeArray(SparklineData31),
    },
  ],
  labels: [...Array(2).keys()].map((n) => `2024-09-0${n + 1}`),
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    min: 0,
  },
  colors: ['#008FFB', ],
  title: {
    text: '3',
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
      data: randomizeArray(SparklineData32),
    },
  ],
  labels: [...Array(3).keys()].map((n) => `2018-10-0${n + 1}`),
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    min: 0,
  },
  colors: ['#00E396',],
  title: {
    text: '2',
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
      data: randomizeArray(SparklineData33),
    },
  ],
  labels: [...Array(1).keys()].map((n) => `2018-09-0${n + 1}`),
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    min: 0,
  },
  colors: ['#FEB019',],
  title: {
    text: '2',
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
      data: randomizeArray(SparklineData34),
    },
  ],
  labels: [...Array(3).keys()].map((n) => `2018-09-0${n + 1}`),
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    min: 0,
  },
  colors: ['#FF4560' ],
  title: {
    text: '4',
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

interface TotalNumbers {
  series: number[];
  options: {
    chart: {
      height: number;
      type: string;
    };
    plotOptions: {
      radialBar: {
        offsetY: number;
        startAngle: number;
        endAngle: number;
        hollow: {
          margin: number;
          size: string;
          background: string;
          image: undefined;
        };
        dataLabels: {
          name: {
            show: boolean;
          };
          value: {
            show: boolean;
          };
        };
        barLabels: {
          enabled: boolean;
          useSeriesColors: boolean;
          offsetX: number;
          fontSize: string;
          formatter: (seriesName: string, opts: any) => string;
        };
      };
    };
    colors: string[];
    labels: string[];
    responsive: {
      breakpoint: number;
      options: {
        legend: {
          show: boolean;
        };
      };
    }[];
  };
}


const total_numbers: TotalNumbers = {
  series: [294, 76, 67, 61, 90],
  options: {
    chart: {
      height: 390,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          offsetX: -8,
          fontSize: '16px',
          formatter: function (seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
          },
        },
      },
    },
    colors: ['#1000eb', '#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
    labels: ['Total', 'Producers', 'Consumers', 'Recyclers', 'Collectors'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  },
};


const total_numbers_producers: TotalNumbers = {
  series: [150, 30, 44, 76],
  options: {
    chart: {
      height: 390,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          offsetX: -8,
          fontSize: '16px',
          formatter: function (seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
          },
        },
      },
    },
    colors: ['#1000eb', '#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
    labels: ['Total Applicants', 'In-Progress', 'Rejected', 'Approved'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  },
};






interface AllStackholdersChartDataTypes {
  series: {
    name: string;
    data: number[];
  }[];
  options: {
    chart: {
      type: string;
      height: number;
      stacked: boolean;
      events: {
        dataPointSelection: (
          event: any,
          chartContext: any,
          config: { seriesIndex: number; dataPointIndex: number }
        ) => void;
      };
    };
    plotOptions: {
      bar: {
        horizontal: boolean;
        dataLabels: {
          total: {
            enabled: boolean;
            offsetX: number;
            style: {
              fontSize: string;
              fontWeight: number;
            };
          };
        };
      };
    };
    stroke: {
      width: number;
      colors: string[];
    };
    title: {
      text: string;
    };
    xaxis: {
      categories: string[];
      labels: {
        formatter: (val: string) => string;
      };
    };
    yaxis: {
      title: {
        text: string | undefined;
      };
    };
    tooltip: {
      y: {
        formatter: (val: number) => string;
      };
    };
    fill: {
      opacity: number;
    };
    legend: {
      position: string;
      horizontalAlign: string;
      offsetX: number;
    };
  };
}



const sample_district_data = [
  {category: 'Producers', district: 'Lahore', seriesName:'In-Progress', count:2},
  {category: 'Producers', district: 'Rawalpindi', seriesName:'In-Progress', count:1},
  {category: 'Producers', district: 'Bahawalpur', seriesName:'In-Progress', count:0},
  {category: 'Producers', district: 'Bahawalnagar', seriesName:'In-Progress', count:0},
  {category: 'Producers', district: 'Gujranwala', seriesName:'In-Progress', count:0},
  {category: 'Producers', district: 'Sialkot', seriesName:'In-Progress', count:0},
  {category: 'Producers', district: 'Lahore', seriesName:'In-Progress', count:0},
  {category: 'Producers', district: 'Rawalpindi', seriesName:'In-Progress', count:0},
  {category: 'Producers', district: 'Bahawalpur', seriesName:'In-Progress', count:0},
  {category: 'Producers', district: 'Bahawalnagar', seriesName:'In-Progress', count:0},
  {category: 'Producers', district: 'Gujranwala', seriesName:'In-Progress', count:0},
  {category: 'Producers', district: 'Sialkot', seriesName:'In-Progress', count:0},

  {category: 'Consumers', district: 'Lahore', seriesName:'In-Progress', count:2},
  {category: 'Consumers', district: 'Rawalpindi', seriesName:'In-Progress', count:1},
  {category: 'Consumers', district: 'Bahawalpur', seriesName:'In-Progress', count:1},

  {category: 'Recyclers', district: 'Lahore', seriesName:'In-Progress', count:1},
  {category: 'Recyclers', district: 'Rawalpindi', seriesName:'In-Progress', count:1},

  {category: 'Collectors', district: 'Lahore', seriesName:'In-Progress', count:2},
  {category: 'Collectors', district: 'Rawalpindi', seriesName:'In-Progress', count:2},
  {category: 'Collectors', district: 'Bahawalpur', seriesName:'In-Progress', count:1},


  {category: 'Producers', district: 'Lahore', seriesName:'Rejected', count:1},
  {category: 'Producers', district: 'Rawalpindi', seriesName:'Rejected', count:1},

  {category: 'Consumers', district: 'Lahore', seriesName:'Rejected', count:1},
  {category: 'Consumers', district: 'Rawalpindi', seriesName:'Rejected', count:1},
  {category: 'Consumers', district: 'Bahawalpur', seriesName:'Rejected', count:1},

  {category: 'Recyclers', district: 'Lahore', seriesName:'Rejected', count:1},

  {category: 'Collectors', district: 'Lahore', seriesName:'Rejected', count:2},

  {category: 'Producers', district: 'Lahore', seriesName:'Approved', count:1},
  {category: 'Producers', district: 'Rawalpindi', seriesName:'Approved', count:1},
  {category: 'Producers', district: 'Bahawalpur', seriesName:'Approved', count:1},

  {category: 'Consumers', district: 'Lahore', seriesName:'Approved', count:1},
  {category: 'Consumers', district: 'Rawalpindi', seriesName:'Approved', count:1},
  {category: 'Consumers', district: 'Bahawalpur', seriesName:'Approved', count:1},

  {category: 'Recyclers', district: 'Lahore', seriesName:'Approved', count:2},

  {category: 'Collectors', district: 'Lahore', seriesName:'Approved', count:2},
  {category: 'Collectors', district: 'Rawalpindi', seriesName:'Approved', count:1},
  {category: 'Collectors', district: 'Bahawalpur', seriesName:'Approved', count:1},
]

const data_applicants = [
 
  {category: 'Producers', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'ABC', 'Application ID':'A1234', 'Location URL':'https://www.google.com/'},
  {category: 'Producers', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'DEF', 'Application ID':'A1235', 'Location URL':'https://www.google.com/'},

  {category: 'Producers', district: 'Rawalpindi', seriesName:'In-Progress', 'Company Name':'DEG', 'Application ID':'A1236', 'Location URL':'https://www.google.com/'},

  {category: 'Consumers', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'DEH', 'Application ID':'A1237', 'Location URL':'https://www.google.com/'},
  {category: 'Consumers', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'DEI', 'Application ID':'A1238', 'Location URL':'https://www.google.com/'},
  {category: 'Consumers', district: 'Rawalpindi', seriesName:'In-Progress', 'Company Name':'DEJ', 'Application ID':'A1239', 'Location URL':'https://www.google.com/'},
  {category: 'Consumers', district: 'Bahawalpur', seriesName:'In-Progress', 'Company Name':'DEK', 'Application ID':'A1210', 'Location URL':'https://www.google.com/'},

  {category: 'Recyclers', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'DEL', 'Application ID':'A123511', 'Location URL':'https://www.google.com/'},
  {category: 'Recyclers', district: 'Rawalpindi', seriesName:'In-Progress', 'Company Name':'DEM', 'Application ID':'A123512', 'Location URL':'https://www.google.com/'},

  {category: 'Collectors', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'DEN', 'Application ID':'A123513', 'Location URL':'https://www.google.com/'},
  {category: 'Collectors', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'DEO', 'Application ID':'A123514', 'Location URL':'https://www.google.com/'},
  {category: 'Collectors', district: 'Rawalpindi', seriesName:'In-Progress', 'Company Name':'DEP', 'Application ID':'A123515', 'Location URL':'https://www.google.com/'},
  {category: 'Collectors', district: 'Rawalpindi', seriesName:'In-Progress', 'Company Name':'DEQ', 'Application ID':'A123516', 'Location URL':'https://www.google.com/'},
  {category: 'Collectors', district: 'Bahawalpur', seriesName:'In-Progress', 'Company Name':'DER', 'Application ID':'A123517', 'Location URL':'https://www.google.com/'},


  {category: 'Producers', district: 'Lahore', seriesName:'Rejected', 'Company Name':'DES', 'Application ID':'A123518', 'Location URL':'https://www.google.com/'},
  {category: 'Producers', district: 'Rawalpindi', seriesName:'Rejected', 'Company Name':'DET', 'Application ID':'A123519', 'Location URL':'https://www.google.com/'},

  {category: 'Consumers', district: 'Lahore', seriesName:'Rejected', 'Company Name':'DEU', 'Application ID':'A123520', 'Location URL':'https://www.google.com/'},
  {category: 'Consumers', district: 'Rawalpindi', seriesName:'Rejected', 'Company Name':'DEV', 'Application ID':'A123521', 'Location URL':'https://www.google.com/'},
  {category: 'Consumers', district: 'Bahawalpur', seriesName:'Rejected', 'Company Name':'DEW', 'Application ID':'A123522', 'Location URL':'https://www.google.com/'},

  {category: 'Recyclers', district: 'Lahore', seriesName:'Rejected', 'Company Name':'DEX', 'Application ID':'A123523', 'Location URL':'https://www.google.com/'},

  {category: 'Collectors', district: 'Lahore', seriesName:'Rejected', 'Company Name':'DEY', 'Application ID':'A123524', 'Location URL':'https://www.google.com/'},
  {category: 'Collectors', district: 'Lahore', seriesName:'Rejected', 'Company Name':'DEZ', 'Application ID':'A123525', 'Location URL':'https://www.google.com/'},

  {category: 'Producers', district: 'Lahore', seriesName:'Approved', 'Company Name':'DEZ1', 'Application ID':'A123526', 'Location URL':'https://www.google.com/'},
  {category: 'Producers', district: 'Rawalpindi', seriesName:'Approved', 'Company Name':'DEz2', 'Application ID':'A123527', 'Location URL':'https://www.google.com/'},
  {category: 'Producers', district: 'Bahawalpur', seriesName:'Approved', 'Company Name':'DEz3', 'Application ID':'A123528', 'Location URL':'https://www.google.com/'},

  {category: 'Consumers', district: 'Lahore', seriesName:'Approved', 'Company Name':'DEZ4', 'Application ID':'A123529', 'Location URL':'https://www.google.com/'},
  {category: 'Consumers', district: 'Rawalpindi', seriesName:'Approved', 'Company Name':'DEZD', 'Application ID':'A123530', 'Location URL':'https://www.google.com/'},
  {category: 'Consumers', district: 'Bahawalpur', seriesName:'Approved', 'Company Name':'DEZE', 'Application ID':'A123531', 'Location URL':'https://www.google.com/'},

  {category: 'Recyclers', district: 'Lahore', seriesName:'Approved', 'Company Name':'DEZF', 'Application ID':'A123532', 'Location URL':'https://www.google.com/'},
  {category: 'Recyclers', district: 'Lahore', seriesName:'Approved', 'Company Name':'DEZG', 'Application ID':'A123533', 'Location URL':'https://www.google.com/'},

  {category: 'Collectors', district: 'Lahore', seriesName:'Approved', 'Company Name':'DEZH', 'Application ID':'A123534', 'Location URL':'https://www.google.com/'},
  {category: 'Collectors', district: 'Lahore', seriesName:'Approved', 'Company Name':'DEZI', 'Application ID':'A123535', 'Location URL':'https://www.google.com/'},
  {category: 'Collectors', district: 'Rawalpindi', seriesName:'Approved', 'Company Name':'DEZJ', 'Application ID':'A123536', 'Location URL':'https://www.google.com/'},
  {category: 'Collectors', district: 'Bahawalpur', seriesName:'Approved', 'Company Name':'DEZK', 'Application ID':'A123537', 'Location URL':'https://www.google.com/'},
]




export const KPIDashboardBase: React.FC<BaseKPIDashboardProps> = ({
  loginUrl = '/sign-in',
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  const [selectedOptions, setSelectedOptions] = useState(null); //SaveFilter
  const [selectedOptionsList, setSelectedOptionsList] = useState(null); //SaveFilter
  const [options, setOptions] = useState(
    [
      { value: 'Lahore', label: 'Lahore', color: '#00B8D9', isFixed: true },
      { value: 'Rawalpindi', label: 'Rawalpindi', color: '#5243AA' },
      { value: 'Bahawalpur', label: 'Bahawalpur', color: '#FF5630', isFixed: true },
     ]
  )

  interface DistrictData {
    category: string;
    district: string;
    seriesName: string;
    count: number;
  }

  const [filtered_districts_data, setFilteredDistrictsData] = useState<DistrictData[]>([])
  const [filter_district, setFilterDistrict] = useState<DistrictData>(null)
  const [filter_district_category, setFilterDistrictCategory] = useState<string>('')
  const [filter_stackholder_series, setFilterStackholderSeries] = useState<string>('')


  function showStatistics (seriesName: string, category: string): void{
    console.log(seriesName)
    let a0:number = 0;
    const res: DistrictData[] = sample_district_data.filter(
      item => item.seriesName === seriesName && item.category === category
    );
    setFilteredDistrictsData(res)
    console.log(res)
    setFilterDistrictCategory(category)
    setFilterStackholderSeries(seriesName)
    console.log('District calculated: ', category)
    console.log('seriesName calculated: ', seriesName)
  }
  
  const AllStackholdersChartData: AllStackholdersChartDataTypes = {
    series: [
      {
        name: 'In-Progress',
        data: [3, 4, 2, 5],
      },
      {
        name: 'Rejected',
        data: [2, 3, 1, 2],
      },
      {
        name: 'Approved',
        data: [3, 3, 2, 4],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const { seriesIndex, dataPointIndex } = config;
            const seriesName = AllStackholdersChartData.series[seriesIndex].name;
            const category = AllStackholdersChartData.options.xaxis.categories[dataPointIndex];
            showStatistics(seriesName, category);
            console.log(`Series: ${seriesName}, Category: ${category}`);
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      title: {
        text: 'All Stack Holders',
      },
      xaxis: {
        categories: ['Producers', 'Consumers', 'Recyclers', 'Collectors'],
        labels:
        {
          formatter: (val) => `${val}`,
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val}`,
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX:   
   40,
      },
    },
  };

  const tilesData = [
    { title: 'Producers', data: [{ value: 25, label: 'Applications' }, { value: 10, label: 'Licenses' }, { value: 15, label: 'In-Progress' }], color: 'bg-orange-500', icon: <FaIndustry className="text-white text-3xl" /> },
    { title: 'Consumers', data: [{ value: 30, label: 'Applications' }, { value: 20, label: 'Licenses' }, { value: 18, label: 'In-Progress' }], color: 'bg-blue-500', icon: <FaUser className="text-white text-3xl" /> },
    { title: 'Recyclers', data: [{ value: 10, label: 'Applications' }, { value: 5, label: 'Licenses' }, { value: 7, label: 'In-Progress' }], color: 'bg-green-500', icon: <FaRecycle className="text-white text-3xl" /> },
    { title: 'Collectors', data: [{ value: 15, label: 'Applications' }, { value: 8, label: 'Licenses' }, { value: 10, label: 'In-Progress' }], color: 'bg-yellow-500', icon: <FaTruck className="text-white text-3xl" /> },
  ];

  const chartData = {
    series: [
      {
        name: 'Producers',
        data: [120, 130, 110, 90, 70, 85]
      },
      {
        name: 'Consumers',
        data: [100, 115, 105, 85, 75, 95]
      },
      {
        name: 'Recyclers',
        data: [80, 95, 75, 65, 55, 70]
      },
      {
        name: 'Collectors',
        data: [60, 70, 65, 55, 45, 60]
      }
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        },
        events: {
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            const { seriesIndex, dataPointIndex } = config;
            const seriesName = chartData.series[seriesIndex].name;
            const category = chartData.options.xaxis.categories[dataPointIndex];
            showStatistics(seriesName, category);
            console.log(`Series: ${seriesName}, Category: ${category}`);
          },
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        }
      },
      xaxis: {
        categories: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Sargodha'],
        labels: {
          style: {
            colors: [] as string[],
            fontSize: '12px'
          }
        }
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1,
        colors: ['#F97316', '#3B82F6', '#22C55E', '#EAB308'] // Orange, Blue, Green, Yellow
      },
      colors: ['#F97316', '#3B82F6', '#22C55E', '#EAB308'], // Orange, Blue, Green, Yellow
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + ' count';
          }
        }
      },
      title: {
        text: 'All Stack Holders - Total Applicants',
      }
    }
  };

  return (
    <div className="dashboard-container flex flex-col flex-auto ">
      <header className="dashboard-header">
        <h1>Admin - Data Analytics</h1>
      </header>
      
      {/* <div className="kpi-cards flex gap-4 flex-auto flex-col lg:flex-row ">
        
        <Tile title="Producers" data={tileData} />
        
        <Tile title="Consumers" data={tileData} />
        <Tile title="Recyclers" data={tileData} />
        <Tile title="Collectors" data={tileData} />
      </div> */}


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {tilesData.map((tile, index) => (
        <Tile key={index} title={tile.title} data={tile.data} color={tile.color} icon={tile.icon} />
      ))}
    </div>
    
      <div id="chart" className='mt-5'>
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </div>
      {filter_district_category!==''?
      <div className='mt-2'>
          <MaterialReactTable
              columns = {Object.keys(data_applicants[0]).map((header) => ({
                  accessorKey: header,
                  header: header.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
                  size:200,
                }))
              }
              data = {filter_district_category!==''?data_applicants.filter(applicant => {
                // Assuming 'district' is a property in your applicant objects
                return (applicant.district === filter_district_category && applicant.category === filter_stackholder_series);
              }):[]}
              initialState={{
                  // pagination: {
                  // pageSize: 200,
                  // },
                  showColumnFilters:true,
                  density: 'compact'
              }}
              //optionally override the default column widths
              defaultColumn={{
                  maxSize: 420,
                  minSize: 1,
                  size: 100, //default size is usually 180
              }}
              enableColumnResizing
              columnResizeMode="onChange" //default
          />
      </div>
      :<></>
            }
    </div>
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
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <p className="text-3xl font-bold text-white">{item.value}</p>
            <p className="text-sm text-white">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default KPIDashboard; // Export only the base component
