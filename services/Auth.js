/**this is for the sessionId which will be send to the user during the login */
const jwt = require('jsonwebtoken');
const secret = "Rajsingh@1307";
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role : user.role,
    },
    secret
  );
}

function getUser(token) {
    if(!token) return null;
    return jwt.verify(token, secret);
}

module.exports = {
  setUser,
  getUser,
};
