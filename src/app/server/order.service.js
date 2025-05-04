// Service for handling orders
const axios = require('axios');
const env = require('../../environments/environment');

// Get all orders
async function getOrders() {
  try {
    const response = await axios.get('https://paper-api.alpaca.markets/v2/orders', {
      headers: {
        'APCA-API-KEY-ID': env.keyId,
        'APCA-API-SECRET-KEY': env.secretKey
      }
    });

    if (response.status === 200) {
      console.log('Orders retrieved successfully');
      return response.data;
    } else {
      throw new Error(`API request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error('Error in getOrders:', error.message);
    throw error;
  }
}

// Get a specific order by ID
async function getOrderById(orderId) {
  try {
    const response = await axios.get(`https://paper-api.alpaca.markets/v2/orders/${orderId}`, {
      headers: {
        'APCA-API-KEY-ID': env.keyId,
        'APCA-API-SECRET-KEY': env.secretKey
      }
    });

    if (response.status === 200) {
      console.log('Order retrieved successfully');
      return response.data;
    } else {
      throw new Error(`API request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error(`Error in getOrderById for order ${orderId}:`, error.message);
    throw error;
  }
}

// Create a new order
async function createOrder(orderData) {
  try {
    // Ensure all orders are set to GTC (Good Till Canceled)
    const orderWithGTC = {
      ...orderData,
      time_in_force: 'gtc' // Always use 'gtc' for all orders
    };

    const response = await axios.post('https://paper-api.alpaca.markets/v2/orders', orderWithGTC, {
      headers: {
        'APCA-API-KEY-ID': env.keyId,
        'APCA-API-SECRET-KEY': env.secretKey,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      console.log('Order created successfully');
      return response.data;
    } else {
      throw new Error(`API request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error('Error in createOrder:', error.message);
    throw error;
  }
}

// Cancel an existing order
async function cancelOrder(orderId) {
  try {
    const response = await axios.delete(`https://paper-api.alpaca.markets/v2/orders/${orderId}`, {
      headers: {
        'APCA-API-KEY-ID': env.keyId,
        'APCA-API-SECRET-KEY': env.secretKey
      }
    });

    if (response.status === 204) {
      console.log('Order canceled successfully');
      return { success: true, message: 'Order canceled successfully' };
    } else {
      throw new Error(`API request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error(`Error in cancelOrder for order ${orderId}:`, error.message);
    throw error;
  }
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  cancelOrder
};
