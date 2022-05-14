/* eslint-disable no-useless-escape */

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
    errors.name = "First Name is required";
  } else if (!/^[a-zA-Z\s]{3,25}$/.test(input.name)) {
    errors.name =
      "The First Name must be a valid name with only 3 to 15 letters.";
  }
  if (!input.lastName) {
    errors.lastName = "Last Name is required";
  } else if (!/^[a-zA-Z\s]{3,25}$/.test(input.lastName)) {
    errors.lastName =
      "The Last Name must be a valid name with only 3 to 15 letters.";
  }
  if (!input.email) {
    errors.email = "Email is required";
  } else if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      input.email
    )
  ) {
    errors.email = "Email is invalid";
  }
  if (!input.tel) {
    errors.tel = "Tel is required";
  } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(input.tel)) {
    errors.tel = "Tel is invalid";
  } else if (input.tel.length > 15 || input.tel.length < 5) {
    errors.tel = "Tel is invalid";
  }
  if (input.gender === "default" || !input.gender) {
    errors.gender = "Gender is required";
  }
  if (!input.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,15}$/.test(input.password)
  ) {
    errors.password =
      "Password must be only letters and numbers and must have a length of 8 as minimum and 15 as maximum.";
  }
  if (!input.userName) {
    errors.userName = "Username is required";
  } else if (!/^([A-Za-z]){8,15}$/.test(input.userName)) {
    errors.userName =
      "Username must be only letters and must have a length of 8 as minimum and 15 as maximum.";
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
    errors.repeatPassword = "Passwords don't match";
  }
  if (input.description && input.description.length > 300) {
    errors.description = "Your description is too long.";
  }
  return errors;
}

export function validateEdit(input) {
  const errors = {};
  if (!/^[a-zA-Z\s]{3,25}$/.test(input.name)) {
    errors.name =
      "The First Name must be a valid name with only 3 to 15 letters.";
  }
  if (!/^[a-zA-Z\s]{3,25}$/.test(input.lastName)) {
    errors.lastName =
      "The Last Name must be a valid name with only 3 to 15 letters.";
  }
  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      input.email
    )
  ) {
    errors.email = "Email is invalid";
  }
  if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(input.tel)) {
    errors.tel = "Tel is invalid";
  } else if (input.tel.length > 15 || input.tel.length < 5) {
    errors.tel = "Tel is invalid";
  }
  if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,15}$/.test(input.password)
  ) {
    errors.password =
      "Password must be only letters and numbers and must have a length of 8 as minimum and 15 as maximum.";
  }
  if (!/^([A-Za-z]){8,15}$/.test(input.userName)) {
    errors.userName =
      "Username must be only letters and numbers and must have a length of 8 as minimum and 15 as maximum.";
  }
  if (!underAgeValidate(input.birthday)) {
    errors.birthday =
      "You need to be 18 or older, but you can't be older than 100 years old.";
  }
  if (!input.repeatPassword) {
    errors.repeatPassword = "Password is required";
  } else if (input.repeatPassword !== input.password) {
    errors.repeatPassword = "Passwords don't match";
  }
  if (input.description && input.description.length > 150) {
    errors.description = "Your description is too long.";
  }
  return errors;
}

// /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ GOOGLE EMAIL

// /[a-z0-9]+(.[_a-z0-9]+)@[a-z0-9-]+(.[a-z0-9-]+)(.[a-z]{2,15})/i JONMIRCHA EMAIL
