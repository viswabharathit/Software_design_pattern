function SignupValidation(values) {
    let error = {};
    const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    // Name
    if (values.name === "") {
        error.name = "Name should not be empty";
    } else {
        error.name = "";
    }
    
    // Email
    if (values.email === "") {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email does not match";
    } else {
        error.email = "";
    }

    // Password
    if (values.password === "") {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password does not match";
    } else {
        error.password = "";
    }
    
    return error;
}

export default SignupValidation;
