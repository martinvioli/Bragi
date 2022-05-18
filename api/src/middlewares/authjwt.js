require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const headerToken = req.get("Authorization");
    console.log("linea 7", headerToken);
    if (!headerToken) {
      return res.status(401).json({ msgE: "Token not found" });
    }

    const token = headerToken.replace("Bearer ", "");
    console.log("linea 13", token);

    try {
      const decoded = jwt.verify(token, process.env.AUTH_SECRET);
      req.userName = decoded.userName;

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};

const verifyAdmin = async (req, res, next) => {
  // const { token } = req.body;
  // try {
  //   if (!token) {
  //     return res.status(401).json({ msgE: "Token not found" });
  //   }
  //   try {
  //     const decoded = jwt.verify(token, process.env.AUTH_SECRET);
  //     console.log(decoded)
  //     if (decoded.TypeUser === "Admin") {
  //       next();
  //     } else {
  //       return res
  //         .status(401)
  //         .json({ msgE: "You do not have administrator permissions" });
  //     }
  //   } catch (error) {
  //     return res.status(401).json({ msgE: "You do not have administrator permissions" });
  //   }
  // } catch (error) {
  //   return res.status(404).send(error);
  // }
  next();
};

module.exports = { verifyToken, verifyAdmin };
