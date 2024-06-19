import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('AMZ');
  const [selectedCategory, setSelectedCategory] = useState('Laptop');
  const [topN, setTopN] = useState(10);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    fetchProducts();
  }, [selectedCompany, selectedCategory, topN, minPrice, maxPrice]);

  const fetchProducts = async () => {
    const data = await getProducts(selectedCompany, selectedCategory, topN, minPrice, maxPrice);
    setProducts(data);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">All Products</h1>
      <div className="flex flex-wrap gap-6 mb-8 justify-center">
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2 text-blue-600">Company</label>
          <select
            className="p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2 text-blue-600">Category</label>
          <select
            className="p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2 text-blue-600">Top N</label>
          <input
            className="p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            value={topN}
            onChange={(e) => setTopN(e.target.value)}
            min="1"
            max="100"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2 text-blue-600">Min Price</label>
          <input
            className="p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="1"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2 text-blue-600">Max Price</label>
          <input
            className="p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.uniqueId} className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 hover:bg-blue-50 transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-purple-700">{product.name}</h2>
            <p className="text-lg text-gray-700 mb-1">Price: <span className="font-medium text-green-600">${product.price}</span></p>
            <p className="text-lg text-gray-700 mb-1">Rating: <span className="font-medium text-yellow-500">{product.rating}</span></p>
            <p className="text-lg text-gray-700 mb-1">Discount: <span className="font-medium text-red-500">{product.discount}%</span></p>
            <p className="text-lg text-gray-700">Availability: <span className={`font-medium ${product.availability ? 'text-green-600' : 'text-red-600'}`}>{product.availability ? 'Available' : 'Out of Stock'}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
