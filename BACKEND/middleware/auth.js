const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "herve_transit_super_secret_jwt_key_2026";
const COOKIE_NAME = "token_session";

function verifierAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME] || req.headers.authorization?.replace(/^Bearer\s+/, "");

  if (!token) {
    return res.status(401).json({ success: false, message: "Non authentifié. Veuillez vous connecter." });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Session expirée ou invalide. Redirection vers la connexion." });
  }
}

function verifierAdmin(req, res, next) {
  verifierAuth(req, res, () => {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ success: false, message: "Accès refusé. Privilèges administrateur requis." });
    }
    next();
  });
}

module.exports = {
  verifierAuth,
  verifierAdmin,
  COOKIE_NAME,
  JWT_SECRET
};
