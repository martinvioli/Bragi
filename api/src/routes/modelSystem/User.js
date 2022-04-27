const { User } = require("../../db.js");

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

    if(valid) return valid;

    try {
        const user = await User.create(
        {
          name,
          lastName ,
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