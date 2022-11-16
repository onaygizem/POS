import { Button, Form, Input, PageHeader } from "antd";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ employeeId: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    //
    // event.preventDefault(); {work without this line, have no idea why ...}
    try {
      const mutationResponse = await login({
        variables: {
          employeeId: formState.employeeId,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <PageHeader
        className="site-page-header"
        title="P-O-S"
        subTitle="A customized Point of Sale Application"
      />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={handleFormSubmit}
      >
        <Form.Item
          label="EmployeeId"
          name="employeeId"
          rules={[
            {
              required: true,
              message: "Please input your Employee Id!",
            },
          ]}
        >
          <Input
            placeholder="put employee ID number here"
            name="employeeId"
            type="employeeId"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            placeholder="******"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </Form.Item>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            LOGIN
          </Button>
          <Button type="secondary" htmlType="submit">
            <Link to="/signup">Signup</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
