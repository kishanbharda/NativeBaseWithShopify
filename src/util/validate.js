import validation from 'validate.js';

export const validationDictionary = {
  firstName: {
    presence: {
      allowEmpty: false,
      message: "^First name can't be blank"
    }
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: "^Last name can't be blank"
    }
  },
  email: {
    presence: {
      allowEmpty: false,
      message: "^Email can't be blank"
    },
    email: {
      message: "^Email address must be valid"
    }
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "^Password can't be blank"
    }
  },
};


const validate = (type, value) => {
  const result = validation(
    {
      [type]: value
    },
    {
      [type]: validationDictionary[type]
    }
  );

  if (result) {
    return result[type][0];
  }

  return null;
}

export default validate
