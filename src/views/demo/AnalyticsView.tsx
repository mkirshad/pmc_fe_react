import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import './KPIDashboard.css';
import { GoogleMap, LoadScript, Marker, InfoWindow  } from '@react-google-maps/api';
import Select from 'react-select';
import DemoBoxContent from '@/components/docs/DemoBoxContent';
import { MaterialReactTable } from 'material-react-table';
import { FaIndustry, FaUser, FaRecycle, FaTruck } from 'react-icons/fa';
import { number } from 'zod';
import AxiosBase from '../../services/axios/AxiosBase';

// new ApexCharts(document.querySelector("#spark3"), spark3).render();

// Base component for the KPI Dashboard
interface BaseKPIDashboardProps {
  loginUrl?: string;
}





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


// based upon the models of django, I want to get applicants statistics and want to populate data_applicants and tilesData
// category is registration_for district is district in BusinessProfile seriesName is application_status, 
// Applications count of applicantDetail is the application_status != 'Created' Licenses count is the applicantDetail count 'Completed'
// In-Progress count of applications is the count of appliantDetail where application_status != 'Created' and applicantDetail count application_status != 'Completed' and applicantDetail count application_status != 'Rejected'
// Then I want to build statistics of each category that is registration_for district wise just like name: 'Producers', data: [120, 130, 110, 90, 70, 85]
// const data_applicants = [
 
//   {category: 'Producers', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'ABC', 'Application ID':'A1234', 'Location URL':'https://www.google.com/'},
//   {category: 'Producers', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'DEF', 'Application ID':'A1235', 'Location URL':'https://www.google.com/'},

//   {category: 'Producers', district: 'Rawalpindi', seriesName:'In-Progress', 'Company Name':'DEG', 'Application ID':'A1236', 'Location URL':'https://www.google.com/'},

//   {category: 'Consumers', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'DEH', 'Application ID':'A1237', 'Location URL':'https://www.google.com/'},
//   {category: 'Consumers', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'DEI', 'Application ID':'A1238', 'Location URL':'https://www.google.com/'},
//   {category: 'Consumers', district: 'Rawalpindi', seriesName:'In-Progress', 'Company Name':'DEJ', 'Application ID':'A1239', 'Location URL':'https://www.google.com/'},
//   {category: 'Consumers', district: 'Bahawalpur', seriesName:'In-Progress', 'Company Name':'DEK', 'Application ID':'A1210', 'Location URL':'https://www.google.com/'},

//   {category: 'Recyclers', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'DEL', 'Application ID':'A123511', 'Location URL':'https://www.google.com/'},
//   {category: 'Recyclers', district: 'Rawalpindi', seriesName:'In-Progress', 'Company Name':'DEM', 'Application ID':'A123512', 'Location URL':'https://www.google.com/'},

//   {category: 'Collectors', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'DEN', 'Application ID':'A123513', 'Location URL':'https://www.google.com/'},
//   {category: 'Collectors', district: 'Lahore', seriesName:'In-Progress', 'Company Name':'DEO', 'Application ID':'A123514', 'Location URL':'https://www.google.com/'},
//   {category: 'Collectors', district: 'Rawalpindi', seriesName:'In-Progress', 'Company Name':'DEP', 'Application ID':'A123515', 'Location URL':'https://www.google.com/'},
//   {category: 'Collectors', district: 'Rawalpindi', seriesName:'In-Progress', 'Company Name':'DEQ', 'Application ID':'A123516', 'Location URL':'https://www.google.com/'},
//   {category: 'Collectors', district: 'Bahawalpur', seriesName:'In-Progress', 'Company Name':'DER', 'Application ID':'A123517', 'Location URL':'https://www.google.com/'},


//   {category: 'Producers', district: 'Lahore', seriesName:'Rejected', 'Company Name':'DES', 'Application ID':'A123518', 'Location URL':'https://www.google.com/'},
//   {category: 'Producers', district: 'Rawalpindi', seriesName:'Rejected', 'Company Name':'DET', 'Application ID':'A123519', 'Location URL':'https://www.google.com/'},

//   {category: 'Consumers', district: 'Lahore', seriesName:'Rejected', 'Company Name':'DEU', 'Application ID':'A123520', 'Location URL':'https://www.google.com/'},
//   {category: 'Consumers', district: 'Rawalpindi', seriesName:'Rejected', 'Company Name':'DEV', 'Application ID':'A123521', 'Location URL':'https://www.google.com/'},
//   {category: 'Consumers', district: 'Bahawalpur', seriesName:'Rejected', 'Company Name':'DEW', 'Application ID':'A123522', 'Location URL':'https://www.google.com/'},

//   {category: 'Recyclers', district: 'Lahore', seriesName:'Rejected', 'Company Name':'DEX', 'Application ID':'A123523', 'Location URL':'https://www.google.com/'},

//   {category: 'Collectors', district: 'Lahore', seriesName:'Rejected', 'Company Name':'DEY', 'Application ID':'A123524', 'Location URL':'https://www.google.com/'},
//   {category: 'Collectors', district: 'Lahore', seriesName:'Rejected', 'Company Name':'DEZ', 'Application ID':'A123525', 'Location URL':'https://www.google.com/'},

//   {category: 'Producers', district: 'Lahore', seriesName:'Approved', 'Company Name':'DEZ1', 'Application ID':'A123526', 'Location URL':'https://www.google.com/'},
//   {category: 'Producers', district: 'Rawalpindi', seriesName:'Approved', 'Company Name':'DEz2', 'Application ID':'A123527', 'Location URL':'https://www.google.com/'},
//   {category: 'Producers', district: 'Bahawalpur', seriesName:'Approved', 'Company Name':'DEz3', 'Application ID':'A123528', 'Location URL':'https://www.google.com/'},

//   {category: 'Consumers', district: 'Lahore', seriesName:'Approved', 'Company Name':'DEZ4', 'Application ID':'A123529', 'Location URL':'https://www.google.com/'},
//   {category: 'Consumers', district: 'Rawalpindi', seriesName:'Approved', 'Company Name':'DEZD', 'Application ID':'A123530', 'Location URL':'https://www.google.com/'},
//   {category: 'Consumers', district: 'Bahawalpur', seriesName:'Approved', 'Company Name':'DEZE', 'Application ID':'A123531', 'Location URL':'https://www.google.com/'},

//   {category: 'Recyclers', district: 'Lahore', seriesName:'Approved', 'Company Name':'DEZF', 'Application ID':'A123532', 'Location URL':'https://www.google.com/'},
//   {category: 'Recyclers', district: 'Lahore', seriesName:'Approved', 'Company Name':'DEZG', 'Application ID':'A123533', 'Location URL':'https://www.google.com/'},

//   {category: 'Collectors', district: 'Lahore', seriesName:'Approved', 'Company Name':'DEZH', 'Application ID':'A123534', 'Location URL':'https://www.google.com/'},
//   {category: 'Collectors', district: 'Lahore', seriesName:'Approved', 'Company Name':'DEZI', 'Application ID':'A123535', 'Location URL':'https://www.google.com/'},
//   {category: 'Collectors', district: 'Rawalpindi', seriesName:'Approved', 'Company Name':'DEZJ', 'Application ID':'A123536', 'Location URL':'https://www.google.com/'},
//   {category: 'Collectors', district: 'Bahawalpur', seriesName:'Approved', 'Company Name':'DEZK', 'Application ID':'A123537', 'Location URL':'https://www.google.com/'},
// ]

// const tilesData = [
//   { title: 'Producers', data: [{ value: 25, label: 'Applications' }, { value: 10, label: 'Licenses' }, { value: 15, label: 'In-Progress' }], color: 'bg-orange-500', icon: <FaIndustry className="text-white text-3xl" /> },
//   { title: 'Consumers', data: [{ value: 30, label: 'Applications' }, { value: 20, label: 'Licenses' }, { value: 18, label: 'In-Progress' }], color: 'bg-blue-500', icon: <FaUser className="text-white text-3xl" /> },
//   { title: 'Recyclers', data: [{ value: 10, label: 'Applications' }, { value: 5, label: 'Licenses' }, { value: 7, label: 'In-Progress' }], color: 'bg-green-500', icon: <FaRecycle className="text-white text-3xl" /> },
//   { title: 'Collectors', data: [{ value: 15, label: 'Applications' }, { value: 8, label: 'Licenses' }, { value: 10, label: 'In-Progress' }], color: 'bg-yellow-500', icon: <FaTruck className="text-white text-3xl" /> },
// ];

// const chartData = {
//   series: [
//     {
//       name: 'Producers',
//       data: [120, 130, 110, 90, 70, 85]
//     },
//     {
//       name: 'Consumers',
//       data: [100, 115, 105, 85, 75, 95]
//     },
//     {
//       name: 'Recyclers',
//       data: [80, 95, 75, 65, 55, 70]
//     },
//     {
//       name: 'Collectors',
//       data: [60, 70, 65, 55, 45, 60]
//     }
//   ],
//   options: {
//     chart: {
//       type: 'bar' as const,
//       height: 350,
//       stacked: true,
//       toolbar: {
//         show: true
//       },
//       zoom: {
//         enabled: true
//       },
//       events: {
//         dataPointSelection: (event: any, chartContext: any, config: any) => {
//           const { seriesIndex, dataPointIndex } = config;
//           const seriesName = chartData.series[seriesIndex].name;
//           const category = chartData.options.xaxis.categories[dataPointIndex];
//           showStatistics(seriesName, category);
//           console.log(`Series: ${seriesName}, Category: ${category}`);
//         },
//       }
//     },
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           legend: {
//             position: 'bottom',
//             offsetX: -10,
//             offsetY: 0
//           }
//         }
//       }
//     ],
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         borderRadius: 10,
//         dataLabels: {
//           total: {
//             enabled: true,
//             style: {
//               fontSize: '13px',
//               fontWeight: 900
//             }
//           }
//         }
//       }
//     },
//     xaxis: {
//       categories: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Sargodha'],
//       labels: {
//         style: {
//           colors: [] as string[],
//           fontSize: '12px'
//         }
//       }
//     },
//     legend: {
//       position: 'right',
//       offsetY: 40
//     },
//     fill: {
//       opacity: 1,
//       colors: ['#F97316', '#3B82F6', '#22C55E', '#EAB308'] // Orange, Blue, Green, Yellow
//     },
//     colors: ['#F97316', '#3B82F6', '#22C55E', '#EAB308'], // Orange, Blue, Green, Yellow
//     tooltip: {
//       y: {
//         formatter: function (val: number) {
//           return val + ' count';
//         }
//       }
//     },
//     title: {
//       text: 'All Stack Holders - Total Applicants',
//     }
//   }
// };


export const KPIDashboardBase: React.FC<BaseKPIDashboardProps> = ({
  loginUrl = '/sign-in',
}) => {


  const [tilesData, setTilesData] = useState([]);
  const [dataApplicants, setDataApplicants] = useState([]);
  const [chartData, setChartData] = useState({ series: [], options: {} });

  const [filterDistrictCategory, setFilterDistrictCategory] = useState<string>('');
  const [filterStackholderSeries, setFilterStackholderSeries] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
    const respons = await AxiosBase.get('/pmc/applicant-statistics/', {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        });
      console.log(respons.data)

          const districtData = respons.data.district_data.reduce((acc, item) => {
            const category = item.registration_for;
            const district = item.businessprofile__district__district_name;
            if (!acc[category]) acc[category] = [];
            acc[category].push(item.count);
            return acc;
          })


      const iconMap: Record<string, JSX.Element> = {
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
    const dynamicTiles = respons.data.registration_statistics.map((stat: any) => ({
      title: stat.registration_for,
      data: [
        { value: stat.Applications, label: 'Applications' },
        { value: stat.Licenses, label: 'Licenses' },
        { value: stat.InProgress, label: 'In-Progress' },
      ],
      color: colorMap[stat.registration_for] || 'bg-gray-500', // Default color
      icon: iconMap[stat.registration_for] || null,           // Default icon
    }));

    setTilesData(dynamicTiles);

          // // Tiles data
          // setTilesData([
          //   {
          //     title: 'Producers',
          //     data: [
          //       { value: respons.data.statistics?.Applications || 0, label: 'Applications' },
          //       { value: respons.data.statistics?.Licenses || 0, label: 'Licenses' },
          //       { value: respons.data.statistics?.InProgress || 0, label: 'In Progress' },
          //     ],
          //     color: 'bg-orange-500',
          //     icon: <FaIndustry />,
          //   },
          //   {
          //     title: 'Consumers',
          //     data: [
          //       { value: respons.data.statistics?.Applications || 0, label: 'Applications' },
          //       { value: respons.data.statistics?.Licenses || 0, label: 'Licenses' },
          //       { value: respons.data.statistics?.InProgress || 0, label: 'In Progress' },
          //     ],
          //     color: 'bg-blue-500',
          //     icon: <FaUser />,
          //   },
          //   {
          //     title: 'Recyclers',
          //     data: [
          //       { value: respons.data.statistics?.Applications || 0, label: 'Applications' },
          //       { value: respons.data.statistics?.Licenses || 0, label: 'Licenses' },
          //       { value: respons.data.statistics?.InProgress || 0, label: 'In Progress' },
          //     ],
          //     color: 'bg-green-500',
          //     icon: <FaRecycle />,
          //   },
          //   {
          //     title: 'Collectors',
          //     data: [
          //       { value: respons.data.statistics?.Applications || 0, label: 'Applications' },
          //       { value: respons.data.statistics?.Licenses || 0, label: 'Licenses' },
          //       { value: respons.data.statistics?.InProgress || 0, label: 'In Progress' },
          //     ],
          //     color: 'bg-yellow-500',
          //     icon: <FaTruck />,
          //   },
          // ]);

          // Process district-wise statistics for ApexCharts
          const districts = Array.from(new Set(respons.data.district_data.map(item => item.businessprofile__district__district_name)));
          const categories = Array.from(new Set(respons.data.district_data.map(item => item.registration_for)));

          const series = categories.map(category => {
            const dataPoints = districts.map(district => {
              const record = respons.data.district_data.find(item => item.registration_for === category && item.businessprofile__district__district_name === district);
              return record ? record.count : 0;
            });
            return { name: category, data: dataPoints };
          });

          setChartData({
            series: series,
            options: {
              chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    const { seriesIndex, dataPointIndex } = config;
                    const seriesName = series[seriesIndex].name;
                    const category = districts[dataPointIndex];
                    showStatistics(seriesName, category);
                    console.log(`Series: ${seriesName}, Category: ${category}`);
                  },
                },
              },
              title: { text: 'Applications by Category and District' },
              xaxis: { categories: districts },
              legend: { position: 'right' },
              plotOptions: { bar: { horizontal: false, borderRadius: 5 } },
              colors: ['#F97316', '#3B82F6', '#22C55E', '#EAB308'],
            },
          });
          

          // Grid data
          setDataApplicants(respons.data.grid_data);
    }

    fetchData();
  }, []);

  const columns = [
    { accessorKey: 'first_name', header: 'First Name' },
    { accessorKey: 'last_name', header: 'Last Name' },
    { accessorKey: 'cnic', header: 'CNIC' },
    { accessorKey: 'mobile_no', header: 'Mobile No' },
    { accessorKey: 'application_status', header: 'Status' },
    { accessorKey: 'tracking_number', header: 'Tracking Number' },
    { accessorKey: 'assigned_group', header: 'Assigned Group' },
    { accessorKey: 'registration_for', header: 'Category' },
  ];


  function showStatistics (seriesName: string, category: string): void{

    setFilterDistrictCategory(category)
    setFilterStackholderSeries(seriesName)
    console.log('District calculated: ', category)
    console.log('seriesName calculated: ', seriesName)
  }
  
  const AllStackholdersChartData: AllStackholdersChartDataTypes = {
    series: [
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



  return (
    <div className="dashboard-container flex flex-col flex-auto">
      <header className="dashboard-header">
        <h1>Admin - Data Analytics</h1>
      </header>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tilesData.map((tile, index) => (
          <Tile key={index} title={tile.title} data={tile.data} color={tile.color} icon={tile.icon} />
        ))}
      </div>

      {/* React Apex Chart */}
      <div id="chart" className="mt-5">
        {chartData.series.length > 0 && (
          <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
        )}
      </div>

      {/* Filtered Grid */}
      {filterDistrictCategory !== '' && (
        <div className="mt-2">
          <MaterialReactTable
            columns={columns}
            data={dataApplicants.filter(applicant =>
              applicant.businessprofile__district__district_name === filterDistrictCategory
              && applicant.registration_for === filterStackholderSeries
           )
          }
            initialState={{
              // showColumnFilters: true,
              // density: 'compact',
            }}
            enableColumnResizing
          />
        </div>
      )}
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
