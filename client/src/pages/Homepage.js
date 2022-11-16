//code to test add to cart, can switch back to other half
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import BasicLayout from "../components/BasicLayout";
import Product from "../components/Product";
import { useNavigate } from "react-router-dom";
import { QUERY_PRODUCTS } from "../utils/queries";
import CartPage from "./../pages/CartPage";

const Homepage = () => {

  const navigate = useNavigate();
  const { cartProducts } = useSelector((state) => state.rootReducer);

  const { data } = useQuery(QUERY_PRODUCTS);
  const productData = data?.products || [];


  return (
    <BasicLayout>
      {/* <div
        className="cart-item d-flex jusitfy-content-space-between flex-row"
        onClick={() => navigate("/cart")}
      >
        <p>{cartProducts.length}</p>
        <ShoppingCartOutlined />
      </div>
      <Row>
        {productData.map((products) => (
          <Col xs={24} lg={6} md={12} sm={6}>
            <Product item={products} />
          </Col>
        ))}
      </Row> */}
      <CartPage />
    </BasicLayout>
  );
};

export default Homepage;
