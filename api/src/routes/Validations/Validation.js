const nodemailer = require('nodemailer');
const { transporter } = require ('../modelSystem/mailer');
const { User } = require("../../db.js");

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
            const userFoundDB = await User.findOne({where: {email: email}})
            if(!userFoundDB) return {msgE: "Email user not found"}
            //Si no encuentro el email, corto la función y devuelvo mensaje de error.
            const passwordValidate = this.passwordHash(password).toString();
            //El resultado de passwordHash me trae un numero por lo cúal es necesario parsearlo.
            if(passwordValidate !== userFoundDB.dataValues.password) return {msgE: "Incorrect password"}
            console.log("Contraseña Correcta")
        }catch(error){console.log(error)}

      //Validación por userName
    }else if(userName){
        try{
            const userFoundDB = await User.findOne({where: {userName: userName}})
            if(!userFoundDB) return {msgE: "User name not found"}
            //Si no encuentro el email, corto la función y devuelvo mensaje de error.
            const passwordValidate = this.passwordHash(password).toString();
            //El resultado de passwordHash me trae un numero por lo cúal es necesario parsearlo.
            if(passwordValidate !== userFoundDB.dataValues.password) return {msgE: "Incorrect password"}
            return true
        }catch(error){console.log(error)}

    }else{
        return {msgE: "Incorrect data"}
    }
};

async function verifactionEmail (name, lastName, userName, email, codeNum){
    const transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        service: 'Gmail',
        auth: {
          user: 'BragiSystem@gmail.com', // generated ethereal user
          pass: 'arieopjcxrsipqvz', // generated ethereal password
        },
    });

    transporter.verify().then(() => {
        console.log("Ready for send emails")
    });

    await transporter.sendMail({
        from: '"Bragi" <BragiSystem@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Your account is almost ready", // Subject line
        text: `Hello! \n\n Thank you for wanting to be part of Bragi, we send you this email to confirm that your account was successfully created.\nPlease redirect to the page and enjoy all of our content.\n\nTo access more features, please consider hiring our premium version where you will enjoy:\n- VIP discussion forums\n-Exclusive information about concerts of your favorite artists\n- Unique and variated profile customization for premium users\n- Unique discounts on concert tickets\n- Exclusive advances to the discography of your favorite artists`,
        html: `<h1>Hello, ${name} ${lastName}!</h1>
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
        
        <h3>Your validation code is:</h3>
        <h2>${codeNum}</h2>
        `, // html body
    });
};

module.exports = {validationLoginUser, validationRegisterEmailUsername, verifactionEmail}
