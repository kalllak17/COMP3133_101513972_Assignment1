const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

        username: {
            type: String,
            unique: true,
            required: [true, "User name is required"],
            index: true,
            trim: true
        },
        email: {
            type: String,
            unique: [true, "Email is required"],
            required: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    },
)


module.exports = mongoose.model("User", userSchema);
