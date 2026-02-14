const {buildSchema} = require('graphql')

const gqlSchema = buildSchema(`
    
    
    # Schemas
    type User{
        _id: ID,
        username: String!,
        email: String!,
    }
    
    type Employee{
        _id: ID,
        first_name: String!,
        last_name: String!,
        email: String!,
        gender: String!,
        designation: String!,
        salary: Float!,
        date_of_joining: String!,
        department: String!,
        employee_photo: String,
        created_at: String!,
        updated_at: String!
    }
    
    
    # Inputs
    
    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    input CreateEmployeeInput {
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
    }
    
    # Root
    
    type Query{
        login(input: UserInput) : User!
        getAllEmployees: [Employee]
        searchEmployeeById(_id: ID): Employee!
        searchEmployeeByDesignationOrDepartment(keyword: String!): [Employee]
    }
    
    type Mutation{
        signup(input: UserInput!): User!
        addNewEmployee(input: CreateEmployeeInput!): Employee!
        updateEmployeeById(_id: ID!, input: CreateEmployeeInput!): Employee!
        deleteEmployeeById(_id: ID!): Boolean
    }
    
    
`);

module.exports = gqlSchema;