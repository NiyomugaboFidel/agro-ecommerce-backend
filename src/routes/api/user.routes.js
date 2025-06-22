import { Router } from "express";
import { createUser, editUserProfile, fillEmail, getUserById, getUserInfo, loginUser, requestManager, ResetPassword, updatePassword } from "../../controllers/auth.controller";
import extractToken from "../../middlewares/checkUserWithToken";
import upload from "../../config/multer";
import { getUsers, updateUserActive, updateUserRole } from "../../controllers/admin.controller";
import { googleAuthentication, googleCallBack } from "../../controllers/googleCallBack";
import passport from "passport";


const router = Router();
router.get("/",extractToken,getUsers)
router.post("/signup", createUser);
router.post('/login',loginUser)
router.get("/auth", (req, res) => {
    res.send('<a href="/api/v1/users/auth/google">authenticate with google</a>');
  });
  router.get("/auth/google", googleAuthentication);
  
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      session: false,
      failureRedirect: "/login",
    }),
    googleCallBack
  );
router.get("/me",extractToken,getUserInfo)
router.post("/reset-password", fillEmail);
router.patch("/reset-password/:token", ResetPassword);
router.patch('/update-password',extractToken,updatePassword)
router.put('/update-profile',extractToken,upload.single("profilePic"),editUserProfile)
router.post('/request-role',extractToken,requestManager)
router.patch('/update-role/:_id',extractToken,updateUserRole)
router.get("/:_id",getUserById)
router.patch("/update-status/:_id",extractToken,updateUserActive)
export default router
