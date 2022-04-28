export function validate(input) {
  const errors = {};
  if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,15}$/.test(input.userName)
  ) {
    errors.userName = "This username doesn't exist in out registers";
  }
  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      input.email
    )
  ) {
    errors.email = "This Email doesn't exist in out registers";
  }
  if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,15}$/.test(input.password)
  ) {
    errors.password = "This Password doesn't exist in out registers";
  }

  return errors;
}
