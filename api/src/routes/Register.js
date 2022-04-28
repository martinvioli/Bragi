const { Router } = require("express");
const UserClass = require('../Controllers/User.js');
const validationEmailUserName = require('../Validations/auths.js')

const user = new UserClass();
const router = Router();

router.post('/', user.createUser)

router.get('/validate', async (req, res) => {
    const {email, userName} = req.query;
    const userValidateEmailUserName = await validationEmailUserName.validationRegisterEmailUsername(email, userName);
    return res.send(userValidateEmailUserName);
})

module.exports = router;