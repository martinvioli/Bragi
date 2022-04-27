const {Router} = require('express');
const User = require('../modelSystem/User.js')

const router = Router();
const user = new User();

router.post('/', async (req, res) => {
    const {email, userName, password} = req.params;
    const responseLoginUser = await user.loginUser(email, userName, password);
    //Validar si tiene una propiedad msg, de ser asi regresamos status(404) y el msg 
    res.send(responseLoginUser);
})

module.exports = router;