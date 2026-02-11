const request = require("supertest");
const app = require("../src/app");

describe("Task API", () => {
  it("POST /tasks → yeni task oluşturur", async () => {
    const res = await request(app).post("/tasks").send({ title: "Test Task" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
    expect(res.body.completed).toBe(false);
  });

  it("GET /tasks → task listesini döner", async () => {
    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("PUT /tasks/:id → yeni task oluşturur ve günceller", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "New Test Task" });

    const updateRes = await request(app)
      .put(`/tasks/${res.body.id}`)
      .send({ completed: true });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.completed).toBe(true);
  });
});
