const db = require("../config/connections");
const { User, Product, Category, Subcategory, Order } = require("../models");

db.once("open", async () => {
  //clean databse
  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "KSUBI BROOKLYN JEANS RAVEN BLACK",
      price: 110,
      stock: 10,
      image: "images/Ksubi-1.jpg",
    },
    {
      name: "KSUBI HI N WASTED JEANS",
      price: 189,
      stock: 10,
      image: "images/Ksubi-2.jpg",
    },
    {
      name: "KSUBI BLACK CHITCH SONIC JEANS",
      price: 219.95,
      stock: 10,
      image: "images/Ksubi-3.jpg",
    },
    {
      name: "KOOKAI ARIEL STAPLE MINI DRESS",      
      price: 220,
      stock: 10,
      image: "images/Kookai-1.jpg",
    },
    {
      name: "KOOKAI SERAH TANK MIDI DRESS",     
      price: 240,
      stock: 10,
      image: "images/Kookai-2.jpg",
    },
    {
      name: "KOOKAI OYSTER TAPERED PANT",      
      price: 180,
      stock: 10,
      image: "images/Kookai-3.jpg",
    },
    {
      name: "STUSSY MEN'S CITY FLOWERS HOOD",     
      price: 109.95,
      stock: 10,
      image: "images/Stussy-1.jpg",
    },
    {
      name: "STUSSY GRAFFITI PIGMENT RELAXED T-SHIRT",    
      price: 59.95,
      stock: 10,
      image: "images/Stussy-2.jpg",
    },
    {
      name: "STUSSY KING S HW T-SHIRT ",      
      price: 69.95,
      stock: 10,
      image: "images/Stussy-3.jpg",
    },
    {
      name: "ZARA OYSTER WHITE ",      
      price: 109,
      stock: 10,
      image: "images/Zara-1.jpg",
    },
    {
      name: "ZARA TOP WITH RHINESTONES",     
      price: 99.95,
      stock: 10,
      image: "images/Zara-2.jpg",
    },
    {
      name: "ZARA COTTON T-SHIRT",      
      price: 39.95,
      stock: 10,
      image: "images/Zara-3.jpg",
    },
    {
      name: "NIKE AIR JORDAN MENS 1 MID SE SHOES",      
      price: 199.95,
      stock: 10,
      image: "images/Nike-1.jpg",
    },
    {
      name: "NIKE JORDAN 4 RETRO MILITARY BLACK",  
      price: 218,
      stock: 10,
      image: "images/Nike-2.jpg",
    },
    {
      name: "NIKE DUNK HIGH 1985",  
      price: 190,
      stock: 10,
      image: "images/Nike-3.jpg",
    },
    {
      name: "ADIDAS NMD_R1 SHOES BLACK",  
      price: 220,
      stock: 10,
      image: "images/Adidas-1.jpg",
    },
    {
      name: "ADIDAS OZELLE CLOUDFOAM LIFESTYLE RUNNING SHOES",  
      price: 120,
      stock: 10,
      image: "images/Adidas-2.jpg",
    },
    {
      name: "ADIDAS FORUM LOW",  
      price: 149.95,
      stock: 10,
      image: "images/Adidas-3.jpg",
    },
    {
      name: "VANS OLD SKOOL CLASSIC",  
      price: 139.95,
      stock: 10,
      image: "images/Vans-1.jpg",
    },
    {
      name: "VANS OLD SKOOL CLASSIC DAISY",  
      price: 129.95,
      stock: 10,
      image: "images/Vans-2.jpg",
    },
    {
      name: "VANS AUTHENTIC PIG SUEDE",  
      price: 129.95,
      stock: 10,
      image: "images/Vans-3.jpg",
    },
    {
      name: "VEJA CAMPO IN WHITE N NATURAL",  
      price: 225,
      stock: 10,
      image: "images/Veja-1.jpg",
    },
    {
      name: "VEJA CAMPO IN WHITE N PINK",  
      price: 225,
      stock: 10,
      image: "images/Veja-2.jpg",
    },
    {
      name: "VEJA CAMPO IN PINK",  
      price: 210,
      stock: 10,
      image: "images/Veja-3.jpg",
    },
    {
      name: "RAY-BAN THE MARSHALL II",  
      price: 222,
      stock: 10,
      image: "images/Rayban-1.jpg",
    },
    {
      name: "RAY-BAN CLUBMASTER METAL",  
      price: 222,
      stock: 10,
      image: "images/Rayban-2.jpg",
    },
    {
      name: "RAY-BAN LEONARD",  
      price: 238,
      stock: 10,
      image: "images/Rayban-3.jpg",
    },
    {
      name: "DANIEL WELLINGTON QUADRO ASHFIELD 29mm",  
      price: 409,
      stock: 10,
      image: "images/DW-1.jpg",
    },
    {
      name: "DANIEL WELLINGTON GIFT SET - PETITE EVERGOLD 28mm + LUMINE UNITY BRACELET",  
      price: 378,
      stock: 10,
      image: "images/DW-2.jpg",
    },
    {
      name: "DANIEL WELLINGTON QUADRO STUDIO",  
      price: 329,
      stock: 10,
      image: "images/DW-3.jpg",
    },
    {
      name: "SEAFOLLY COLLAPSIBLE FEDORA",  
      price: 39.95,
      stock: 10,
      image: "images/Seafolly-1.jpg",
    },
    {
      name: "SEAFOLLY PLAITED ROPE TOTE",  
      price: 79.95,
      stock: 10,
      image: "images/Seafolly-2.jpg",
    },
    {
      name: "SEAFOLLY TERRY BEACH BUNDLE",  
      price: 119.95,
      stock: 10,
      image: "images/Seafolly-3.jpg",
    },
    {
      name: "LORNA JANE ESSENTIALS KIT",  
      price: 55,
      stock: 10,
      image: "images/LJ-1.jpg",
    },
    {
      name: "LORNA JANE ORIGINAL ACTIVEWEAR CANVAS DUFFLE BAG",  
      price: 100,
      stock: 10,
      image: "images/LJ-2.jpg",
    },
    {
      name: "LORNA JANE ACTIVE LIVING DIARY 2023",  
      price: 30,
      stock: 10,
      image: "images/LJ-3.jpg",
    },
  ]);

  console.log("==================");
  console.log("products seeded");
  console.log("==================");

  await Subcategory.deleteMany();

  const subcategories = await Subcategory.insertMany([
    {
      name: "Ksubi",
    },
    {
      name: "Kookai",
    },
    {
      name: "Stussy",
    },
    {
      name: "Zara",
    },
    {
      name: "Nike",
    },
    {
      name: "Adidas",
    },
    {
      name: "Vans",
    },
    {
      name: "Veja",
    },
    {
      name: "Ray-Ban",
    },
    {
      name: "Daniel Wellington",
    },
    {
      name: "Seafolly",
    },
    {
      name: "Lorna Jane",
    },
  ]);

  let index = 0;
  for (subCat of subcategories) {
    subCat.products.push(products[index]);
    subCat.products.push(products[index + 1]);
    subCat.products.push(products[index + 2]);
    await subCat.save();
    index = index + 3;
  }

  console.log("==================");
  console.log("subcategories seeded");
  console.log("==================");

  await Category.deleteMany();

  const categories = await Category.insertMany([
    {
      name: "Apparel",
    },
    {
      name: "Sneakers",
    },
    {
      name: "Accessories",
    },
  ]);

  let iindex = 0;
  for (cat of categories) {
    cat.subcategories.push(subcategories[iindex]);
    cat.subcategories.push(subcategories[iindex + 1]);
    cat.subcategories.push(subcategories[iindex + 2]);
    cat.subcategories.push(subcategories[iindex + 3]);
    await cat.save();
    iindex = iindex + 4;
  }

  console.log("==================");
  console.log("categories seeded");
  console.log("==================");

  await User.deleteMany();

  await User.create({
    name: "testName",
    employeeId: "123456",
    password: "password12345",
  });

  console.log("==================");
  console.log("users seeded");
  console.log("==================");

  await Order.deleteMany();

  await Order.insertMany([
    {
      customerName: "Daisy Green",
      customerNumber: 123456789,
      paymentMode: "Card",
      total: 404.55,
      grandTotal: 445,
      tax: 40.45,
      products: [products[3]._id, products[22]._id]
    },
    {
      customerName: "James Howard",
      customerNumber: 123456788,
      paymentMode: "Card",
      total: 281.73,
      grandTotal: 309.90,
      tax: 28.17,
      products: [products[6]._id, products[12]._id]
    },
 ]);

  console.log("==================");
  console.log("order seeded");
  console.log("==================");

  process.exit(0);
});
