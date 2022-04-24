import { object, string } from 'yup'

export const userSchema = object({
  name: string()
    .trim()
    .min(3, 'Name should be 3 characters minimum')
    .max(20, 'Name should be 20 characters maximum'),
  username: string()
    .trim()
    .min(3, 'Username should be 3 characters minimum')
    .max(20, 'Username should be 20 characters maximum'),
  image: string().trim().url('Image should be a valid URL'),
  email: string().email('Please provide a valid email').trim().required('Email is required'),
})

export const tweetSchema = object({
  userId: string().required('userId is required'),
  text: string().trim().max(280, 'Text should be 280 characters maximum'),
})
