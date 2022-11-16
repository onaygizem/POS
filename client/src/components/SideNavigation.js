import React, { Fragment, useState, useEffect } from 'react'
import { useQuery } from "@apollo/client";
// import { UserOutlined } from "@ant-design/icons";
import { Menu, Layout, Image } from "antd";
// Import the query we are going to execute from its file
import { QUERY_CAT_SUBCAT_PRODUCT } from "./../utils/queries";
import "./../styles/SideNavigation.css";
import { useDispatch, useSelector } from "react-redux";



const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;


const SideNavigation = () => {

  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.rootReducer);

  // Execute the query on component load
  const { data: QUERY_CAT_SUBCAT_PRODUCT_DATA } = useQuery(QUERY_CAT_SUBCAT_PRODUCT);
  const categoryData = QUERY_CAT_SUBCAT_PRODUCT_DATA?.categories || [];
  const [collapsed, setCollapsed] = useState(false);


  const clickOnMenuItem = (id, product) => {
    let itemInTheChart = false;
    // Check if the product user selected already exists in the chart
    // If it is, dont add it to the chart again. 
    cartProducts.forEach(item => {
      // The item is in the list
      if (item._id === product._id) {
        itemInTheChart = true
        return
      }
    });
    if (!itemInTheChart) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...product, quantity: 1 },
      });
    }
  }


  return (
    <Sider
      // width={200}
      className="site-layout-background">
      <Menu
        style={{ width: 256 }}
        mode="inline"
      >
        {categoryData.map(function (category) {
          return (
            <SubMenu
              key={category._id}
              title={category.name}
              collapsible collapsed={collapsed} 
              onCollapse={(value) => setCollapsed(value)}
            // onTitleClick={() => clickOnMenu(category._id)}
            >
              {(category.subcategories).map(function (subcategories) {
                return (
                  <SubMenu
                    key={subcategories._id}
                    title={subcategories.name}

                  // onTitleClick={() => clickOnMenuItemGroup(subCategoryByCategoryData[key]._id)}
                  // onTitleMouseEnter={() => console.log("left")}
                  >
                    {(subcategories.products).map(function (product) {
                      return (
                        <Menu.Item
                          key={product._id}
                          onClick={() => clickOnMenuItem(product._id, product)}
                          className="productMenuItem"
                        // onMouseLeave={() => console.log("left")}
                        >
                          <Image
                            width={200}
                            src={product.image}
                          />
                          {product.name}
                        </Menu.Item>
                      )
                    })}
                  </SubMenu>
                )
              })}
            </SubMenu>
          )
        })}

      </Menu>
    </Sider>
  );
};
export default SideNavigation;
