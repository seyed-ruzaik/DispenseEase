// login Schema
export const loginSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 7 }
    },
    required: ['email', 'password']
};

// register Schema
export const registerSchema = {
    type: 'object',
    properties: {
        first_name: { type: 'string', minLength: 1 },
        last_name: { type: 'string', minLength: 1 },
        mobile_number: { type: 'string', minLength: 10},
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 7 }
    },
    required: ['first_name', 'last_name', 'mobile_number', 'email', 'password']
};
