import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS for Toastify is imported
import '../../assets/css/styles.css';
import '../../assets/css/login.css';

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

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = LoginValidation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (values.password === 'Example@123') {
        toast.success("Sign In Successful!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setLoginSuccess(true);
        setTimeout(() => {
          if (values.email === 'admin24@gmail.com') {
            navigate('/admin');
          } else {
            navigate('/alltasks');
          }
        }, 2000); // Adjust timeout to match toast duration
      } else {
        toast.error("Invalid password", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error("Validation errors", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center h-screen bg-black relative">
        {loginSuccess && (
          <div className="absolute bottom-0 left-0 mb-4 ml-4 bg-green-500 text-white py-2 px-4 rounded-md font-oswald">
            Login successful
          </div>
        )}
        <div className="w-1/3 border-2 rounded-2xl p-10 bg-white">
          <h1 className="text-4xl font-bold mb-8 text-center text-black font-oswald">Login Form</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={values.email}
                onChange={handleInput}
                className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none placeholder-gray-500 transition-all"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={values.password}
                onChange={handleInput}
                className="w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none placeholder-gray-500 transition-all"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md">
              Log In
            </button>
            <p className="text-center text-gray-600 text-sm">By clicking this you agree to our terms and policies</p>
            <Link to="/register" className="w-full block text-center bg-gray-300 text-gray-700 py-2 rounded-md">
              Create Account
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
