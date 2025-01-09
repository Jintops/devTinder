const validator = require('validator')

const validateSignUpDate = (req) => {

  const { firstName, lastName, emailId, password } = req.body
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid")
  } else if (!validator.isStrongPassword(password)) {
    throw new Error('Please enter a strong password')
  }

}

const validateEditProfileDate = (req) => {
  const allowedUpdate = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "skills",
    "photoUrl"
  ];
  const isValidProfile = Object.keys(req.body).every((field) =>
    allowedUpdate.includes(field)
  );
  return isValidProfile;
};


const validatePassword = (req) => {
  const { password } = req.body;
  if (!validator.isStrongPassword(password)) {
    throw new Error('Please enter a strong password')
  }
}

module.exports = {
  validateSignUpDate,
  validateEditProfileDate,
  validatePassword
}

