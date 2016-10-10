const express = require('express');
const router = express.Router();
const { getAll, getOne, getOneEmployee } = require('../queries/queries');

router.get('/', function (req, res, next) {
  getAll('employees')
  .then((employees) => res.render('employees/employees', {employees}));
});

router.get('/:id', function (req, res, next) {
  const employeeID = parseInt(req.params.id);
  getOneEmployee(employeeID)
  .then(employee => res.render('employees/employee', {employee}));
});

module.exports = router;
