import express, { Router } from "express";
import passport from "passport";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  mobileVerification,
  OTPverification
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || POST
router.post("/register", registerController);

//mobile verification ||POST
router.post("/mobile", mobileVerification);
router.post("/otp", OTPverification);


//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get('/user-auth', requireSignIn, (req,res)=>{
  res.status(200).send({ok:true});
});

//protected Admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req,res)=>{
  res.status(200).send({ok:true});
});

//profile update routes
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//Admin all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status complete
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


export default router; 
