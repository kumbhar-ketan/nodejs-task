//======Node main backend =========
const express = require("express");
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/signup");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const staticfile = path.join(__dirname, "../public");
// console.log(staticfile);
app.use(express.static(staticfile));

// ========  For the tempelates Engine ===========
const tempelatesfile = path.join(__dirname, "../tempelates/views");
const partialfile = path.join(__dirname, "../tempelates/partials");
app.set("views engine", "hbs");
app.set("views", tempelatesfile);

//=========For The Partial=============
hbs.registerPartials(partialfile);

//==========getting the Forms=====
app.get("/", (req, res) => {
  //   res.send("welcome to the nodejs backend");
  res.render("login.hbs");
});
app.get("/signup", (req, res) => {
  //   res.send("welcome to the nodejs backend");
  res.render("signup.hbs");
});

// ===============Signup create data ================
app.post("/signup", async (req, res) => {
  try {
    const newuser = new Register({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const registered = await newuser.save();
    res.status(201).render("index.hbs");
  } catch (error) {
    res.status(404).send(error);
  }
});

//===========Login Check details =================
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({ email: email });

    if (useremail.password === password) {
      res.status(201).render("index.hbs");
    } else {
      res.send("Login details are invalide");
    }
  } catch (e) {
    res.status(404).send("Login details are invalide");
  }
});

//==========Listening server Port=============
app.listen(port, () => {
  console.log(`The server is listening on ${port}`);
});
