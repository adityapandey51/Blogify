import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
}>();

blogRouter.post('/',async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
      }).$extends(withAccelerate())
    
      const userId = c.get('userId');
      const body = await c.req.json();
      try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });
        return c.json({
            id: post.id
        });
      } catch (error) {
        c.status(500)
        return c.text("some error")
      }
})

blogRouter.put("/", async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
      }).$extends(withAccelerate())
    
      const userId = c.get('userId');
      const body = await c.req.json();

      try {
        const post = await prisma.post.update({
            where:{
                id:body.id,
                authorId:userId
            },
            data: {
                title: body.title,
                content: body.content,
            }
        });
        return c.text("Post Updated");
      } catch (error) {
        c.status(500)
        return c.text("some error")
      }
})

blogRouter.get("/:id" ,async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
      }).$extends(withAccelerate())
    
      
      try {
        const post = await prisma.post.findUnique({
            where:{
                id:c.req.param('id'),
            }      
        });
        return c.json({post});
      } catch (error) {
        c.status(500)
        return c.text("some error")
      }
})

blogRouter.get('/',async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const posts=await prisma.post.findMany()

        return c.json({posts});
    } catch (error) {
        c.status(500)
        return c.text("Something wrong with the server")
    }
})

