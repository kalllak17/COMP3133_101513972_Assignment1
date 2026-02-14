const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const {GraphQLError} = require("graphql");


exports.createUser = async (username, email, password) => {

    try {
        const existing = await checkUserExists(username, email);

        if (!existing) {
            const passwordHashed = await bcrypt.hash(password, 10);
            return await User.create({
                "username": username,
                "email": email,
                "password": passwordHashed,
            });
        } else {
            throw new GraphQLError("User already exists");
        }
    }catch (e){
        throw e;
    }

}

exports.login = async (username, email, password) => {
    try {
        let user = await checkUserExists(username, email);

        if (!user) {
            throw new GraphQLError("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new GraphQLError("Invalid credentials");
        }

        return user;
    }
    catch (e){
        throw e;
    }
}

async function checkUserExists(username, email) {
    return User.findOne(
        {
            $or: [
                {username: username},
                {email: email}
            ]
        }
    );
}