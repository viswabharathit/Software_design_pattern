function SignupValidation(values){
    let error = {}
    const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    
    //email
    if(values.name === ""){
        error.name = "Name should not be empty"
    }
    else{
        error.name = "";
    }
    //email
    if(values.email === ""){
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email doesnot match"
    }
    else{
        error.email = "";
    }

    //password
    if(values.password === ""){
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Pa doesnot match"
    }
    else{
        error.password = "";
    }
    return error;

}
export default SignupValidation;