const { Router } = require("express");
const UserClass = require('../modelSystem/User.js');

const user = new UserClass();
const router = Router();

router.post('/', async (req, res) =>{
    const {name, lastName,email, password, gender, tel, description, admin, birthday, profileImage, userName} = req.body;
    let userResponse = await user.createUser(name, lastName,email, password, gender, tel, description, admin, birthday, profileImage, userName)
    return res.send(userResponse);
})

module.exports = router;