import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  sign } from 'hono/jwt'
import { authMiddleware } from '../middlewares/auth'

export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  },
  Variables:{
    userId:string
  }
}>()





userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body =await c.req.json();
  try {
    const user=await prisma.user.create({
      data:{
        name:body.name,
        email:body.email,
        password:body.password
      }
    })
  
    const token=await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({
      token
    })
  
  } catch (error) {
    c.status(403)
    return c.json({
      messge:"You have entered something wrong"
    })
  }
  
  })
  
  userRouter.post('/signin', async(c) => {
    const prisma=new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body=await c.req.json();
    try {
      const user=await prisma.user.findUnique({
        where:{
          email:body.email,
          password:body.password
        }
      })
  
      if(!user){
        c.status(403);
        return c.json({
          message:"No such user exists"
        })
      }else{
        const token=await sign({id:user.id},c.env.JWT_SECRET)
        return c.json({token});
      }
    } catch (error) {
      c.status(403)
      return c.json({
        Message:"some problem exists"
      })
    }
  })

  userRouter.get("/:userId",authMiddleware,async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const user_Id=c.req.param('userId')

    try {
        const user=await prisma.user.findUnique({
            where:{
                id:user_Id
            },
            select:{
                name:true,
                posts:true
            }
        })

        return c.json({user})
    } catch (error) {
        c.status(500)
        return c.text("something went wrong")
    }
  })


  userRouter.get('/myprofile',authMiddleware,async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const user_Id=c.get('userId');

    try {
        const user=await prisma.user.findUnique({
            where:{
                id:user_Id
            },
            select:{
                name:true,
                email:true,
                posts:true
            }
        })
    } catch (error) {
        c.status(500);
        return c.text("something went wrong")
    }
  })
