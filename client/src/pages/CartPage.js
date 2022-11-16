import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import BasicLayout from "../components/BasicLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Table, Form, Select, Input } from "antd";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "./../utils/mutations";

const CartPage = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [totalPopup, setTotalPopup] = useState(false);

  const dispatch = useDispatch();

  const { cartProducts } = useSelector((state) => state.rootReducer);

  // Mutation to create invoice
  const [updateStock] = useMutation(ADD_ORDER);

  //handle increament
  const handleIncreament = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };
  //decrease
  const handleDecreament = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecreament(record)}
          />
          <b>{record.quantity}</b>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncreament(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: "DELETE_FROM_CART",
              payload: record,
            })
          }
        />
      ),
    },
  ];

  //to get total price
  useEffect(() => {
    let sum = 0;
    cartProducts.forEach(
      (element) => (sum = sum + element.price * element.quantity)
    );
    setTotal(sum);
  }, [cartProducts]);


  // Cart is not saved, refresh page would clear the cart
  const handleSubmit = async (value) => {
    // Set the types
    value.customerNumber = parseFloat(value.customerNumber);

    let products = [];
    let productsIdObj = {};

    cartProducts.map((item) => {
      productsIdObj = {"_id": item._id}
      products.push(productsIdObj)
    })

    const newObject = {
      ...value,
      products,
      total,
      tax: Number(((total / 100) * 10).toFixed(2)),
      grandTotal: Number(
        Number(total) + Number(((total / 100) * 10).toFixed(2))
      ),
    };

    const mutationResponse = await updateStock({
      variables: newObject
    });
    console.log(newObject);
    console.log(mutationResponse);
    window.location.replace("/invoice") // Hacky solution to re-render invoice page. normally use navigate("/invoice");
  };

  return (
    // <BasicLayout>
    <Fragment>
      <h1>Cart Page</h1>
      <Table columns={columns} dataSource={cartProducts} bordered />
      <div className="d-flex flex-column alig-item-end">
        <hr />
        <h3>
          Sub Total : $<b> {total}</b>
        </h3>
        <Button type="primary" onClick={() => setTotalPopup(true)}>
          Create Invoice
        </Button>
      </div>
      <Modal
        title="Create Invoice"
        visible={totalPopup}
        onCancel={() => setTotalPopup(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item 
          name="customerNumber" 
          label="Contact Number"
          >
            <Input />
          </Form.Item>
          <Form.Item name="paymentMode" label="Payment Method">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-it">
            <h5>
              Sub Total : <b>{total}</b>
            </h5>
            <h4>
              TAX :<b> {((total / 100) * 10).toFixed(2)}</b>
            </h4>
            <h3>
              GRAND TOTAL :{" "}
              <b>{Number(total) + Number(((total / 100) * 10).toFixed(2))}</b>
            </h3>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Create Invoice
            </Button>
          </div>
        </Form>
      </Modal>
    </Fragment>
    // </BasicLayout>
  );
};

export default CartPage;
