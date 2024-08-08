const router = require('express').Router();
const { validate } = require('express-validation')
const { employeeData } = require('../Validations/EmployeeValidation')
const employeController = require('../Controller/EmployeeController');
const { upload } = require('../upload');



router.post('/add', upload.single('image'), validate(employeeData), employeController.addEmployeDetail);
router.put("/update/:id", upload.single('image'), validate(employeeData), employeController.updateEmployee)
router.delete("/delete/:id", employeController.deleteEmployee)
router.get("/get", employeController.getEmployee)


module.exports = router