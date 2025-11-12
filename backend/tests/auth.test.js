/***import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../src/server.js";

let mongod;

beforeAll(async () => {
  process.env.NODE_ENV = "test"; // ensure test mode

  // Start in-memory MongoDB
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  // Connect manually (since we disabled auto-connect)
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

test("register + login", async () => {
  const res1 = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Test User", 
      email: "test@example.com",
      password: "password123",
    });

  expect(res1.statusCode).toBe(201);

  const res2 = await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@example.com",
      password: "password123",
    });

  expect(res2.statusCode).toBe(200);
  expect(res2.body).toHaveProperty("token");
});***/

import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../src/server.js";

let mongod;
let request; // define outside to avoid redeclaration

beforeAll(async () => {
  process.env.NODE_ENV = "test";

  // Start in-memory MongoDB
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  // Connect manually
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // initialize supertest only once
  request = supertest(app);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

test("register + login", async () => {
  const res1 = await request
    .post("/api/auth/register")
    .send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

  expect(res1.statusCode).toBe(201);

  const res2 = await request
    .post("/api/auth/login")
    .send({
      email: "test@example.com",
      password: "password123",
    });

  expect(res2.statusCode).toBe(200);
  expect(res2.body).toHaveProperty("token");
});



