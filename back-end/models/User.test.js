const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Import bcrypt
const User = require("../models/User");
const userRoutes = require("../routes/users");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

describe("User Routes", () => {
  beforeAll(async () => {
    // Connect to the database using the environment variable
    const url = process.env.MONGODB_Test;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear the test database before each test
    await User.deleteMany({});
  });

  it("should register a new user", async () => {
    const newUser = {
      name: "John",
      firstName: "Doe",
      password: "password123",
      phone: "1234567890",
      email: "john.doe@example.com",
      healthCard: "123456789",
      role: "user",
      accountStatus: "active",
      sharedResources: [],
      groups: [],
    };

    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.email).toBe(newUser.email);
  });

  it("should not register a user with an existing email", async () => {
    const existingUser = new User({
      name: "Jane",
      firstName: "Doe",
      password: "password123",
      phone: "1234567890",
      email: "jane.doe@example.com",
      healthCard: "123456789",
      role: "user",
      accountStatus: "active",
      sharedResources: [],
      groups: [],
    });

    await existingUser.save();

    const newUser = {
      name: "John",
      firstName: "Doe",
      password: "password123",
      phone: "1234567890",
      email: "jane.doe@example.com",
      healthCard: "123456789",
      role: "user",
      accountStatus: "active",
      sharedResources: [],
      groups: [],
    };

    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email already exists");
  });

  it("should not login a user with incorrect credentials", async () => {
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: "John",
      firstName: "Doe",
      password: hashedPassword,
      phone: "1234567890",
      email: "john.doe@example.com",
      healthCard: "123456789",
      role: "user",
      accountStatus: "active",
      sharedResources: [],
      groups: [],
    });

    await user.save();

    const response = await request(app).post("/api/users/login").send({
      email: "john.doe@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should get a user by id", async () => {
    const user = new User({
      name: "John",
      firstName: "Doe",
      password: "password123",
      phone: "1234567890",
      email: "john.doe@example.com",
      healthCard: "123456789",
      role: "user",
      accountStatus: "active",
      sharedResources: [],
      groups: [],
    });
    await user.save();

    const response = await request(app).get(`/api/users/${user._id}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(user.email);
  });

  it("should update a user", async () => {
    const user = new User({
      name: "John",
      firstName: "Doe",
      password: "password123",
      phone: "1234567890",
      email: "john.doe@example.com",
      healthCard: "123456789",
      role: "user",
      accountStatus: "active",
      sharedResources: [],
      groups: [],
    });
    await user.save();

    const updatedData = {
      name: "John Updated",
      firstName: "Doe Updated",
      password: "newpassword123",
      phone: "0987654321",
      email: "john.updated@example.com",
      healthCard: "987654321",
      role: "admin",
      accountStatus: "inactive",
      sharedResources: [],
      groups: [],
    };

    const response = await request(app)
      .put(`/api/users/${user._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.email).toBe(updatedData.email);
  });

  it("should delete a user", async () => {
    const user = new User({
      name: "John",
      firstName: "Doe",
      password: "password123",
      phone: "1234567890",
      email: "john.doe@example.com",
      healthCard: "123456789",
      role: "user",
      accountStatus: "active",
      sharedResources: [],
      groups: [],
    });
    await user.save();

    const response = await request(app).delete(`/api/users/${user._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Deleted User");
  });
});
