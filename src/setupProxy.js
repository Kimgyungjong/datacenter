import { createProxyMiddleware } from "http-proxy-middleware";

const testUrl = "http://172.168.10.68:8080";
export default function (app) {
  app.use(
    "/api", // 불러오려는 server 의 api path
    createProxyMiddleware({
      target: testUrl, // server 주소를 넣어주면 된다.
      changeOrigin: true,
    })
  );
}
