import  express  from "express"
import cors  from "cors"
import cookieParser from "cookie-parser"

const app =express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({ extended: true, limit:"16kb"}))
app.use(cookieParser())
app.use(express.static("public"))


//router import 
import userRouter from '../routes/userroutes.js'
import orderRouter  from "../routes/order.router.js"







const products = [
    {
      id: 0,
      name: "Product 1",
      tag: "Product 1",
      price: 100,
      quantity: 0,
    },
    {
      id: 1,
      name: "Product 2",
      tag: "Product 2",
      price: 100,
      quantity: 0,
    },
    {
      id: 2,
      name: "Product 3",
      tag: "Product 3",
      price: 200,
      quantity: 0,
    },
    {
      id: 3,
      name: "Product 4",
      tag: "Product 4",
      price: 100,
      quantity: 0,
    },
    {
      id: 4,
      name: "Product 5",
      tag: "Product 5",
      price: 200,
      quantity: 0,
    },
    {
      id: 5,
      name: "Product 6",
      tag: "Product 6",
      price: 100,
      quantity: 0,
    },
    {
      id: 6,
      name: "Product 7",
      tag: "Product 7",
      price: 200,
      quantity: 0,
    },
    {
      id: 7,
      name: "Product 8",
      tag: "Product 8",
      price: 100,
      quantity: 0,
    },
    {
      id: 8,
      name: "Product 9",
      tag: "Product 9",
      price: 200,
      quantity: 0,
    },
    {
      id: 9,
      name: "Product 10",
      tag: "Product 10",
      price: 100,
      quantity: 0,
    },
    {
      id: 10,
      name: "Product 11",
      tag: "Product 11",
      price: 200,
      quantity: 0,
    },
    {
      id: 11,
      name: "Product 12",
      tag: "Product 12",
      price: 100,
      quantity: 0,
    },
    {
      id: 12,
      name: "Product 13",
      tag: "Product 13",
      price: 200,
      quantity: 0,
    },
    // ... add more product here products
  ];




















app.get('/api/v1/products', (req, res) => {
    res.json(products);
  });






//routes declaration 
app.use("/api/v1/users", userRouter)
app.use("/api/v1/users", orderRouter)




export { app }