import { object, string } from 'yup'

export const userSchema = object({
  name: string()
    .trim()
    .min(3, 'Name should be 3 characters minimum')
    .max(15, 'Name should be 15 characters maximum'),
  username: string()
    .trim()
    .min(3, 'Username should be 3 characters minimum')
    .max(15, 'Username should be 15 characters maximum'),
  image: string().trim().url('Image should be a valid URL'),
  email: string().email('Please provide a valid email').trim().required('Email is required'),
})
