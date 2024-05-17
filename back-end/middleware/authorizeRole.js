// Middleware for authorization
function authorizeRole(role) {
  return function (req, res, next) {
    if (req.user.role !== role) {
      return res.status(403).json({
        message: `This user lacks sufficient permissions to access this protected route. Their role is: ${req.user.role}`,
      }); // user's role is not authorized
    }
    next(); // role is authorized, pass control to the next middleware
  };
}
module.exports = authorizeRole;
