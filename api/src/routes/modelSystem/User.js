const { User } = require("../../db.js");

class UserClass {
  constructor(){}
  async getDataUser(idUser) {
    let userFind = await User.findByPk(idUser);
    return !userFind
      ? { msg: "User not Found" }
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
  
}

UserClass.prototype.createUser = async (name, lastName ,email, password, gender, tel, description, admin, birthday, profileImage, userName) => {
  if(!userName) return {msg: "Invalido"}
  const user = await User.create(
    {Name: name,
      LastName: lastName ,
      Email: email, 
      Password: password, 
      Gender: gender,
      Telephone: tel,
      Description: description,
      IsAdmin: admin, 
      ProfileImage: profileImage,
      UserName: userName}
      )
  return user;
}

module.exports = UserClass;