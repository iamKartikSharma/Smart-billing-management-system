import React, { useState, useEffect } from 'react';
import './Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', category: '', quantity: '', status: 'sell' });
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'John Doe';
    setUserName(name);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCreate = () => {
    if (editId) {
      setProducts(products.map(product => product.id === editId ? form : product));
      setEditId(null);
    } else {
      setProducts([...products, { ...form }]);
    }
    setForm({ id: '', name: '', category: '', quantity: '', status: 'sell' });
    setIsPopupOpen(false);
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product.id);
    setIsPopupOpen(true);
  };

  const handleDelete = (id) => {
    // Remove the product from the state
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);

    // Update local storage
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`inventory ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-buttons">
          <button className="active">Inventory</button>
          <button onClick={() => window.location.href = '/dashboard'}>Dashboard</button>
          <button onClick={() => window.location.href = '/invoice'}>Invoice</button>
        </div>
      </div>
      <div className="main-content">
        <div className="top-bar">
          <div className="top-bar-content">
            <div className="account-info">
              <span className="account-name">{userName}</span>
            </div>
          </div>
          <div className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span className="menu-icon">&#9776;</span>
          </div>
        </div>
        <div className="inventory-content">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Products"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <button className="add-task-button" onClick={() => setIsPopupOpen(true)}>Add Task</button>
          {isPopupOpen && (
            <div className="popup">
              <div className="popup-content">
                <button className="close-button" onClick={() => setIsPopupOpen(false)}>&times;</button>
                <h2>{editId ? 'Edit Product' : 'Add New Product'}</h2>
                <div className="form-row">
                  <input
                    type="text"
                    name="id"
                    placeholder="Product ID"
                    value={form.id}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Product Category"
                    value={form.category}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Product Quantity"
                    value={form.quantity}
                    onChange={handleInputChange}
                  />
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
                  >
                    <option value="sell">Sell</option>
                    <option value="not-for-sale">Not for Sale</option>
                  </select>
                  <button onClick={handleCreate}>
                    {editId ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="product-list">
            <h2>Product List</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>{product.status}</td>
                    <td>
                      <button className='edit' onClick={() => handleEdit(product)}>Edit</button>
                      <button className='delete' onClick={() => handleDelete(product.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
