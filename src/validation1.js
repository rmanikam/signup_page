export default function validation1(values) {
  let errors = {};

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (!(/^[A-Za-z]\w{7,14}$/.test(values.password))) {
    errors.password = "Password is invalid";
  }
  else if(!(values.password.length >= 8))
  {
    errors.password = "Password length should be 8 characters long";
  }
  return errors;
}