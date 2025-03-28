export const invalidCases = [
  {
    description: 'should throw error for invalid email format',
    user: {
      name: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'invalid-email',
      password: '@Password1',
      role: 'user'
    },
    expectedError: 'Email must be from gmail, hotmail or outlook'
  },
  {
    description: 'should throw error for weak password',
    user: {
      name: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: 'weakpassword',
      role: 'user'
    },
    expectedError:
      'Password must be 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character and 8 characters long'
  },
  {
    description: 'should throw error for invalid role',
    user: {
      name: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: '@Password1',
      role: 'invalid-role'
    },
    expectedError: 'Role must be either admin or user'
  }
];
