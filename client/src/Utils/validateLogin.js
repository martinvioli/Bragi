export function validate(input) {
  const errors = {};
  if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,15}$/.test(input.userName)
  ) {
    errors.userName = "This field must be filled correctly in order to log in.";
  }
  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      input.email
    )
  ) {
    errors.email = "This field must be filled correctly in order to log in.";
  }
  if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,15}$/.test(input.password)
  ) {
    errors.password = "This field must be filled correctly in order to log in.";
  }

  return errors;
}
