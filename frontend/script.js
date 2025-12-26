const products = [
  {
    name: "Cloud Top G Baby Essentials Set",
    price: 18000,
    description: "Soft, premium baby wear designed for comfort and everyday style.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-baby-clothe.jpeg"
  },
  {
    name: "Cloud Top G Classic Tee",
    price: 15000,
    description: "Minimalist everyday t-shirt made for comfort, durability, and style.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-basic-shirt.jpeg"
  },
  {
    name: "Cloud Top G Signature Cap",
    price: 10000,
    description: "Premium branded cap designed for daily wear and active lifestyles.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-Cap.jpeg"
  },
  {
    name: "Cloud Top G Ceramic Mug",
    price: 8000,
    description: "Sleek branded mug perfect for coffee, tea, or late-night coding sessions.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-cup.jpeg"
  },
  {
    name: "Cloud Top G Collarless Shirt",
    price: 20000,
    description: "Modern collarless design crafted for smart-casual occasions.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-diagram-colarless.jpeg"
  },
  {
    name: "Cloud Top G Gym Essentials Pack",
    price: 12000,
    description: "Functional gym accessories designed for training and performance.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-Gym-Accessoriea.jpeg"
  },
  {
    name: "Cloud Top G Winter Headwarmer",
    price: 9000,
    description: "Comfortable headwarmer built to keep you warm during cold seasons.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-Headwarmer.jpeg"
  },
  {
    name: "Cloud Top G Premium Hoodie",
    price: 28000,
    description: "High-quality hoodie with a clean finish and premium branding.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-hoodie-front.jpeg"
  },
  {
    name: "Cloud Top G Joggers",
    price: 22000,
    description: "Comfort-focused joggers suitable for workouts or casual wear.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-Joggers.jpeg"
  },
  {
    name: "Cloud Top G Laptop Carry Bag",
    price: 25000,
    description: "Stylish and protective laptop bag designed for professionals.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-laptop-bag.jpeg"
  },
  {
    name: "Cloud Top G Desk Mouse Pad",
    price: 7000,
    description: "Smooth-surface mouse pad optimized for work and productivity.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-Mouse-pad.jpeg"
  },
  {
    name: "Cloud Top G Lifestyle Sneakers",
    price: 35000,
    description: "Durable sneakers designed for daily wear and urban movement.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-Shoe.jpeg"
  },
  {
    name: "Cloud Top G Sleeveless Tee",
    price: 14000,
    description: "Lightweight sleeveless shirt ideal for workouts and hot climates.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-sleeveless.jpeg"
  },
  {
    name: "Cloud Top G Star Edition Shirt",
    price: 16000,
    description: "Limited-style graphic tee inspired by Cloud Top G brand identity.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-Star-Shirt.jpeg"
  },
  {
    name: "Cloud Top G Everyday Tee",
    price: 15000,
    description: "Versatile t-shirt built for comfort, movement, and everyday use.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-Tee-Model-1.jpeg"
  },
  {
    name: "Cloud Top G Insulated Water Bottle",
    price: 11000,
    description: "Reusable insulated bottle designed to keep drinks cold or hot.",
    image: "https://znzcgxxkbxnjowiqregs.supabase.co/storage/v1/object/public/Docker-Ecommerce-Mockups/Mockup-water-bottle.jpeg"
  }
];

const container = document.getElementById("products");

products.forEach(p => {
 container.innerHTML += `
  <div class="card">
    <img src="${p.image}">
    <h3>${p.name}</h3>
    <p>${p.description}</p>
    <p class="price">₦${p.price}</p>
    <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}')">
      Add to Cart
    </button>
  </div>
`;
});

function updateCartCount() {
  fetch("http://localhost:5001/cart")
    .then(res => res.json())
    .then(items => {
      document.getElementById("cart-count").innerText = items.length;
    });
}

function addToCart(name, price, image) {
  fetch("http://localhost:5001/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, image })
  })
    .then(() => {
      updateCartCount();
      showToast(`${name} added to cart`);
    })
    .catch(() => {
      showToast("Failed to add item", "error");
    });
}


updateCartCount();

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
