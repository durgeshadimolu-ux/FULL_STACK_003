const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/register.html");
});

app.post("/register", (req, res) => {
    console.log(req.body);

    const filePath = __dirname + "/users.json";

    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

    users.push(req.body);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.send("Registration successful! <br><br><a href='/login'>Go to Login</a>");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const users = JSON.parse(
        fs.readFileSync(__dirname + "/users.json", "utf8")
    );

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        res.redirect("/dashboard?username=" + encodeURIComponent(username));
    } else {
        res.send("Invalid username or password! <br><br><a href='/login'>Try Again</a>");
    }
});

app.get("/dashboard", (req, res) => {
    res.sendFile(__dirname + "/public/dashboard.html");
});

app.get("/api/user", (req, res) => {
    const username = req.query.username;

    const users = JSON.parse(
        fs.readFileSync(__dirname + "/users.json", "utf8")
    );

    const user = users.find(u => u.username === username);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});