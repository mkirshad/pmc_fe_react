import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import './KPIDashboard.css';
import { GoogleMap, LoadScript, Marker, InfoWindow  } from '@react-google-maps/api';
import Select from 'react-select';
import DemoBoxContent from '@/components/docs/DemoBoxContent';
import { MaterialReactTable } from 'material-react-table';
import { FaIndustry, FaUser, FaRecycle, FaTruck, FaChartBar } from 'react-icons/fa';
import { number } from 'zod';
import AxiosBase from '../../services/axios/AxiosBase';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import { Divider } from '@mui/material';

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
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
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
        }catch(error){
          const errorDetails = {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
        };

        navigate('/error', { state: { error: errorDetails } });
        }
    }

    fetchData();
  }, []);

  const columns = [
    { accessorKey: 'tracking_number', header: 'Tracking Number', size:150, Cell: ({ cell, row }) => {
                    const id = row.original.id;
                    const url = `/spuid-review/${id}`; // Adjust URL as needed
                    return (
                        <a
                            href={url} // Link to the desired URL
                            target="_blank" // Open in a new tab on click
                            rel="noopener noreferrer" // Security best practices for external links
                            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                        >
                            {cell.getValue() || '-'}
                        </a>
                    );
                }, 
    },
    { accessorKey: 'first_name', header: 'First Name', Cell: ({ cell, row }) => {
                    const id = row.original.id;
                    const url = `/spuid-review/${id}`; // Adjust URL as needed
                    return (
                        <a
                            href={url} // Link to the desired URL
                            target="_blank" // Open in a new tab on click
                            rel="noopener noreferrer" // Security best practices for external links
                            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                        >
                            {cell.getValue() || '-'}
                        </a>
                    );
                },  
              },
    { accessorKey: 'last_name', header: 'Last Name', Cell: ({ cell, row }) => {
                  const id = row.original.id;
                  const url = `/spuid-review/${id}`; // Adjust URL as needed
                  return (
                      <a
                          href={url} // Link to the desired URL
                          target="_blank" // Open in a new tab on click
                          rel="noopener noreferrer" // Security best practices for external links
                          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                      >
                          {cell.getValue() || '-'}
                      </a>
                  );
              },  
            },
    { accessorKey: 'cnic', header: 'CNIC', Cell: ({ cell, row }) => {
                const id = row.original.id;
                const url = `/spuid-review/${id}`; // Adjust URL as needed
                return (
                    <a
                        href={url} // Link to the desired URL
                        target="_blank" // Open in a new tab on click
                        rel="noopener noreferrer" // Security best practices for external links
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                    >
                        {cell.getValue() || '-'}
                    </a>
                );
            },  
          },
    { accessorKey: 'mobile_no', header: 'Mobile No', Cell: ({ cell, row }) => {
                const id = row.original.id;
                const url = `/spuid-review/${id}`; // Adjust URL as needed
                return (
                    <a
                        href={url} // Link to the desired URL
                        target="_blank" // Open in a new tab on click
                        rel="noopener noreferrer" // Security best practices for external links
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                    >
                        {cell.getValue() || '-'}
                    </a>
                );
            },  
          },
    { accessorKey: 'application_status', header: 'Status', Cell: ({ cell, row }) => {
                  const id = row.original.id;
                  const url = `/spuid-review/${id}`; // Adjust URL as needed
                  return (
                      <a
                          href={url} // Link to the desired URL
                          target="_blank" // Open in a new tab on click
                          rel="noopener noreferrer" // Security best practices for external links
                          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                      >
                          {cell.getValue() || '-'}
                      </a>
                  );
              },  
            },
    { accessorKey: 'assigned_group', header: 'Assigned Group', Cell: ({ cell, row }) => {
                const id = row.original.id;
                const url = `/spuid-review/${id}`; // Adjust URL as needed
                return (
                    <a
                        href={url} // Link to the desired URL
                        target="_blank" // Open in a new tab on click
                        rel="noopener noreferrer" // Security best practices for external links
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                    >
                        {cell.getValue() || '-'}
                    </a>
                );
            },  
          },
    { accessorKey: 'registration_for', header: 'Category', Cell: ({ cell, row }) => {
                const id = row.original.id;
                const url = `/spuid-review/${id}`; // Adjust URL as needed
                return (
                    <a
                        href={url} // Link to the desired URL
                        target="_blank" // Open in a new tab on click
                        rel="noopener noreferrer" // Security best practices for external links
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                    >
                        {cell.getValue() || '-'}
                    </a>
                );
            },  
          },
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

console.log('chartData', chartData)
  return (
    <motion.div
    className="banner-container2"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
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
      <nav className="banner-nav">
        <Link to="/sign-in" className="nav-link transition-all duration-300 ease-in-out transform hover:scale-105">
          Staff Login
        </Link>
      </nav>
    </header>


    <div className="dashboard-container flex flex-col flex-auto">
      <header className="dashboard-header">
        <h1>Admin - Data Analytics</h1>
      </header>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
    </motion.div>
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
          <div key={index} className="text-center" title={item.title}> {/* Use item.title for the tooltip */}
            <p className="text-3xl font-bold text-white">{item.value}</p>
            <p className="text-sm text-white">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};



export default KPIDashboard; // Export only the base component
