import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler, RadarController, RadialLinearScale } from 'chart.js';
import './Dashboard.css';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler,
  RadarController,
  RadialLinearScale
);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);

    const name = localStorage.getItem('userName') || 'John Doe';
    setUserName(name);
  }, []);

  const categories = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.quantity;
    return acc;
  }, {});

  const salesData = {
    labels: Object.keys(categories),
    datasets: [{
      data: Object.values(categories),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  };

  const totalSales = {
    labels: Object.keys(categories),
    datasets: [{
      label: 'Total Sales',
      data: Object.values(categories),
      backgroundColor: '#42A5F5'
    }]
  };

  const topSellingProducts = {
    labels: products.map(p => p.name),
    datasets: [{
      label: 'Top Selling Products',
      data: products.map(p => p.quantity),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  };

  const monthlySales = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Sales',
      data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
      fill: true,
      backgroundColor: 'rgba(66, 165, 245, 0.2)',
      borderColor: '#42A5F5',
      tension: 0.1
    }]
  };

  const productStatusData = {
    labels: ['Sell', 'Not for Sale'],
    datasets: [{
      data: [
        products.filter(p => p.status === 'sell').length,
        products.filter(p => p.status === 'not-for-sale').length
      ],
      backgroundColor: ['#FF6384', '#36A2EB']
    }]
  };

  const performanceMetrics = {
    labels: ['Quality', 'Price', 'Sales', 'Service', 'Support'],
    datasets: [{
      label: 'Performance Metrics',
      data: [65, 59, 90, 81, 56],
      backgroundColor: 'rgba(66, 165, 245, 0.2)',
      borderColor: '#42A5F5',
      borderWidth: 1
    }]
  };
  const commonOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#10124F', // Dark color for legend text
        },
      },
      tooltip: {
        callbacks: {
          labelColor: (tooltipItem) => {
            return {
              borderColor: '#10124F', // Dark color for tooltip border
              backgroundColor: '#F4F4F9', // Light background for tooltip
            };
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#10124F', // Dark color for x-axis labels
        },
        grid: {
          color: '#E0E0E0', // Light grid lines
        },
      },
      y: {
        ticks: {
          color: '#10124F', // Dark color for y-axis labels
        },
        grid: {
          color: '#E0E0E0', // Light grid lines
        },
      },
    },
  };
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-buttons">
          <button onClick={() => window.location.href = '/dashboard'} className="active">Dashboard</button>
          <button onClick={() => window.location.href = '/inventory'}>Inventory</button>
          <button onClick={() => window.location.href = '/invoice'}>Create Invoice</button> {/* Added Invoice Button */}
        </div>
      </div>
      <div className="main-content">
        <div className="top-bar">
          <div className="account-info">
            <span className="account-name">{userName}</span>
          </div>
        </div>
        <div className="charts">
          <div className="chart-container">
            <h3>Product Categories</h3>
            <Pie data={salesData} options={commonOptions}/>
          </div>
          <div className="chart-container">
            <h3>Total Sales</h3>
            <Bar data={totalSales} options={{ ...commonOptions,responsive: true }} />
          </div>
          <div className="chart-container">
            <h3>Top Selling Products</h3>
            <Pie data={topSellingProducts} options={commonOptions}/>
          </div>
          <div className="chart-container">
            <h3>Monthly Sales Trend</h3>
            <Line data={monthlySales} options={{ ...commonOptions, responsive: true }} />
          </div>
          <div className="chart-container">
            <h3>Product Status</h3>
            <Doughnut data={productStatusData} options={commonOptions}/>
          </div>
          <div className="chart-container">
            <h3>Performance Metrics</h3>
            <Radar data={performanceMetrics} options={commonOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
