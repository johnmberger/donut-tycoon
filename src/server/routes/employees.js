const express = require('express');
const router = express.Router();
const { getAll, getOne, getOneEmployee } = require('../queries/queries');
const { newEmployee, editEmployee, deleteEmployee } = require('../queries/posts');

router.get('/', function (req, res, next) {
  getAll('employees')
  .then((employees) => res.render('employees/employees', {employees}));
});

router.get('/new', function (req, res, next) {
  Promise.all([getAll('donuts'), getAll('shops')])
  .then(data => res.render('employees/new', {donuts: data[0], shops: data[1]}));
});

router.get('/:id', function (req, res, next) {
  const employeeID = parseInt(req.params.id);
  getOneEmployee(employeeID)
  .then(employee => res.render('employees/employee', {employee}));
});

router.get('/:id/edit', function (req, res, next) {
  const employeeID = parseInt(req.params.id);
  Promise.all([getOneEmployee(employeeID), getAll('donuts'), getAll('shops')])
  .then(results => res.render('employees/edit', {
    employee: results[0],
    donuts: results[1],
    shops: results[2]
  }));
});

router.post('/new', function (req, res, next) {
  newEmployee(req.body)
  .then(result => {
    getAll('employees')
    .then(employees => res.render('employees/employees', {employees, message: `${result[0].first_name} ${result[0].last_name} has been added.`}));
  });
});

router.post('/:id/edit', function (req, res, next) {
  editEmployee(req.body)
  .then(result => {
    getAll('employees')
    .then(employees => res.render('employees/employees', {employees, message: `${result[0].first_name} ${result[0].last_name} has been updated.`}));
  });
});

router.post('/:id/delete', function (req, res, next) {
  deleteEmployee(parseInt(req.params.id))
  .then(result => {
    getAll('employees')
    .then((employees) => res.render('employees/employees', {employees, message: `${result[0].first_name} ${result[0].last_name} has been deleted.`}));
  });
});

module.exports = router;
