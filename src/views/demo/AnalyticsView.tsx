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



export const KPIDashboardBase: React.FC<BaseKPIDashboardProps> = ({
  loginUrl = '/sign-in',
}) => {


  const [tilesData, setTilesData] = useState([]);
  const [dataApplicants, setDataApplicants] = useState([]);
  const [chartData, setChartData] = useState(null);

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
            { value: stat.FeeChallan, label: 'Fee Challan' },
            { value: stat.DO, label: 'DO' },
            { value: stat.PMC, label: 'PMC' },
            { value: stat.Licenses, label: 'Licenses' },
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

          setChartData({
            series: series,
            options: {
              chart: {
                type: 'bar',
                height: 550,
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
          setTilesData(dynamicTiles);
          

          // Grid data
          setDataApplicants(respons.data.grid_data);
    }

    fetchData();
  }, []);

  const columns = [
    { accessorKey: 'tracking_number', header: 'Tracking Number', size:150 },
    { accessorKey: 'first_name', header: 'First Name' },
    { accessorKey: 'last_name', header: 'Last Name' },
    { accessorKey: 'cnic', header: 'CNIC' },
    { accessorKey: 'mobile_no', header: 'Mobile No' },
    { accessorKey: 'application_status', header: 'Status' },
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

console.log('chartData', chartData)
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
        {chartData && chartData.series && chartData.options && (
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
            enableColumnResizing={true}
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
