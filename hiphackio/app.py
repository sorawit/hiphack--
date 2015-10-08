import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Welcome man!\n")

class MainHandler2(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world!\n")

application = tornado.web.Application([
    (r"/api", MainHandler),
    (r"/", MainHandler2),
], debug=True)

if __name__ == "__main__":
    application.listen(8000)
    tornado.ioloop.IOLoop.current().start()
