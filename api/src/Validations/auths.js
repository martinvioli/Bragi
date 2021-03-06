const nodemailer = require('nodemailer');
const { User } = require("../db.js");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcrypt');
const logo = '../assets/Ipn3eCY.png'

async function validationRegisterEmailUsername (email, userName) {
    if(userName){
        try {
            let findUserName = await User.findOne({where: {userName: userName}});
            if(findUserName) return {msgE: "This username has already been registered"};
        } catch (error) {
            console.log(error);
        };
    }
    if(email){
        try {
            let findEmail = await User.findOne({where: {email: email}});
            if(findEmail) return {msgE: "This email has already been registered"};
        } catch (error) {
            console.log(error);
        };
    }
    
};

async function validationLoginUser(email, userName, password){
      //User login validation function
      //Validación por email
    if(email){
        try{
            const userFoundDB = await User.findOne({where: {email: email}});
            if(!userFoundDB) return {msgE: "Email user not found"};
            //Si no encuentro el email, corto la función y devuelvo mensaje de error.
            if (!bcrypt.compareSync(password, userFoundDB.dataValues.password)) return {msgE: "Incorrect Password"};
        }catch(error){return {msgE: "Error server", error: "500"}};

      //Validación por userName
    }else if(userName){
        try{
            const userFoundDB = await User.findOne({where: {userName: userName}})
            if(!userFoundDB) return {msgE: "User name not found"}
            //Si no encuentro el email, corto la función y devuelvo mensaje de error.
            if (!bcrypt.compareSync(password, userFoundDB.dataValues.password)) return {msgE: "Incorrect Password"};
        }catch(error){return {msgE: "Error server", error: "500"}}
    }else{
        return {msgE: "Incorrect data"}
    }
};

async function verifactionEmail (name, lastName, userName, email, codeNum){
    try{
        const transporter = nodemailer.createTransport({
            // host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            service: 'Gmail',
            auth: {
            user: 'BragiSystem@gmail.com', // generated ethereal user
            pass: 'clcnvcwtptmsaqnq', // generated ethereal password
            },tls: {
                rejectUnauthorized: false
            }
        });

    transporter.verify().then(() => {
        console.log("Ready for send emails")
    });

    await transporter.sendMail({
        from: '"Bragi" <BragiSystem@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Your account is almost ready", // Subject line
        text: `Hello! \n\n Thank you for wanting to be part of Bragi, we send you this email to confirm that your account was successfully created.\nPlease redirect to the page and enjoy all of our content.\n\nTo access more features, please consider hiring our premium version where you will enjoy:\n- VIP discussion forums\n-Exclusive information about concerts of your favorite artists\n- Unique and variated profile customization for premium users\n- Unique discounts on concert tickets\n- Exclusive advances to the discography of your favorite artists`,
        html: `
        <div style="width: 400px; border: 5px solid cyan; padding: 50px; margin: auto;">
            <header style="border-bottom: 5px solid cyan">
                <img style="width: 100px; height:100px; margin-top: -50px; margin-left: -50px" src='https://i.imgur.com/ZX1OBOr.jpg' alt='img'>
            </header>
            <h2 style="margin-top:px">Hello, ${name} ${lastName}!</h2>
                <br/><br/>
                Thank you for wanting to be part of Bragi, we send you this email to confirm that your account was successfully created.
                <br/>
                Please redirect to the <a>page</a> and enjoy all of our content.
                <br/><br/>
                To access more features, please consider hiring our premium version where you will enjoy:
                <br/>
                - VIP discussion forums
                <br/>
                -Exclusive information about concerts of your favorite artists
                <br/>
                - Unique and variated profile customization for premium users
                <br/>
                - Unique discounts on concert tickets
                <br/>
                - Exclusive advances to the discography of your favorite artists
                <br/><br/>
                
                <h3>Your validation code is:</h3>
                <h2>${codeNum}</h2>
        </div>
        `, // html body
    });}
    catch(e){
        console.log(e)
    }
};

async function recoverEmail (email, codeNum){
    try{
        const transporter = nodemailer.createTransport({
            // host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            service: 'Gmail',
            auth: {
            user: 'BragiSystem@gmail.com', // generated ethereal user
            pass: 'clcnvcwtptmsaqnq', // generated ethereal password
            },tls: {
                rejectUnauthorized: false
            }
        });
        console.log("todo ok")

        transporter.verify().then(() => {
            console.log("Ready for send emails")
        });

        await transporter.sendMail({
            from: '"Bragi" <BragiSystem@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Wanna reset your password!?", // Subject line
            text: `It seems that you have requested this email to reset your password.\n
                If it wasn't you, someone is trying to get into your account, change your password, or if it's secure, ignore this message.\n
                In case you really want to reset your password please copy this number on the page and follow the instructions`,
            html: `
            <div style="width: 400px; border: 5px solid #dd9202; padding: 50px; margin: auto;">
                <header style="border-bottom: 5px solid #dd9202">
                <img style="width: 100px; height:100px; margin-top: -50px; margin-left: -50px" src='https://i.imgur.com/RGUGMYI.png' alt='img'>
                </header>
                <h2 style="margin-top:px">Hello!</h2>
                <br/><br/>
                It seems that you have requested this email to reset your password.
                <br/>
                If it wasn't you, someone is trying to get into your account, change your password, or if it's secure, ignore this message.
                <br/>
                In case you really want to reset your password please copy this number on the page and follow the instructions
                <br/><br/>
                <h3>Your reset code is:</h3>
                <h2>${codeNum}</h2>
            </div>
            `, // html body
        });
    } catch(e){
        console.log(e)
    }
};

validateEmailReset = async(req,res) => {
    const {email} = req.body
    try{
        const userFound = await User.findOne({where: {email}});
        if(!userFound){return {msgE: "User not found"}};
        if(userFound){
            return res.status(200).json({msg: "Account validated"});
        }else{
            return res.status(404).json({msgE: "Invalid email"});
        }
    }catch(error){
        return res.status(404);
    }
}

async function userBanned (name, lastName, email, causeBan){
    try{const transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        service: 'Gmail',
        auth: {
          user: 'BragiSystem@gmail.com', // generated ethereal user
          pass: 'clcnvcwtptmsaqnq', // generated ethereal password
        },tls: {
            rejectUnauthorized: false
        }
    });

    transporter.verify().then(() => {
        console.log("Ready for send emails")
    });

    await transporter.sendMail({
        from: '"Bragi" <BragiSystem@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "your account 'BRAGI' was banned", // Subject line
        text: `Hello! \n\n We're sorry to send you an email to notify you that your account was "BANNED" by the "BRAGI" team for not meeting community standards. \n The cause of the ban is ${causeBan}. \nPlease contact the "BRAGI" administrative team to recover your account. \n\n BRAGI administrators email: \n\n BragiSystem@gmail.com`,
        html: `
        <div style="width: 400px; border: 5px solid cyan; padding: 50px; margin: auto;">
            <header style="border-bottom: 5px solid cyan">
                <img style="width: 100px; height:100px; margin-top: -50px; margin-left: -50px" src='https://i.imgur.com/ZX1OBOr.jpg' alt='img'>
            </header>
            <h2 style="margin-top:px">Hello, ${name} ${lastName}!</h2>
                <br/><br/>
                We're sorry to send you an email to notify you that your account was "<b>BANNED</b>" by the "BRAGI" team for not meeting community standards. The cause of the ban is "<b>${causeBan}</b>".
                <br/>
                Please contact the "BRAGI" administrative team to recover your account. \n\n BRAGI administrators email:
                <br/><br/>
                BragiSystem@gmail.com
                <br/>
                <br/>
                <br/>
                
                <h4>Bragi administrative team</h4>
        </div>
        `, // html body
    });}
    catch(e){
        console.log(e)
    }
};

async function userUnbanned (name, lastName, email){
    try{const transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        service: 'Gmail',
        auth: {
          user: 'BragiSystem@gmail.com', // generated ethereal user
          pass: 'clcnvcwtptmsaqnq', // generated ethereal password
        },tls: {
            rejectUnauthorized: false
        }
    });

    transporter.verify().then(() => {
        console.log("Ready for send emails")
    });

    await transporter.sendMail({
        from: '"Bragi" <BragiSystem@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "your account 'BRAGI' was unbanned", // Subject line
        text: `Hello! \n\n We have sent you an email to notify you that the team "BRAGI" is ACTIVE. \n We ask you to respect the community in the future so as not to repeat this episode. \n Welcome and thank you for being part of the "Bragi" community again.`,
        html: `
        <div style="width: 400px; border: 5px solid cyan; padding: 50px; margin: auto;">
            <header style="border-bottom: 5px solid cyan">
                <img style="width: 100px; height:100px; margin-top: -50px; margin-left: -50px" src='https://i.imgur.com/ZX1OBOr.jpg' alt='img'>
            </header>
            <h2 style="margin-top:px">Hello, ${name} ${lastName}!</h2>
                <br/><br/>
                We have sent you an email to notify you that the team "BRAGI" is "<b>ACTIVE</b>".
                <br/>
                We ask you to respect the community in the future so as not to repeat this episode.
                <br/><br/>
                Welcome and thank you for being part of the "Bragi" community again.
                <br/>
                <br/>
                <br/>
                
                <h4>Bragi administrative team</h4>
        </div>
        `, // html body
    });}
    catch(e){
        console.log(e)
    }
};

async function toArtist (userName, email, reason){
    try{const transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        service: 'Gmail',
        auth: {
          user: 'bragiadmtoartist@gmail.com', // generated ethereal user
          pass: 'yyhuaqsauczocjym', // generated ethereal password
        },tls: {
            rejectUnauthorized: false
        }
    });

    transporter.verify().then(() => {
        console.log("Ready for send emails")
    });

    await transporter.sendMail({
        from: '"Bragi to Artist" <bragiadmtoartist@gmail.com>', // sender address
        to: "BragiSystem@gmail.com", // list of receivers
        subject: "To Artist", // Subject line
        text: `${reason}`,
        html: `
        <div style="width: 400px; border: 5px solid cyan; padding: 50px; margin: auto;">
            <header style="border-bottom: 5px solid cyan">
                <img style="width: 100px; height:100px; margin-top: -50px; margin-left: -50px" src='https://i.imgur.com/ZX1OBOr.jpg' alt='img'>
            </header>
            <h1 style="margin-top:px">To Artist</h1>
            <br/><br/>
            <h2 style="margin-top:px">The user ${userName} wants to be an artist.</h2>
            <br/>
            <h2 style="margin-top:px">Email: ${email}</h2>
            <br/>
            <p style="margin-top:px">Motivation: ${reason}</p>
            <h4>Bragi administrative to artist team</h4>
        </div>
        `, // html body
    });}
    catch(e){
        console.log(e)
        return res.status(501).json({msgE: "nodemailer error for artist"})
    }
};

validateCodeReset = async(req,res) => {
    const {email, code} = req.body;
    try {
        const userFound = await User.findOne({where: {email}});
        console.log(userFound)
        if(!userFound){return {msgE: "User not found"}};
        if(userFound){
            // console.log(code)
            // console.log(userFound.dataValues)
            if(code == userFound.dataValues.validationCode){return res.status(200).json({ msg:"correct code", userFound})}
            return res.status(404).json({msgE: "Invalid code"});
        }else{
            return res.status(404).json({msgE: "Invalid email"});
        }
    } catch (error) {
        console.log(error)
    }
}

validateUserCode = async (req,res) => {
    //Decodificar token y buscar el id del usuario.
    const {code, token} = req.body;
    const tokenDecode = jwt.decode(token, authConfig.secret);
    try{
        const userFound = await User.findOne({where: {userName: tokenDecode.userName}});
        if(!userFound){return {msgE: "User not found"}};
        if(userFound.dataValues.nameStateUser === 'Active') res.status(400).json({msgE: 'User is already active'});
        if(userFound.dataValues.validationCode === parseInt(code)){
            await User.update({nameStateUser: 'Active'}, {where: {userName: tokenDecode.userName}})
            return res.status(200).json({msg: "Account activated"});
        }else{
            return res.status(404).json({msgE: "Invalid code"});
        }
    }catch(error){
        return res.status(404);
    }
};

comparePasswords = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (bcrypt.compareSync(password, user.password)) {
            console.log('Sí pasé por aquí')
            return res.status(200).json({msg: "Correct Password"})
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {validationLoginUser, toArtist, userBanned ,userUnbanned , validationRegisterEmailUsername, verifactionEmail, validateUserCode, comparePasswords, recoverEmail, validateCodeReset, validateEmailReset}
