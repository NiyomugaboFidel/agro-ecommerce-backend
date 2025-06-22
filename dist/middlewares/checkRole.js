"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var checkRole = function checkRole(roles) {
  return function (req, res, next) {
    try {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        return res.status(401).json({
          status: 401,
          message: "You are not a ".concat(roles.join())
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Server error'
      });
    }
  };
};

// export const checkRoleCart = (roles) => (req, res, next) => {
//   try {
//     if (roles.includes(req.user.role)) {
//       next();
//     } else {
//       return res.status(403).json({
//         status: 403,
//         message: `You are not a ${roles.join()}`,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({ status: 500, message: 'Server error' });
//   }
// };
var _default = exports["default"] = checkRole;