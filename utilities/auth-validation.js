const joi = require('@hapi/joi');

const loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().min(3).required().email(),
        password: joi.string().min(3).required()
    })
    return schema.validate(data);
}
const registerValidation = (data) => {
    const schema = joi.object({
        fullname: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    })
    return schema.validate(data);
}

module.exports = { loginValidation, registerValidation };