const Employee = require("../models/employeeSchema");
const {GraphQLError} = require("graphql");


exports.getAllEmployees = async () => {
    return await Employee.find({});

}

exports.isEmployeeExist = async (first_name, last_name, email, department) => {
    return _isEmployeeExist(first_name, last_name, email, department);
}

exports.createEmployee = async (input) => {

    const {
        first_name,
        last_name,
        email,
        gender,
        designation,
        salary,
        date_of_joining,
        department,
        employee_photo
    } = input;

    var employee = await _isEmployeeExist(first_name, last_name, email, department);

    if (!employee) {

        var created_at = new Date(Date.now());
        var updated_at = null;

        var newEmployee = await Employee.create({
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "gender": gender,
            "designation": designation,
            "salary": salary,
            "date_of_joining": date_of_joining,
            "department": department,
            "created_at": created_at,
            "updated_at": updated_at,
            "employee_photo": employee_photo
        })

        return newEmployee;
    } else {
        throw new GraphQLError("Employee already exists");
    }

}


exports.findEmployeeById = async (id) => {
    var employee = await _findEmployeeById(id);
    return employee;
}

exports.updateEmployee = async (id, input) => {
    const {
        first_name,
        last_name,
        email,
        gender,
        designation,
        salary,
        date_of_joining,
        department,
        employee_photo
    } = input;
    var employee = await _findEmployeeById(id);
    if (employee) {
        employee.first_name = first_name;
        employee.last_name = last_name;
        employee.email = email;
        employee.designation = designation;
        employee.gender = gender;
        employee.salary = salary;
        employee.date_of_joining = date_of_joining;
        employee.department = department;
        employee.employee_photo = employee_photo;
        employee.updated_at = new Date(Date.now());

        await employee.save();
        return employee
    }
    throw new GraphQLError(`Employee with id ${id} not found`);

}

exports.deleteEmployee = async (id) => {
    var employee = await _findEmployeeById(id);
    if (employee) {
        await Employee.deleteOne({_id: id});
        return true;
    } else {
        throw new GraphQLError(`Employee with id ${id} not found`);
    }
}

exports.searchEmployee = async (searchKeyword) => {
    const regex = searchKeyword ? new RegExp(searchKeyword, 'i') : /.*/; // match all if empty
    const res = await Employee.find({
        $or: [
            {department: {$regex: regex}},
            {designation: {$regex: regex}}
        ]
    }).limit(50);

    return res;
}

async function _findEmployeeById(id) {
    var employee = await Employee.findById(id);
    return employee;
}

async function _isEmployeeExist(first_name, last_name, email, department) {
    return await Employee.findOne({
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "department": department,
    });
}