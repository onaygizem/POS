import { Button, Form, Input, PageHeader } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ employeeId: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        name: formState.name,
        password: formState.password,
        employeeId: formState.employeeId,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
            placeholder="Your Employee ID number here"
            name="employeeId"
            type="employeeId"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
        >
          <Input
            placeholder="Your Name Here"
            name="name"
            type="name"
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
            placeholder="Your Password Here"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Signup
          </Button>
          <Button type="secondary" htmlType="submit">
            <Link to="/">Login</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signup;
