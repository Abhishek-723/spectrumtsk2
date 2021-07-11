const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;
const Registration = require("./registration");
const flash = require('express-flash');
const app = express();
require("../db/conn");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const static_path = path.join(__dirname, "../../public");
const template_path = path.join(__dirname, "../../templates/views");
const partial_path = path.join(__dirname, "../../templates/partials");



app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);


app.get('/', (req, res) => {
    res.render("index");
});
app.get("/registration", (req, res) => {
    res.render("registration");
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});
app.post("/registration", async (req, res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){ 
            const hashpassword = await bcrypt.hash(req.body.password, 10);
            const studentregistration = new Registration({
                name: req.body.name,
                branch: req.body.branch,
                email: req.body.email,
                domain: req.body.domain,
                password:hashpassword,
                confirmpassword: hashpassword
            });
            const registered = await studentregistration.save();
            res.status(201).render("login");
        }else{
            res.send("Passwords doesn't match");
        }
    } catch(error) {
        res.status(400).send(error);
    }
});
app.post("/login", async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

       const useremail = await Registration.findOne({email:email});

       if(await bcrypt.compare(password, useremail.password)){
           res.render("dashboard");
       }else{
           res.send("You have entered incorrect email or password");
       }

    } catch(error) {
        res.status(400).send("Invalid email"); 
    }
});

app.listen(port, () => {
    console.log(`App is running at ${port}`);
})