// import jwt_decode from "jwt-decode";
import api from "@src/api/api";
interface UserInfo {
  id: string;
  username: string;
}
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
  try {
    // api login
    const res = await api.post<LoginResponse>(
      `/api/login`,
      {
        email,
        password,
        forceLogin,
      },
      { headers }
    );
    if (res.status === 200) {
      const accessToken = res.headers["authorization"]; // 응답헤더에서 토큰 받기
      const refreshToken = res.headers["refresh"]; // 응답헤더에서 토큰 받기
      console.log("access 토큰 :", accessToken);
      console.log("refresh 토큰 :", refreshToken);
      api.defaults.headers.common["Authorization"] = `${accessToken}`;

      localStorage.setItem("access_token", accessToken); // 토큰 localStorage에 저장
      localStorage.setItem("userInfo", JSON.stringify(res.data.response));
      console.log(api.defaults.headers);
      // 예제 JWT 토큰
      //const fake_token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      //alchera@alcherainc.com
      //alchera
    }
  } catch (err) {
    console.error(err);
  }
  return Promise.resolve();
}

// 정보 함수
export function getUserInfo(token: string): UserInfo | null | string {
  try {
    // 가짜토큰 디코드
    //const decodeToken = JSON.parse(atob(token.split(".")[1])) as UserInfo;
    //console.log("fake token", jwt_decode(token));
    const decodeToken = token;

    return decodeToken;

    /** jwt 토큰 디코딩 */
    // const decodeToken = jwt_decode(token) as UserInfo;
    // return decodeToken;
  } catch (error) {
    return null;
  }
}
// 로그인 함수
export async function logout(id: number): Promise<void> {
  try {
    // api login
    const res = await api.post<LoginResponse>(`/api/logout/${id}`);
    if (res.status === 200) {
      localStorage.clear();
      console.log("logout");
    }
  } catch (err) {
    localStorage.clear();
    console.error(err);
  }
  return Promise.resolve();
}
// 토큰 axios 헤더에 생성
export function setAuthHeader(token: string | null): void {
  if (token) {
    api.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}
