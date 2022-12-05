import { boolean, object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    lastName: string({
      required_error: 'Lastname is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
