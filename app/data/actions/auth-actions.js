'use server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  registerUserService,
  signinUserService,
} from '../services/auth-service';

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: 'https://nutri-fit-tracker-web.vercel.app',
  httpOnly: true,
  secure: true,
};

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

const schemaSignin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: 'Identifier must have at least 3 or more characters',
    })
    .max(20, {
      message: 'Please enter a valid username or email address',
    }),
  password: z
    .string()
    .min(6, {
      message: 'Password must have at least 6 or more characters',
    })
    .max(100, {
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
      strapiErrors: responseData.error,
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

  cookies().set('jwt', responseData.jwt, config);
  redirect('/dashboard');
}

export async function signinUserAction(prevState, formData) {
  const validatedFields = schemaSignin.safeParse({
    identifier: formData.get('email'),
    password: formData.get('password'),
  });

  console.log('validatedFields', validatedFields);
  console.log('prevState', prevState);

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Missing Fields. Failed to Login.',
      data: 'error',
    };
  }
  console.log(validatedFields.data);

  const responseData = await signinUserService(validatedFields.data);
  console.log('responseData', responseData);
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Signin.',
    };
  }

  console.log('#############');
  console.log('User Signed In Successfully', responseData.jwt);
  console.log('#############');

  cookies().set('jwt', responseData.jwt, config);

  redirect('/dashboard');
}

export async function logoutAction() {
  cookies().set('jwt', '', { ...config, maxAge: 0 });

  redirect('/auth/signin');
}
