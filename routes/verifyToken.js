const jwt = require('jsonwebtoken');

// middleware function for verify logged in user
module.exports = function(request, response, next) {
  const token = request.header('token');

  if(!token) {
    return response.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    request.user = verified;
    next();
  } catch(error) {
    return response.status(400).json({ message: 'Invalid Token' }); 
  }
}