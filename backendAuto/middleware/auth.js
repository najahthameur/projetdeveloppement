const jwt = require("jsonwebtoken");

const SECRET_KEY = "my_secret_key";

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = header.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalide" });
    }

    req.user = decoded; // 👈 id + role
    next();
  });
}

module.exports = auth;