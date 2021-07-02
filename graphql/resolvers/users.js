const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server')

const {validateRegisterInput, validateLoginInput} = require('../../utils/formCheck')
const {SECRET_KEY} = require('../../config')
const User = require('../../models/User');

const generateToken = (res) => {
    return jwt.sign({
        id: res.id, 
        email: res.email, 
        username: res.username, 
    }, SECRET_KEY, {expiresIn: '1h'});
}

module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();
                return users
            } catch(err) {
                throw new Error(err)
            }
        },
    },
    Mutation: {
        async login(_, {username, password}) {
            const {valid, errors} = validateLoginInput(username, password);
            if(!valid) {
                throw new UserInputError('Invalid user', {errors});

            }
            const user = await User.findOne({username})
            if(!user) {
                errors.general = 'User not found'
                throw new UserInputError('User not found', {errors});
            }
            const match = await bcrypt.compare(password, user.password)
            if(!match) {
                errors.general = 'Wrong creds'
                throw new UserInputError('Wrong creds', {errors});
            }

            const token = generateToken(user)

            return {
                ...user._doc, 
                id: user._id, 
                token
            }
        },
       async register(
            _, 
            {registerInput: {username, email, password, confirmPassword}},
        ) {
            // validate user data
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }
            // Make sure username is unique 
            const user = await User.findOne({username})
            if (user) {
                throw new UserInputError('Username is taken',  {
                    errors: {
                        username: 'This username is already used'
                    }
                })
            }
            // hash passwords and create auth token
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                email, 
                username, 
                password, 
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save()

            const token = generateToken(res)

            return {
                ...res._doc, 
                id: res._id, 
                token
            }
        }
    }
}