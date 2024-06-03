'use server';

export async function registerUserAction(prevState, formData) {
  console.log('Hello From Register User Action');

  const fields = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  console.log('#############');
  console.log(fields);
  console.log('#############');

  return {
    ...prevState,
    data: fields,
  };
}
