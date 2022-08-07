const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  /* jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    req.email = decoded.email;
    req.userId = decoded.id;
    next();
  });  */
  // validacao de token sem precisar importar o model na authenticação.
  // site =====> https://www.bezkoder.com/node-js-jwt-authentication-mysql/
  try {
    const decoded = jwt.verify(token, secret);
    req.email = decoded.data.email;
    req.userId = decoded.data.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};