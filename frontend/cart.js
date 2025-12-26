function loadCart() {
  fetch("http://localhost:5001/cart")
    .then(res => res.json())
    .then(items => {
      const container = document.getElementById("cart-items");
      container.innerHTML = "";
      let total = 0;

      if (items.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("total").innerText = "Total: ₦0";
        return;
      }

      items.forEach(item => {
        total += item.price;
        container.innerHTML += `
          <div class="card">
            <img src="${item.image}">
            <h3>${item.name}</h3>
            <p class="price">₦${item.price}</p>
            <button onclick="removeFromCart('${item._id}')">Remove</button>
          </div>
        `;
      });

      document.getElementById("total").innerText =
        "Total: ₦" + total;
    });
}

function removeFromCart(id) {
  fetch(`http://localhost:5001/cart/${id}`, { method: "DELETE" })
    .then(loadCart);
}

function checkout() {
  fetch("http://localhost:5002/order/checkout", {
    method: "POST"
  })
    .then(res => res.json())
    .then(data => {
      showToast(`Order successful! Total: ₦${data.total}`);
      loadCart();
    })
    .catch(() => {
      showToast("Checkout failed", "error");
    });
}


function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}


loadCart();
