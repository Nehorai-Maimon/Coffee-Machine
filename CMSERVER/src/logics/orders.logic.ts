import { Request, Response } from "express";
import dotenv from "dotenv";
import { create, readAll } from "../controllers/orders.controllers";

dotenv.config();

// create order
const createOrder = async (req: Request, res: Response) => {
  try {
    // extract the details from the request
    const { name, title, delayMinutes, password } = req.body;
    // validation
    if (!name || !title) {
      res.status(400).json({ error: "Name and title are required" });
      return;
    }

    if (title != "Boss" && title != "Employee") {
      res.status(401).json({ error: "Invalid title" });
      return;
    }

    if (title == "Boss")
      if (password !== process.env.PASS) {
        res.status(401).json({ error: "Invalid boss password" });
        return;
      }

    if (delayMinutes < 0) {
      res.status(401).json({ error: "Invalid delay time" });
      return;
    }

    const newOrder = await create({
      name,
      title,
      delayMinutes: delayMinutes || 0,
    });

    res.status(201).json({
      message: "Order saved to database successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.log(
      `[controller]: Error creating order - ${(error as Error).message}`,
    );
    res.status(500).json({ error: "Server error while creating order" });
  }
};

// get all orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await readAll();

    res.status(200).json(orders);
  } catch (error) {
    console.error(
      `[controller]: Error fetching orders- ${(error as Error).message}`,
    );
    res.status(500).json({ error: "Server error while fetching orders" });
  }
};

export { createOrder, getOrders };
