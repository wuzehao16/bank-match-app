const Koa = require('koa')
const next = require('next')
const IO = require('koa-socket')
const Router = require('koa-router')
const gzip =  require('./middleware/gzip')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
// const fetchCommission = require('./lib/fetch')
app.prepare()
.then(() => {
  const server = new Koa()
  const router = new Router()
  const io = new IO({
      ioOptions: {
          pingTimeout: 10000,
          pingInterval: 5000,
      },
  });
  io.attach(server);
  router.get('/commission', async ctx => {
    await app.render(ctx.req, ctx.res, '/commission', ctx.query)
    ctx.respond = false
  })

  router.get('/b', async ctx => {
    await app.render(ctx.req, ctx.res, '/a', ctx.query)
    ctx.respond = false
  })

  router.get('/financial', async ctx => {
    await app.render(ctx.req, ctx.res, '/financial', ctx.query)
    ctx.respond = false
  })
  router.get('/service-worker.js', async ctx => {
    // res.setHeader('Service-Worker-Allowed', '/')
    app.serveStatic(req, res, join(root, `.${req.url}`))
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
  server.use(gzip({ threshold: 1024 }))
  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.io.on('connection', async (ctx) => {
      console.log(`  <<<< connection ${ctx.socket.id} ${ctx.socket.request.connection.remoteAddress}`);
      ctx.socket.on('sendmsg', data => {
        console.log(data)
        ctx.socket.emit('message',data)
        // server.io.emit('message',data)
      })
      await Socket.create({
          id: ctx.socket.id,
          ip: ctx.socket.request.connection.remoteAddress,
      });
  });
  server.io.on('disconnect', async (ctx) => {
      console.log(`  >>>> disconnect ${ctx.socket.id}`);
      await Socket.remove({
          id: ctx.socket.id,
      });
  });
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
