export const invalidCasesLogin = [
  {
    description: 'should throw error for missing email',
    user: {
      email: '',
      password: '@Password1'
    },
    expectedError: 'Email is required'
  },
  {
    description: 'should throw error for missing password',
    user: {
      email: 'johndoe@gmail.com',
      password: ''
    },
    expectedError: 'Password is required'
  },
  {
    description: 'should throw error for invalid password',
    user: {
      email: 'johndoe@gmail.com',
      password: 'e'
    },
    expectedError: 'Password is incorrect'
  }
];
