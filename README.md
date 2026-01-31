
# 📦 Customer–Order Management System (Backend)

## 📌 Project Overview

This project is a **backend Customer–Order Management System** built using **Node.js and Express.js**, with **Supabase (PostgreSQL)** as the database.

The system demonstrates:

* Proper **relational database design**
* Usage of **foreign keys**
* **Cascade delete behavior** at the database level
* Complete **CRUD operations**
* Clear **validations and error handling**

No frontend is included. All APIs are tested using **Postman / Thunder Client**.

---

## 🛠️ Technologies Used

* **Node.js**
* **Express.js**
* **Supabase (PostgreSQL)**
* **dotenv** (environment variables)
* **cors**

---

## 🗂️ Project Folder Structure

```
customer-order-system/
│
├── src/
│   ├── routes/
│   │   ├── customer.routes.js
│   │   └── order.routes.js
│   │
│   ├── controllers/
│   │   ├── customer.controller.js
│   │   └── order.controller.js
│   │
│   ├── validations/
│   │   ├── customer.validation.js
│   │   └── order.validation.js
│   │
│   ├── config/
│   │   └── supabaseClient.js
│   │
│   └── index.js
│
├── .env.example
├── .gitignore
├── README.md
├── package.json
└── package-lock.json
```

---

## 🧱 Database Design (Relational Schema)

### 🧑 Customers Table

Stores customer account details.
```

| Column Name | Type      | Description                   |
| ----------- | --------- | ----------------------------- |
| id          | UUID      | Primary Key                   |
| full_name   | TEXT      | Customer full name (NOT NULL) |
| email       | TEXT      | Unique email (NOT NULL)       |
| phone       | TEXT      | Phone number (NOT NULL)       |
| created_at  | TIMESTAMP | Auto-generated                |

```

---

### 📦 Orders Table

Stores orders placed by customers.
```

| Column Name  | Type      | Description                |
| ------------ | --------- | -------------------------- |
| id           | UUID      | Primary Key                |
| product_name | TEXT      | Product name (NOT NULL)    |
| quantity     | INTEGER   | Quantity ordered           |
| price        | NUMERIC   | Product price              |
| order_status | TEXT      | Default: `pending`         |
| customer_id  | UUID      | Foreign Key → customers.id |
| created_at   | TIMESTAMP | Auto-generated             |

```
---

## 🔗 Relationship Rules

* Each **Order belongs to exactly one Customer**
* A **Customer can have multiple Orders**
* Relationship is enforced using a **foreign key**
* `orders.customer_id` references `customers.id`

---

## 🔥 Cascade Delete (IMPORTANT)

The foreign key constraint on the `orders` table is defined with:

```
ON DELETE CASCADE
```

### What this means:

* When a **Customer is deleted**
* All **Orders related to that customer are automatically deleted**
* This behavior is enforced **at the database level**
* ❌ No manual deletion of orders is done in application code

This ensures **data consistency** and follows best backend practices.

---

## 🚀 API Endpoints

### 👤 Customer APIs

#### ➕ Register Customer

**POST** `/customers/register`

Request Body:

```json
{
  "full_name": "Ravi Kumar",
  "email": "ravi@gmail.com",
  "phone": "9876543210"
}
```

Validations:

* All fields required
* Email must be unique and valid

---

#### ❌ Delete Customer

**DELETE** `/customers/:customerId`

* Deletes customer by ID
* Automatically deletes all related orders using cascade delete

---

### 📦 Order APIs

#### ➕ Create Order

**POST** `/orders/add-order`

Request Body:

```json
{
  "product_name": "Laptop",
  "quantity": 1,
  "price": 65000,
  "customerId": "UUID_OF_CUSTOMER"
}
```

* Order is linked to customer using `customer_id`
* Foreign key constraint ensures valid customer

---

#### 📥 Get Customer Orders

**GET** `/orders/get-my-orders/:customerId`

* Fetches only orders belonging to the given customer
* Returns empty list if no orders exist

---

#### ✏️ Update Order

**PUT** `/orders/update-order/:orderId`

Request Body:

```json
{
  "quantity": 2,
  "order_status": "completed"
}
```

* Updates order fields
* Validates order existence

---

#### ❌ Delete Order

**DELETE** `/orders/delete-order/:orderId`

* Deletes a single order by ID

---

## ⚠️ Validations & Error Handling

The system handles:

* Missing required fields
* Invalid UUIDs
* Duplicate email registration
* Foreign key violations
* Invalid customer/order IDs

Appropriate **HTTP status codes** and **clear JSON error messages** are returned.

---

## 🔐 Environment Variables

The project uses environment variables for Supabase configuration.

### `.env.example`

```env
SUPABASE_URL=
SUPABASE_KEY=
PORT=5000
```

> ⚠️ `.env` file is not committed for security reasons.

---

## ▶️ How to Run the Project

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file and add Supabase credentials.

3. Start the server:

```bash
node src/index.js
```

4. Server runs on:

```
http://localhost:5000
```

---

## 🧪 Testing

All APIs were tested using:

* **Postman**
* **Thunder Client**

Screenshots of successful API responses are included for submission.

---

## 🎯 Learning Outcomes

By completing this project, the following concepts are demonstrated:

* Relational database design
* Foreign key usage
* Cascade delete behavior
* Backend CRUD operations
* Real-world data ownership handling
* Clean project structure

---

