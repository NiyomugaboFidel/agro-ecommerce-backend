export const generateOrderEmailTemplate = (user, order, cart) => {
    const link = `http://localhost:3000/dashboard/orders/${order._id}`;
    const productRows = cart.products.map(
      (item) => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${item.product.title}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">$${item.product.price.toFixed(2)}</td>
      </tr>`
    ).join('');
  
    return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .email-container {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
          }
          h1 {
            color: #333;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .total-price {
            font-weight: bold;
            color: #333;
          }
          .user-info {
            margin-top: 20px;
          }
          .user-info p {
            margin: 4px 0;
          }
          .button-container {
            text-align: center;
            margin-top: 20px;
          }
          .order-button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h1>New Order Placed by ${user.firstname} ${user.lastname}</h1>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
          </table>
          <p class="total-price">Total Price: $${order.totalPrice.toFixed(2)}</p>
          <div class="user-info">
            <h3>User Details</h3>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Shipping Address:</strong> ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}</p>
          </div>
          <div class="button-container">
            <a href="${link}" class="order-button">View Order</a>
          </div>
        </div>
      </body>
    </html>
    `;
  };
  