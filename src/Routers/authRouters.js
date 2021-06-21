const Joi = require('joi');
const AuthController = require('../Controllers/authController');
module.exports = [
    {
        method: 'post',
        path: '/signup',
        
        config: {
            auth: false,
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                    
                })
            },
            handler: async (request, reply) => {
                return AuthController.userSignup(request.payload, reply);
            }
        }
    },
    {
        method: 'post',
        path: '/googleSignup',
        
        config: {
            auth: false,
            validate: {
                payload: Joi.object({
                    token: Joi.string().required()

                })
            },
            handler: async (request, reply) => {
                return AuthController.userGoogleSignup(request.payload, reply);
            }
        }
    },
    {
        method: 'post',
        path: '/login',
        config: {
            auth: false,
            validate: {
                payload: Joi.object({
                        email: Joi.string().email().required(),
                        password: Joi.string().required()
                })
            },
            handler: async (request, reply) => {
                return AuthController.userLogin(request.payload, reply);
            }
        }
    },
    {
        method: 'post',
        path: '/googleLogin',
        config: {
            auth: false,
            validate: {
                payload: Joi.object({
                        token: Joi.string().required()
                })
            },
            handler: async (request, reply) => {
                return AuthController.userGoogleLogin(request.payload, reply);
            }
        }
    },

]
