'use server';
import { z } from 'zod';

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

  return {
    ...prevState,
    zodErrors: null,
    data: 'ok',
  };
}
