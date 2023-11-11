const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const EmployeeModel = require('./models/Employee');



const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://saisudheera9803:Sai2344557@cluster0.gsisntp.mongodb.net/');

app.post('/signup', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            EmployeeModel.create(req.body)
            .then(Employees => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/Login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})

app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});