"use client";

import { useState } from "react";

// Define types
type Pizza = {
  name: string;
  price: number;
  size?: "small" | "medium" | "large";
};

type Order = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed";
};

const initialMenu: Pizza[] = [
  { name: "Margherita", price: 8, size: "small" },
  { name: "Pepperoni", price: 10, size: "medium" },
  { name: "Hawaiian", price: 10, size: "large" },
  { name: "Veggie", price: 9, size: "small" },
];

let globalOrderId = 1;

export default function Page() {
  const [menu, setMenu] = useState<Pizza[]>(initialMenu);
  const [cash, setCash] = useState<number>(100);
  const [orders, setOrders] = useState<Order[]>([]);

  const addNewPizza = (pizza: Pizza): void => {
    setMenu((prev) => [...prev, pizza]);
  };

  const orderPizza = (pizzaName: string): void => {
    const selectedPizza = menu.find((p) => p.name === pizzaName);
    if (!selectedPizza) {
      alert("Pizza not found!");
      return;
    }

    const newOrder: Order = {
      id: globalOrderId++,
      pizza: selectedPizza,
      status: "ordered",
    };

    setOrders((prev) => [...prev, newOrder]);
    setCash((prev) => prev + selectedPizza.price);
  };

  const completeOrder = (orderId: number): void => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "completed" } : order,
      ),
    );
  };

  return (
    <div className="mx-auto mt-40 max-w-screen-md rounded-2xl bg-black p-8 text-white shadow-lg shadow-gray-800">
      <h1 className="mb-4 text-2xl font-bold">🍕 Pizza Shop</h1>

      <h2 className="mb-2 text-xl">Menu:</h2>
      <ul className="mb-4">
        {menu.map((pizza, index) => (
          <li key={index} className="mb-2">
            {pizza.name} - ${pizza.price}{" "}
            <button
              onClick={() => orderPizza(pizza.name)}
              className="ml-2 rounded bg-green-600 px-2 py-1"
            >
              Order
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() =>
          addNewPizza({
            name: "Supreme",
            price: 12 + Math.floor(Math.random() * 5),
            size: "large",
          })
        }
        className="mb-4 rounded bg-blue-700 px-4 py-2"
      >
        Add Random Supreme Pizza
      </button>

      <h2 className="mb-2 text-xl">💰 Cash in Register: ${cash}</h2>

      <h2 className="mb-2 text-xl">🧾 Orders:</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="mb-2">
            #{order.id} - {order.pizza.name} ({order.status})
            {order.status === "ordered" && (
              <button
                onClick={() => completeOrder(order.id)}
                className="ml-2 rounded bg-yellow-600 px-2 py-1"
              >
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
