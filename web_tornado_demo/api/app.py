import tornado.web
import signal
import time
def app(_route):
    application = tornado.web.Application(_route)

    signal.signal(signal.SIGQUIT, signal_stop)
    signal.signal(signal.SIGTERM, signal_stop)
    signal.signal(signal.SIGINT, signal_stop)

    global server
    server = tornado.httpserver.HTTPServer(application)
    return server


def signal_stop(_signal, _frame):
    tornado.ioloop.IOLoop.instance().add_callback(stop)


def stop():
    server.stop()
    io_loop = tornado.ioloop.IOLoop.instance()
    deadline = time.time() + 3

    def stop_loop():
        now = time.time()
        if now < deadline:  # and (io_loop._callbacks or io_loop._timeouts):
            io_loop.add_timeout(now + 1, stop_loop)
        else:
            io_loop.stop()

    stop_loop()
