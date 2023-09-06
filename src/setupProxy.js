import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://http://172.168.10.68:8080",
      changeOrigin: true
    })
  );
}
