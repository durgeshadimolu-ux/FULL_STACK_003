const express = require("express");
const fs = require("fs");
const os = require("os");
const dns = require("dns");

const app = express();

const PORT = 3000;
const FILE = "./students.json";

app.use(express.json());

// GET all students
app.get("/students", (req, res) => {
  fs.readFile(FILE, "utf8", (err, data) => {

    if (err) {
      return res.status(500).send("Error reading students.json");
    }

    res.json(JSON.parse(data));
  });
});

// GET student by ID
app.get("/students/:id", (req, res) => {

  const id = parseInt(req.params.id);

  fs.readFile(FILE, "utf8", (err, data) => {

    if (err) {
      return res.status(500).send("Error reading students.json");
    }

    const students = JSON.parse(data);

    const student = students.find(
      (s) => s.id === id
    );

    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.json(student);
  });
});

// GET students by course
app.get("/search", (req, res) => {

  const course = req.query.course;

  fs.readFile(FILE, "utf8", (err, data) => {

    if (err) {
      return res.status(500).send("Error reading students.json");
    }

    const students = JSON.parse(data);

    const result = students.filter(
      (student) =>
        student.course.toLowerCase() ===
        course.toLowerCase()
    );

    res.json(result);
  });
});

// System information
app.get("/system", (req, res) => {

  res.json({
    platform: os.platform(),
    architecture: os.arch(),
    hostname: os.hostname(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime()
  });

});

// DNS lookup
app.get("/dns", (req, res) => {

  dns.lookup("google.com", (err, address, family) => {

    if (err) {
      return res.status(500).send("DNS lookup failed");
    }

    res.json({
      hostname: "google.com",
      address: address,
      family: family
    });

  });

});

// Home route
app.get("/", (req, res) => {
  res.send("Student Course Management System is Running");
});

// Start server
app.listen(PORT, () => {

  console.log(
    `Server running at http://localhost:${PORT}`
  );

});