function underAgeValidate(birthday) {
  const reverseBirthday = birthday.split("/").reverse().join("/");

  // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
  var optimizedBirthday = reverseBirthday.replace(/-/g, "/");

  //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
  var myBirthday = new Date(optimizedBirthday);

  // set current day on 01:00:00 hours GMT+0100 (CET)
  var currentDate = new Date().toJSON().slice(0, 10) + " 01:00:00";

  // calculate age comparing current date
  var myAge = ~~((Date.now(currentDate) - myBirthday) / 31557600000);

  if (myAge < 18) {
    return false;
  } else if (myAge > 100) {
    return false;
  } else {
    return true;
  }
}

export default function validate(input) {
  const errors = {};
  if (!input.name) {
    errors.name = "name is required";
  } else if (!/^[a-zA-Z_-]{3,15}$/.test(input.name)) {
    errors.name =
      "The name must be an valid name with only 3 to 15 lowecase letters.";
  }
  if (!input.lastName) {
    errors.lastName = "LastName is required";
  } else if (!/^[a-zA-Z_-]{3,15}$/.test(input.lastName)) {
    errors.lastName =
      "The LastName must be an valid name with only 3 to 15 lowecase letters.";
  }
  if (!input.email) {
    errors.email = "Email is required";
  } else if (
    !/[a-z0-9]+(.[_a-z0-9]+)@[a-z0-9-]+(.[a-z0-9-]+)(.[a-z]{2,15})/i.test(
      input.email
    )
  ) {
    errors.email = "Email is invalid";
  }
  if (!input.tel) {
    errors.tel = "tel is required";
  } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(input.tel)) {
    errors.tel = "tel is invalid";
  } else if (input.tel.length > 9 || input.tel.length < 5) {
    errors.tel = "tel is invalid";
  }
  if (input.gender === "default" || !input.gender) {
    errors.gender = "Gender is required";
  }
  if (!input.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(input.password)
  ) {
    errors.password = "Password is invalid";
  }
  if (!input.userName) {
    errors.userName = "userName is required";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(input.userName)
  ) {
    errors.userName = "userName is invalid";
  }
  if (!input.birthday) {
    errors.birthday = "Birthday is required";
  } else if (!underAgeValidate(input.birthday)) {
    errors.birthday =
      "You need to be 18 or older, but you can't be older than 100 years old.";
  }
  if (!input.repeatPassword) {
    errors.repeatPassword = "Password is required";
  } else if (input.repeatPassword !== input.password) {
    errors.repeatPassword = "Passwords not match";
  }
  return errors;
}
