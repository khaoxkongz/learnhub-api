import http from "http";
import express, { Request, Response } from "express";

import resp from "./response";
import { IHandlerAuthUser, RouterAuthUser } from "./routes/auth";
import { IHandlerContent, RouterContent } from "./routes/content";
import { IHandlerUser, RouterUser } from "./routes/user";
import { IJWTMiddleware } from "./auth/jwt";

export interface ArgCreateApp {
  auth: IHandlerAuthUser;
  user: IHandlerUser;
  content: IHandlerContent;
  jwt: IJWTMiddleware;
}

export class App {
  protected readonly _server: express.Express;

  constructor(args: ArgCreateApp) {
    // Setup our Express app
    this._server = express();
    this._server.use(express.json());

    this._server.get("/status", (_req: Request, res: Response) => {
      return resp.Ok(res, "ok");
    });

    // Register routers
    this._server.use("/user", new RouterUser(args.user).router());
    this._server.use("/auth", new RouterAuthUser(args.auth, args.jwt).router());
    this._server.use("/content", new RouterContent(args.content, args.jwt).router());
  }

  async listenAndServe(port: number | string): Promise<void> {
    const server = this._server.listen(port, () => {
      console.log(`Express server is listening on ${port}`);
    });

    shutdown(server, "SIGINT");
    shutdown(server, "SIGTERM");
  }
}

export class AppDev extends App {
  constructor(arg: ArgCreateApp) {
    super(arg);
  }

  server(): express.Express {
    return this._server;
  }
}

async function shutdown(server: http.Server, signal: string) {
  // Graceful shutdown for HTTP server
  process.on(signal, () => {
    console.log(`${signal} signal received: closing Express server`);

    server.close(() => {
      console.log(`Express server closed due to ${signal}`);
      return Promise.resolve();
    });
  });
}
