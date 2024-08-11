function LoginValidation(values){
    let error = {}
    const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if(values.email === ""){
        error.email = "Name should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email doesnot match"
    }
    else{
        error.email = "";
    }

    //password
    if(values.password === ""){
        error.email = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Password doesnot match"
    }
    else{
        error.password = "";
    }
    return error;

}
export default LoginValidation;