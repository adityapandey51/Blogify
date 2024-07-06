import {verify} from "hono/jwt"

export const authMiddleware=async (c:any, next:()=>any) => {
	console.log("1")
	const jwt = c.req.header('Authorization') || "";
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	console.log(token)
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	console.log(payload.id)
  //@ts-ignore
  c.set('userId',payload.id)
  console.log("calling next")
  console.log(c.get('userId'))
	await next()
}