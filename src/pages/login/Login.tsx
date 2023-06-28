import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loadding from "./componet/Loadding";
import { loginAsync } from "redux/auth/AuthSlices";
import { login } from "model";
import { useAppDispatch, useAppSelector } from "redux/hookredux";
const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const persons = useAppSelector((state) => state);
  console.log(persons);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
    },
    onSubmit: async (values: login) => {
      try {
        dispatch(loginAsync(values));
        navigate("/projectmanager");
      } catch (error) {}
    },
    validationSchema: Yup.object({
      email: Yup.string().required("field not required").email("invalid email"),
      passWord: Yup.string().required("field not required"),
    }),
  });

  return loading ? (
    <Loadding />
  ) : (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-center text-2xl text-blue-600">Login</h1>
      <Form
        onSubmitCapture={formik.handleSubmit}
        className="w-1/2"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
      >
        <Form.Item label="Email">
          <Input name="email" onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email && (
            <span> {formik.errors.email}</span>
          )}
        </Form.Item>

        <Form.Item label="Password">
          <Input.Password name="passWord" onChange={formik.handleChange} />
          {formik.errors.passWord && formik.touched.passWord && (
            <span> {formik.errors.passWord}</span>
          )}
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
          <Link to={"/sign"}>sign</Link>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 12,
            span: 12,
          }}
        >
          <Button size="large" type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
