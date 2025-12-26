function loadOrders() {
  fetch("http://localhost:5002/orders")
    .then(res => res.json())
    .then(orders => {
      const container = document.getElementById("orders");
      container.innerHTML = "";

      if (orders.length === 0) {
        container.innerHTML = "<p>No orders found.</p>";
        return;
      }

      orders.reverse().forEach(order => {
        const itemsHtml = order.items
          .map(item => `<li>${item.name} – ₦${item.price}</li>`)
          .join("");

        container.innerHTML += `
  <div class="order-card">
    <div class="order-header">
      <div>
        <h3>Order</h3>
        <p class="order-id">${order._id}</p>
      </div>
      <span class="order-status">${order.status}</span>
    </div>

    <div class="order-items">
      ${order.items.map(item => `
        <div class="order-item">
          <span>${item.name}</span>
          <span>₦${item.price}</span>
        </div>
      `).join("")}
    </div>

    <div class="order-footer">
      <strong>Total: ₦${order.total}</strong>
      <span>${new Date(order.createdAt).toLocaleString()}</span>
    </div>
  </div>
`;
      });
    })
    .catch(() => {
      showToast("Failed to load orders", "error");
    });
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

loadOrders();
