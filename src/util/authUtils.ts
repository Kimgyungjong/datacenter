//import jwt_decode from "jwt-decode";
import api from "@src/api/api";

interface UserInfo {
  id: string;
  username: string;
}
//인터페이스 임시 비활성화
interface LoginResponse {
  origin_token: string;
  response: UserInfo;
}
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Expose-Headers": "Authorization",
  withCredentials: true,
};
// 로그인 함수
export async function login(
  email: string,
  password: string,
  forceLogin?: boolean
): Promise<void> {
  // api login
  const res = await api.post<LoginResponse>(
    `http://172.168.10.68:8080/api/login`,
    {
      email,
      password,
      forceLogin,
    },
    { headers }
  );
  // 예제 JWT 토큰
  const fake_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  //alchera@alcherainc.com
  //alchera
  localStorage.setItem("token", fake_token);
  localStorage.setItem("userInfo", JSON.stringify(res.data.response));
  return Promise.resolve();
}

// 정보 함수
export function getUserInfo(token: string): UserInfo | null {
  try {
    // 가짜토큰 디코드
    const decodeToken = JSON.parse(atob(token.split(".")[1])) as UserInfo;
    //console.log("fake token", jwt_decode(token));
    return decodeToken;

    /** jwt 토큰 디코딩 */
    // const decodeToken = jwt_decode(token) as UserInfo;
    // return decodeToken;
  } catch (error) {
    console.error("토큰 디코딩 에러", error);
    return null;
  }
}

// 로그아웃 함수
export function logout(): void {
  localStorage.removeItem("token");
}

// 토큰 axios 헤더에 생성
export function setAuthHeader(token: string | null): void {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}
