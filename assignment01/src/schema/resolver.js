const userService = require('../service/user.service');
const employeeService = require("../service/employee.service")
const rootResolver = {
    login: async ({input}) => {
        const {username, email, password} = input;
        return await userService.login(username, email, password);
    },
    signup: async ({input}) => {
        const {username, email, password} = input;
        return await userService.createUser(username, email, password);
    },
    addNewEmployee: async ({input}) => {
        return await employeeService.createEmployee(input);
    },
    updateEmployeeById: async ({_id, input}) => {
        return await employeeService.updateEmployee(_id, input);
    },
    deleteEmployeeById: async ({_id}) => {
        return await employeeService.deleteEmployee(_id);
    },
    getAllEmployees: async () => {
        return await employeeService.getAllEmployees();
    },
    searchEmployeeById: async ({_id}) => {
        return await employeeService.findEmployeeById({_id});
    },
    searchEmployeeByDesignationOrDepartment: async ({keyword}) => {
        return await employeeService.searchEmployee(keyword);
    },

}

module.exports = rootResolver;