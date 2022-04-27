const { Router } = require("express");
const UserClass = require('../modelSystem/User.js');

const user = new UserClass();
const router = Router();

const passwordHash = function(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1>>>0);
    };

router.post('/', async (req, res) =>{
    
    let {name, lastName,email, password, gender, tel, description, admin, birthday, profileImage, userName} = req.body;
    password = passwordHash(password)
    let userResponse = await user.createUser(name, lastName,email, password, gender, tel, description, admin, birthday, profileImage, userName)

    res.send(userResponse) ;
})

router.get('/validate', (req, res) =>{
    const {email, userName} = req.query;
    let userValidateEmailUserName = user.validation(email, userName);
    return res.send(userValidateEmailUserName);
})

module.exports = router;