//Create RESTFul API using Express
const express = require('express');
const app = express();
const employeeRoute = express.Router();
//Express routing - http.get() || http.post()
let Employee = require('../models/employee')

// Add Employee
// All Express classes are implemnting Observable<T>
employeeRoute.route('/create').post((req, res, next)=>{
    console.log(req.body)
    Employee.create(req.body, (error, data)=>{
        if(error) {
        return next(error);
        } else {
            res.json(data);
        }
    });
});

// Get all employees
employeeRoute.route('/').get((req, res)=>{
    Employee.find((error, data)=>{
        if(error){
            return next(error);
        } else {
            res.json(data);
        }
    });
});
// Get employee by id
employeeRoute.route('/empid/:id').get((req, res)=>{
    Employee.findById(req.params.id, (error, data)=>{
        if(error){
            return next(error);
        } else {
            res.json(data);
        }
    });
});
// Update employee
employeeRoute.route('/update/:id').put((req, res, next)=>{
    Employee.findByIdAndUpdate(req.params.id, { $set: req.body},
        (error, data) => {
            if(error){
                return next(error)
            } else {
                res.json(data);
                console.log('Employee updated successfully!');
                
            }
        });
});
// Delete employee
employeeRoute.route('/delete/:id').delete((req, res, next)=>{
    Employee.findOneAndRemove(req.params.id, (error, data)=>{
        if(error){
            return next(error)
        } else {
            res.status(200).json({
                msg: data
            });            
        }
    });
});

module.exports = employeeRoute;
