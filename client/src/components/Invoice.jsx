import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Invoice.css';

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    customerName: '',
    invoiceNumber: '',
    date: '',
    items: [{ description: '', quantity: '', price: '' }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [name]: value };
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: '', price: '' }],
    });
  };

  const removeItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((total, item) => {
      return total + (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0);
    }, 0).toFixed(2);
  };

  const handleGenerateInvoice = () => {
    const doc = new jsPDF();
    
    // Add a header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice', 20, 20);
  
    // Add a line below the header
    doc.setLineWidth(1);
    doc.line(20, 25, 190, 25); // Draw a line from x=20, y=25 to x=190, y=25
  
    // Add customer details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Customer Name: ${invoiceData.customerName}`, 20, 40);
    doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 20, 50);
    doc.text(`Date: ${invoiceData.date}`, 20, 60);
  
    // Add table for items
    const tableColumn = ["Description", "Quantity", "Price"];
    const tableRows = invoiceData.items.map(item => [item.description, item.quantity, item.price]);
  
    doc.autoTable(tableColumn, tableRows, {
      startY: 70,
      margin: { horizontal: 20 },
      theme: 'grid', // Optional: use 'striped' for striped rows or 'plain' for plain
      headStyles: { fillColor: [0, 0, 0] }, // Header row background color (black)
      bodyStyles: { fontSize: 10 }, // Body row font size
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 30 } } // Column width
    });
  
    // Add total
    const finalY = doc.autoTable.previous.finalY; // Get the Y coordinate after the table
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: ${calculateTotal()}`, 20, finalY + 10);
  
    // Save the PDF
    doc.save('invoice.pdf');
  };

  return (
    <div className="invoice">
        <div className="sidebar">
            <div className="sidebar-buttons">
                <button onClick={() => window.location.href = '/inventory'}>Inventory</button>
                <button onClick={() => window.location.href = '/invoice'} className="active">Invoice</button>
                <button onClick={() => window.location.href = '/dashboard'}>Dashboard</button>
            </div>
      </div>
      <div className="invoice-form">
      <h1>Generate Invoice</h1>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={invoiceData.customerName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="invoiceNumber"
          placeholder="Invoice Number"
          value={invoiceData.invoiceNumber}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={invoiceData.date}
          onChange={handleInputChange}
        />
        <div className="items-section">
          <h2>Items</h2>
          {invoiceData.items.map((item, index) => (
            <div className="item-row" key={index}>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleItemChange(index, e)}
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, e)}
              />
              <button type="button" onClick={() => removeItem(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addItem}>Add Item</button>
        </div>
        <div className="total-section">
          <h3>Total: {calculateTotal()}</h3>
        </div>
        <button className="generate-btn" onClick={handleGenerateInvoice}>Generate Invoice</button>
      </div>
    </div>
  );
};

export default Invoice;
