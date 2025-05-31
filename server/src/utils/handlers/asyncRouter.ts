import { Router, RequestHandler, Request, Response, NextFunction } from 'express';

export function asyncRouter(): Router {
  const router = Router();

  type RouterMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

  const methods: RouterMethod[] = ['get', 'post', 'put', 'delete', 'patch'];

  methods.forEach((method) => {
    const original = router[method].bind(router);
    
    // Correct type assertion for the router method
    (router[method] as any) = (path: string, ...handlers: RequestHandler[]) => {
      return original(
        path,
        ...handlers.map(handler => {
          return async (req: Request, res: Response, next: NextFunction) => {
            try {
              await handler(req, res, next);
            } catch (err) {
              next(err);
            }
          };
        })
      );
    };
  });

  return router;
}