import React, { Fragment, useState } from "react";
import BasicLayout from "../components/BasicLayout";
import {
  Input,
  Collapse,
  Space,
  Card,
  List,
  Button,
  Modal,
  Form,
  Select,
} from "antd";
import "./../styles/ProductPageLayout.css";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PRODUCT_BY_NAME, QUERY_CAT_SUBCAT_PRODUCT } from "./../utils/queries";
import { UPDATE_PRODUCT_STOCK, ADD_PRODUCT } from "./../utils/mutations";

const { Panel } = Collapse;
const { Search } = Input;

const ProductPage = () => {
  const [popupModal, setPopupModal] = useState(false);

  // State for search parameter
  const [productName, setProductName] = useState(0);

  // State for add product category selection
  const [addProductCat, setAddProductCat] = useState("");

  // State for add product sub category selection
  const [addProductSubCat, setAddProductSubCat] = useState("");

  // State for add product save form text
  const [addProductSaveText, setAddProductSaveText] = useState('Save');

  // Query for product name with a variable
  const { data: QUERY_PRODUCT_BY_NAME_DATA } = useQuery(QUERY_PRODUCT_BY_NAME, {
    variables: { name: productName },
  });
  const productByNameData = QUERY_PRODUCT_BY_NAME_DATA?.products || [];

  // Query for getting all the categories, subcategories and products
  const { data: QUERY_CAT_SUBCAT_PRODUCT_DATA } = useQuery(QUERY_CAT_SUBCAT_PRODUCT);
  const catSubcatProductData = QUERY_CAT_SUBCAT_PRODUCT_DATA?.categories || [];

  // Mutation to update product information: price and stock
  const [updateStock] = useMutation(UPDATE_PRODUCT_STOCK);

  // Mutation to add a new product
  const [addProduct] = useMutation(ADD_PRODUCT);



  const handleFormSubmit = async (id, priceUpdate, stockUpdate) => {
    // event.preventDefault();
    const mutationResponse = await updateStock({
      variables: {
        id: id,
        price: parseFloat(priceUpdate),
        stock: parseFloat(stockUpdate)
      },
    });
    console.log(mutationResponse);
  };

  const onSearch = async function (name) {
    // If the search string is empty, do not return any data
    if (name === "") {
      console.log("this is null");
      setProductName(0)
    } else {
      setProductName(name)
    }
  }

  const onChange = async function (value) {
    console.log(value);
  }

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };


  const SearchList = () => {
    return (
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={productByNameData}
        renderItem={item => (

          <List.Item
            id={item._id}
          >
            <Card title={item.name}>
              <Form.Provider
                onFormFinish={(name, { forms }) => {
                  // Get the id from the formname
                  let id = name.substring(8);
                  // construct the field name
                  let priceFieldName = `price${id}`;
                  let stockFieldName = `stock${id}`;
                  // Get the price field value
                  let priceFieldValue = forms[name].getFieldValue(priceFieldName)
                  let stockFieldValue = forms[name].getFieldValue(stockFieldName)
                  console.log(priceFieldValue);
                  console.log(stockFieldValue);
                  handleFormSubmit(id, priceFieldValue, stockFieldValue)
                }}
              >
                <Form
                  {...layout}
                  name={`formname${item._id}`}
                >
                  <Form.Item
                    name={`price${item._id}`}
                    label={`Price `}
                    initialValue={item.price}
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={`stock${item._id}`}
                    label={`Stock `}
                    initialValue={item.stock}
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      className="updateSearchButton"
                    >
                      Update
                    </Button>
                  </Form.Item>
                </Form>
              </Form.Provider>
            </Card>
          </List.Item>
        )}
      />
    )
  }

  const addProductClickCat = (value, option) => {
    let catId = value.replace("addProductCat", "")
    setAddProductCat(catId)
    console.log(addProductCat);
  }

  const addProductClickSubCat = (value, option) => {
    let subCatId = value.replace("addProductSubCat", "")
    setAddProductSubCat(subCatId)
    console.log(addProductSubCat);
  }

  const handleAddProductFormSubmit =
    async (
      addProductNameValue,
      addProductPriceValue,
      addProductStockValue,
      addProductImageValue,
      addProductCatValue,
      addProductSubCatValue
    ) => {

      let addProductObj = {
        "name": addProductNameValue,
        "stock": parseFloat(addProductStockValue),
        "price": parseFloat(addProductPriceValue),
        "image": addProductImageValue,
        "subcategory": addProductSubCatValue.replace("addProductSubCat", "")
      }

      const addProductMutationResponse = await addProduct({
        variables: addProductObj
      });

      console.log(addProductMutationResponse);
      setAddProductSaveText("Saved!")
    }

  // const newObject = {
  //   ...value,
  //   products,
  //   total,
  //   tax: Number(((total / 100) * 10).toFixed(2)),
  //   grandTotal: Number(
  //     Number(total) + Number(((total / 100) * 10).toFixed(2))
  //   ),
  // };

  // const mutationResponse = await updateStock({
  //   variables: newObject
  // });
  // console.log(newObject);
  // console.log(mutationResponse);



  return (
    <BasicLayout>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Search
          className="searchBar"
          placeholder="Search for a product"
          onSearch={onSearch}
          enterButton
        />
        <SearchList />
        <Collapse
          // defaultActiveKey={["1"]} 
          onChange={onChange}
        >
          {catSubcatProductData.map(function (category) {
            return (
              <Panel header={category.name} key={category._id}>
                <Collapse
                  // defaultActiveKey={["1"]} 
                  onChange={onChange}
                >
                  {(category.subcategories).map(function (subcategories) {
                    return (
                      <Panel header={subcategories.name} key={subcategories._id}>
                        <Space
                          direction="vertical"
                          size="middle"
                          style={{ display: "flex" }}
                        >
                          {(subcategories.products).map(function (products) {
                            return (
                              <Fragment>
                                <div
                                  className="itemDiv"
                                  key={products._id}
                                >
                                  <p className="itemName">{products.name}</p>
                                  <Form.Provider
                                    onFormFinish={(name, { forms }) => {
                                      // Get the id from the formname
                                      let id = name.substring(8);
                                      // construct the field name
                                      let priceFieldName = `price${id}`;
                                      let stockFieldName = `stock${id}`;
                                      // Get the price field value
                                      let priceFieldValue = forms[name].getFieldValue(priceFieldName)
                                      let stockFieldValue = forms[name].getFieldValue(stockFieldName)
                                      console.log(id);
                                      console.log(priceFieldValue);
                                      console.log(stockFieldValue);

                                      handleFormSubmit(id, priceFieldValue, stockFieldValue)
                                    }}
                                  >
                                    <Form
                                      {...layout}
                                      name={`formname${products._id}`}
                                      className="formDiv"
                                    >
                                      <Form.Item
                                        name={`price${products._id}`}
                                        label={`Price `}
                                        initialValue={products.price}
                                        rules={[
                                          {
                                            required: false,
                                          },
                                        ]}
                                        className="priceFormDiv"
                                      >
                                        <Input />
                                      </Form.Item>
                                      <Form.Item
                                        name={`stock${products._id}`}
                                        label={`Stock `}
                                        initialValue={products.stock}
                                        rules={[
                                          {
                                            required: false,
                                          },
                                        ]}
                                        className="stockFormDiv"
                                      >
                                        <Input />
                                      </Form.Item>
                                      <Form.Item>
                                        <Button
                                          htmlType="submit"
                                          className="updateTreeButton"
                                        >Update</Button>
                                      </Form.Item>
                                    </Form>
                                  </Form.Provider>
                                </div>
                              </Fragment>
                            )
                          })}
                        </Space>
                      </Panel>
                    )
                  })}
                </Collapse>
              </Panel>
            )
          })}
        </Collapse>
      </Space>

      {/* a button and a pop modal for add new product, need to be fixed to useMusation to save data to db, need a function for form when onFinish */}
      <Button 
      type="primary" 
      onClick={() => setPopupModal(true)}
      id="addProductModalButton"
      >
        Add Product
      </Button>
      <Modal
        title={"Add New Product"}
        visible={popupModal}
        onCancel={() => {
          setPopupModal(false);
        }}
        footer={false}
      >
        <Form.Provider
          onFormFinish={(name, { forms }) => {
            // Get the field values
            let addProductNameValue = forms[name].getFieldValue("addProductName")
            let addProductPriceValue = forms[name].getFieldValue("addProductPrice")
            let addProductStockValue = forms[name].getFieldValue("addProductStock")
            let addProductImageValue = forms[name].getFieldValue("addProductImage")
            let addProductCatValue = forms[name].getFieldValue("addProductCat")
            let addProductSubCatValue = forms[name].getFieldValue("addProductSubCat")

            handleAddProductFormSubmit(
              addProductNameValue,
              addProductPriceValue,
              addProductStockValue,
              addProductImageValue,
              addProductCatValue,
              addProductSubCatValue
            )
          }}
        >
          <Form
            layout="vertical"
            name="addProductForm"
          >
            <Form.Item name="addProductName" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="addProductPrice" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="addProductStock" label="Stock">
              <Input />
            </Form.Item>
            <Form.Item name="addProductImage" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="addProductCat" label="Category">
              <Select
                onChange={(value, option) => addProductClickCat(value, option)}
              >
                {catSubcatProductData.map(function (category) {
                  return (
                    <Fragment>
                      <Select.Option
                        key={`addProductCat${category._id}`}
                      >
                        {category.name}
                      </Select.Option>
                    </Fragment>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item name="addProductSubCat" label="subcategory">
              <Select
                onChange={(value, option) => addProductClickSubCat(value, option)}
              >
                {catSubcatProductData.map(function (category) {
                  {
                    if (category._id === addProductCat) {
                      return (
                        (category.subcategories).map(function (subcategories) {
                          return (
                            <Fragment>
                              <Select.Option
                                key={`addProductSubCat${subcategories._id}`}
                              >
                                {subcategories.name}
                              </Select.Option>
                            </Fragment>
                          )
                        })
                      )
                    }
                  }
                })}
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                {addProductSaveText}
              </Button>
            </div>
          </Form>
        </Form.Provider>
      </Modal>
    </BasicLayout>
  );
};

export default ProductPage;