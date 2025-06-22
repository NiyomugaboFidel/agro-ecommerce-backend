import express from "express";
import user from './api/user.routes';
import category from "./api/category.routes"
import product from "./api/product.routes"
import cart from "./api/cart.routes"
import wishlist from "./api/wishlist.routes"
import order from "./api/order.routes"
import stats from "./api/statistics.routes"


const routes=express.Router();
routes.use('/users',user);
routes.use('/categories',category);
routes.use('/products',product);
routes.use('/carts',cart);
routes.use('/product-wishes',wishlist);
routes.use('/orders',order);
routes.use('/statistics',stats);

export default routes;

