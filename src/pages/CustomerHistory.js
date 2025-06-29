import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const CustomerHistory = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const fetchHistory = async () => {
    try {
      const res = await api.get(`/customers/${id}/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching customer history:', err);
    }
  };

  fetchHistory();
}, [id]);


  return (
    <div style={{ padding: '20px' }}>
      <h2>Customer #{id} - Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.order_id} style={{ marginBottom: '30px' }}>
            <h3>Order ID: {order.order_id}</h3>
            <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
            <p><strong>Total:</strong> Rs. {order.total_amount}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment Method:</strong> {order.payment_method}</p>

            <table border="1" cellPadding="6" width="100%">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price (Rs.)</th>
                  <th>Subtotal (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product_name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" align="center">No items found for this order.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerHistory;
