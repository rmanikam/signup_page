export default function validation(values) {
  let errors = {};

  if (!values.name.trim()) {
    errors.name = "Username is required";
  } else if (!(values.name.length >= 8 && values.name.length < 30)) {
    errors.name =
      "The username must be more than 8 and less than 30 characters long";
  } else if (!/^[a-zA-Z0-9_]+$/.test(values.name)) {
    errors.name =
      "The username can only consist of alphabetical, number and underscore";
  }

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
}