"use client";

type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed";
};

const menu: Array<Pizza> = [
  { id: 1, name: "Margherita", price: 8 },
  { id: 2, name: "Pepperoni", price: 10 },
  { id: 3, name: "Hawaiian", price: 10 },
  { id: 4, name: "Veggie", price: 9 },
];

export default function page() {
  let cashInRegister = 100;
  let nextOrderId = 1;
  const orderQueue: Array<Order> = [];

  function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
    const newPizza = { id: menu.length + 1, ...pizzaObj };
    menu.push(newPizza);
    return newPizza;
  }

  function placeOrder(pizzaName: string): Order | undefined {
    const selectedPizza: Pizza | undefined = menu.find(
      (pizzaObj) => pizzaObj.name === pizzaName,
    );
    if (!selectedPizza) {
      console.error(`${pizzaName} does not exist in the menu`);
      return;
    }
    cashInRegister += selectedPizza.price;
    const newOrder: Order = {
      id: nextOrderId++,
      pizza: selectedPizza,
      status: "ordered",
    };
    orderQueue.push(newOrder);
    return newOrder;
  }

  function addToArray<Type>(arr: Type[], item: Type): Type[] {
    arr.push(item);
    return arr;
  }

  addToArray<Pizza>(menu, { id: 15, name: "Mushroom", price: 10 });
  addToArray<Order>(orderQueue, { id: 6, pizza: menu[4], status: "ordered" });

  function completeOrder(orderId: number): Order | undefined {
    const order: Order | undefined = orderQueue.find(
      (order): boolean => order.id === orderId,
    );
    if (!order) {
      console.error(`Order with ID ${orderId} not found`);
      return;
    }

    order.status = "completed";
    return order;
  }

  function getPizzaDetail(identifier: string | number): Pizza | undefined {
    if (typeof identifier === "string") {
      return menu.find(
        (pizza): boolean =>
          pizza.name.toLowerCase() === identifier.toLowerCase(),
      );
    } else {
      return menu.find((pizza): boolean => pizza.id === identifier);
    }
  }

  addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
  addNewPizza({ name: "BBQ Chicken", price: 12 });
  addNewPizza({ name: "Spicy Sausage", price: 11 });

  placeOrder("Chicken Bacon Ranch");
  completeOrder(1);

  console.log("Menu:", menu);
  console.log("Cash in register:", cashInRegister);
  console.log("Order queue:", orderQueue);

  return (
    <div className="mx-auto max-w-screen-md p-4">
      <h1>Pizza Order System</h1>
      <h2>Menu</h2>
      <ul>
        {menu.map((pizza, index) => (
          <li key={index}>
            {pizza.id}. {pizza.name} - ${pizza.price}
          </li>
        ))}
      </ul>

      <h2>Order Queue</h2>
      <ul>
        {orderQueue.map((order) => (
          <li key={order.id}>
            Order ID: {order.id}, Pizza: {order.pizza.name}, Status:{" "}
            {order.status}
          </li>
        ))}
      </ul>

      <h2>Cash in Register</h2>
      <p>${cashInRegister}</p>

      <h2>Add New Pizza</h2>
      <form>
        <input type="text" placeholder="Pizza Name" id="pizzaName" required />
        <input
          type="number"
          placeholder="Pizza Price"
          id="pizzaPrice"
          required
        />
        <button type="submit">Add Pizza</button>
      </form>
      <h2>Place Order</h2>
      <form>
        <input type="text" placeholder="Pizza Name" id="pizzaName" required />
        <button type="submit">Place Order</button>
      </form>
      <h2>Complete Order</h2>
      <form>
        <input type="number" placeholder="Order ID" id="orderId" required />
        <button type="submit">Complete Order</button>
      </form>
    </div>
  );
}
