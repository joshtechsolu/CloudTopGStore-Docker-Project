
# 🐳 Cloud Top G Store — Full Docker Microservices Project
![Cloud Top G Store Architecture](./Images/homePage.png)

<p align="center">
  <img src="./Images/CartsPage.png" alt="Cloud Top G Store - Cart Page" width="45%" />
  <img src="./Images/OrderPage.png" alt="Cloud Top G Store - Order History Page" width="45%" />
</p>

## 📌 Project Overview

**Cloud Top G Store** is a full microservices-based e-commerce application designed to simulate a real-world, production-grade Docker workflow.

This project is intentionally structured so that **no Dockerfiles or Docker Compose configurations are provided upfront**.

Students are expected to **design, containerize, and orchestrate the entire system themselves** using Docker and Docker Compose.

### 🎯 Project Focus
- Real microservice boundaries  
- Containerized frontend and backend services  
- Inter-service communication  
- Persistent data storage  
- Production-style architecture patterns  

---

## 🏗️ High-Level Architecture

The system consists of **five independent services**, all running as separate containers on the same Docker network:

- **Frontend (Store UI)**
- **Cart Service**
- **Order Service**
- **MongoDB (Database)**
- **Mongo Express (Database GUI)**

Each service has a **single, clear responsibility**, mirroring how real-world systems are designed in production.

---

## 🔄 System Flow (How the Application Works)

1. Users browse products on the **Cloud Top G Store frontend**
2. Products are added to the **Cart Service**
3. The cart maintains **temporary state**
4. On checkout:
   - The **Order Service** creates a permanent order
   - The cart is cleared
   - Orders are stored persistently in **MongoDB**
5. Users can view their **order history** at any time

> **Carts are temporary. Orders are permanent.**

---

