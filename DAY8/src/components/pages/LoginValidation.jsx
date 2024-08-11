function LoginValidation(values) {
    let errors = {};
    const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (values.email === "") {
      errors.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "Email does not match";
    }
  
    if (values.password === "") {
      errors.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
      errors.password = "Password does not match";
    }
  
    return errors;
  }
  
  export default LoginValidation;
  