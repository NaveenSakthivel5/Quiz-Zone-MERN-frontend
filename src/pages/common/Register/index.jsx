import React, {useState} from 'react'
import { Form, message } from "antd";   
import { Link } from "react-router-dom";
import { registerUser } from '../../../apicalls/users';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

function Register() {

  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await registerUser(values);

      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-primary">
      <div className="card w-400 p-3 bg-white">
        <div className="flex flex-col">
          <h1 className="text-2xl">
            REGISTER<i className="ri-user-add-line"></i>
          </h1>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
          <Form.Item name="name" label="Name" initialValue="">
              <input
                type="text"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </Form.Item>
            <Form.Item name="email" label="Email" initialValue="">
              <input
                type="text"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </Form.Item>
            <Form.Item name="password" label="Password" initialValue="">
              <input
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </Form.Item>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Register
              </button>
              <Link to="/login">Already a member? Login</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register