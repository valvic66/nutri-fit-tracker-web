'use server';
import { z } from 'zod';
import { registerUserService } from '../services/auth-service';

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: 'Username must be between 3 and 20 characters',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(6).max(100, {
    message: 'Password must be between 6 and 100 characters',
  }),
});

export async function registerUserAction(prevState, formData) {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  console.log('validatedFields', validatedFields);
  console.log('prevState', prevState);

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Missing Fields. Failed to Register.',
      data: 'error',
    };
  }
  console.log(validatedFields.data);
  const responseData = await registerUserService(validatedFields.data);
  console.log('responseData', responseData);
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Register.',
    };
  }

  console.log('#############');
  console.log('User Registered Successfully', responseData.jwt);
  console.log('#############');

  // return {
  //   ...prevState,
  //   zodErrors: null,
  //   data: 'ok',
  // };
}
