//code to test add to cart, can swith to other hafl
import { Button, Card } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const handleAddTOCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: 1 },
    });
  };

  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{ width: 240, marginTop: 20, marginBottom: 20 }}
        cover={<img alt="example" src={item.image} />}
      >
        <Meta title={item.name} />
        <div className="item-button">
          <Button onClick={() => handleAddTOCart()}>Add to cart</Button>
        </div>
      </Card>
    </div>
  );
};

export default Product;

//=================================================
// import { Button, Card } from "antd";
// import React from "react";

// const Product = ({ item }) => {
//   const { Meta } = Card;
//   return (
//     <div>
//       <Card
//         hoverable
//         style={{ width: 240, marginTop: 20, marginBottom: 20 }}
//         cover={<img alt="example" src={item.image} />}
//       >
//         <Meta title={item.name} />
//         <div className="item-button">
//           <Button>Add to cart</Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Product;
