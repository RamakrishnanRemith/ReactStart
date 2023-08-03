function Validation(values) {
  let errors = {};

  if (values.email === "") {
    errors.email = "Email should not be empty";
  }

  if (values.password === "") {
    errors.password = "Password should not be empty";
  }

  return errors;
}

export default Validation;
