const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
        first_name: {
            type: String,
            required: [true, "First name is required"],
            minlength: [2, "First Name must be at least 2 characters long"],
            lowercase: true,
            trim: true,
        },
        last_name: {
            type: String,
            required: [true, "Last Name is required"],
            minlength: [2, "Last Name must be at least 2 characters long"],
            lowercase: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            unique: true,
            match: [/.+@.+\..+/, "Please fill a valid email address"]
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true,
        },
        designation: {
            type: String,
            required: [true, "Designation is required"],
            lowercase: true,
            trim: true
        },

        salary: {
            type: Number,
            required: true,
            min: [1000, "Salary must be at least $1,000"],
        },
        date_of_joining: {
            type: Date,
            required: [true, "Date of joining is required"],

        },
        department: {
            type: String,
            required: [true, "Department is required"],
            trim: true,
            lowercase: true,

        },
        employee_photo: {
            type: String,

        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

module.exports = mongoose.model("Employee", employeeSchema);