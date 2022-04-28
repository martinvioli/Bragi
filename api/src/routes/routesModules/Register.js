const { Router } = require("express");
const UserClass = require('../modelSystem/User.js');
const validation = require('../Validations/Validation')

const user = new UserClass();
const router = Router();



router.post('/', async (req, res) =>{
    let {name, lastName,email, password, gender, tel, description, admin, birthday, profileImage, userName} = req.body;
    let userResponse = await user.createUser(name, lastName,email, password, gender, tel, description, admin, birthday, profileImage, userName)
    res.send(userResponse) ;
})

router.get('/validate', async (req, res) => {
    const {email, userName} = req.query;
    const userValidateEmailUserName = await validation.validationRegisterEmailUsername(email, userName);
    return res.send(userValidateEmailUserName);
})

module.exports = router;