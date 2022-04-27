const { User } = require("../../db.js");
const nodemailer = require('nodemailer')
const { transporter } = require ('./mailer.js')

class UserClass {
  constructor(){}

  async getDataUser(idUser) {
    let userFind = await User.findByPk(idUser);
    return !userFind
      ? { msgE: "User not Found" }
      : {
          name: userFind.name,
          email: userFind.email,
          password: userFind.password,
          gender: userFind.gender,
          tel: userFind.tel,
          description: userFind.description,
          admin: userFind.admin,
          bithday: userFind.Bithday,
          profileImage: userFind.profileImage,
          userName: userFind.userName,
          lastName: userFind.lastName
        };
  }

  async verifactionEmail (name, lastName, userName, email){
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
      subject: "Your account has been created successfully", // Subject line
      text: "Hello! \n\n Thank you for wanting to be part of Bragi, we send you this email to confirm that your account was successfully created.\nPlease redirect to the page and enjoy all of our content.\n\nTo access more features, please consider hiring our premium version where you will enjoy:\n- VIP discussion forums\n-Exclusive information about concerts of your favorite artists\n- Unique and variated profile customization for premium users\n- Unique discounts on concert tickets\n- Exclusive advances to the discography of your favorite artists",
      html: "<h1>Hello!</h1> <br/><br/> Thank you for wanting to be part of Bragi, we send you this email to confirm that your account was successfully created.<br/>Please redirect to the <a>page</a> and enjoy all of our content.<br/><br/>To access more features, please consider hiring our premium version where you will enjoy:<br/>- VIP discussion forums<br/>-Exclusive information about concerts of your favorite artists<br/>- Unique and variated profile customization for premium users<br/>- Unique discounts on concert tickets<br/>- Exclusive advances to the discography of your favorite artists", // html body
    });

  }

  async validation (email, userName) {
    try {
      let findUserName = await User.findOne({where: {userName: userName}})
      if(findUserName) return {msgE: "This username has already been registered"}
    } catch (error) {
      console.log(error)
    }

    try {
      let findEmail = await User.findOne({where: {email: email}})
      if(findEmail) return {msgE: "This email has already been registered"}
    } catch (error) {
      console.log(error)
    }
  }

  async createUser (name, lastName ,email, password, gender, telephone, description, admin, birthday, profileImage, userName){
    const valid = await this.validation(email, userName);
    // this.verifactionEmail(email)
    
    const nameMinus = name.charAt(0).toLowerCase() + name.slice(1);
    const lastNameMinus = lastName.charAt(0).toLowerCase() + lastName.slice(1);

    if(valid) return valid;
    await this.verifactionEmail(name, lastName, userName, email)

    try {
        const user = await User.create(
        {
          name: nameMinus,
          lastName: lastNameMinus ,
          email,
          password,
          gender,
          telephone,
          birthday,
          description,
          admin,
          profileImage,
          userName
        });
      return {msg: 'User created successfully'}
    } catch (error) {
      return {msgE: 'Error creating a new user'}
    };

  };
};

// async function validation (email, userName) {
//   let findEmail = await User.findOne({where: {email: email}})
//   let findUserName = await User.findOne({where: {userName: userName}})
//   console.log(findEmail)
//   console.log(findUserName)
//   if(findEmail) {
//     return {msg: "This email has already been registered"}
//   }
//   if(findUserName) {
//     return {msg: "This username has already been registered"}
//   }
// }

module.exports = UserClass;