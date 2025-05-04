// Test script for order service
const orderService = require('./order.service');

async function testGetOrders() {
  try {
    console.log('Testing getOrders...');
    const orders = await orderService.getOrders();
    console.log('Orders:', JSON.stringify(orders, null, 2));
    return orders;
  } catch (error) {
    console.error('Error testing getOrders:', error.message);
  }
}

async function testGetOrderById(orderId) {
  try {
    console.log(`Testing getOrderById for order ${orderId}...`);
    const order = await orderService.getOrderById(orderId);
    console.log('Order:', JSON.stringify(order, null, 2));
    return order;
  } catch (error) {
    console.error(`Error testing getOrderById for order ${orderId}:`, error.message);
  }
}

async function testCreateOrder() {
  try {
    console.log('Testing createOrder...');
    const orderData = {
      symbol: 'AAPL',
      qty: 1,
      side: 'buy',
      type: 'market',
      time_in_force: 'day'
    };
    const order = await orderService.createOrder(orderData);
    console.log('Created order:', JSON.stringify(order, null, 2));
    return order;
  } catch (error) {
    console.error('Error testing createOrder:', error.message);
  }
}

async function testCancelOrder(orderId) {
  try {
    console.log(`Testing cancelOrder for order ${orderId}...`);
    const result = await orderService.cancelOrder(orderId);
    console.log('Cancel result:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error(`Error testing cancelOrder for order ${orderId}:`, error.message);
  }
}

async function runTests() {
  // Get all orders
  const orders = await testGetOrders();
  
  // If we have orders, test getting one by ID
  if (orders && orders.length > 0) {
    await testGetOrderById(orders[0].id);
  }
  
  // Create a new order
  const newOrder = await testCreateOrder();
  
  // If order was created successfully, cancel it
  if (newOrder && newOrder.id) {
    await testCancelOrder(newOrder.id);
  }
}

// Run the tests
runTests().then(() => {
  console.log('Tests completed');
}).catch(error => {
  console.error('Error running tests:', error);
});
