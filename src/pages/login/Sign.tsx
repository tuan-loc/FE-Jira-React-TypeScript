import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Loadding from "./componet/Loadding";
import { useAppDispatch } from "redux/hookredux";
import { registerAsync } from "redux/auth/AuthSlices";

interface FormValues {
  email: string;
  passWord: string;
  name: string;
  phoneNumber: string;
}

const Sign: React.FC = () => {
  const dispatch = useAppDispatch();
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
      name: "",
      phoneNumber: "",
    },
    onSubmit: async (values: FormValues) => {
      try {
        setLoading(true);
        await dispatch(registerAsync(values));
        navigate("/");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required("field not required").email("invalid email"),
      passWord: Yup.string().required("field not required"),
      name: Yup.string().required("field not required"),
      phoneNumber: Yup.string().required("field not required"),
    }),
  });

  return loading ? (
    <Loadding />
  ) : (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-center text-2xl text-blue-600">Sign</h1>
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
          <Input onChange={formik.handleChange} name="email" />
          {formik.errors.email && formik.touched.email && (
            <span> {formik.errors.email}</span>
          )}
        </Form.Item>

        <Form.Item label="Password">
          <Input.Password onChange={formik.handleChange} name="passWord" />
          {formik.errors.passWord && formik.touched.passWord && (
            <span> {formik.errors.passWord}</span>
          )}
        </Form.Item>
        <Form.Item label="Name">
          <Input onChange={formik.handleChange} name="name" />
          {formik.errors.name && formik.touched.name && (
            <span> {formik.errors.name}</span>
          )}
        </Form.Item>
        <Form.Item label="SDT">
          <Input onChange={formik.handleChange} name="phoneNumber" />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <span> {formik.errors.phoneNumber}</span>
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
          <Link to={"/"}>login</Link>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 12,
            span: 12,
          }}
        >
          <Button size="large" type="primary" htmlType="submit">
            Sign
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Sign;
