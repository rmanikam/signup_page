import { useState } from "react";

function UserForm(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    const new_value = e.target.value;
    setValue(new_value);
  }

  return {
    value,
    onChange: handleChange,
  };
}
export default UserForm;
