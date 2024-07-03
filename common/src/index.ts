import {z} from "zod"

export const signupInputSchema=z.object({
    name:z.string().optional(),
    email:z.string().email(),
    password:z.string()
})

export type signUpInputTypes=z.infer<typeof signupInputSchema>

export const signInInputSchema=z.object({
    email:z.string().email(),
    password:z.string()
})

export type signInInputTypes=z.infer<typeof signInInputSchema>

export const blogPostSchema=z.object({
    title:z.string(),
    content:z.string()
})

export type blogPostType=z.infer<typeof blogPostSchema>

export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});

export type UpdatePostType = z.infer<typeof updatePostInput>;

