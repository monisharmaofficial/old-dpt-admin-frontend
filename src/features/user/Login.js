import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';
import config from '../../config'

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: '',
    emailId: '',
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (loginObj.emailId.trim() === '') return setErrorMessage('Email Id is required!');
    if (loginObj.password.trim() === '') return setErrorMessage('Password is required! ');

    try {
      setLoading(true);

      const response = await axios.post(`${config.baseUrl}/login/`, {
        email: loginObj.emailId,
        password: loginObj.password,
      });

      const { token } = response.data;
 

      localStorage.setItem('token', token);

      setLoading(false);


      window.location.href = '/admin/app/welcome';
    } catch (error) {
      setLoading(false);

      if (error.response) {

        setErrorMessage(error.response.data.msg || 'An error occurred during login.');
      } else {

        setErrorMessage('An error occurred during login.');
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setLoginObj({ ...loginObj, [updateType]: value });
  };


  function logoutUser() {
    axios
      .post('http://localhost:4000/api/logout')
      .then((response) => {
        if (response.data.message === 'Logged out successfully') {
  
          localStorage.clear();

          window.location.href = '/';
        } else {

          console.error('Logout failed:', response.data);
        }
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  type="emailId"
                  defaultValue={loginObj.emailId}
                  updateType="emailId"
                  containerStyle="mt-4"
                  labelTitle="Email Id"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>
         {/*     <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>*/} 
              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
