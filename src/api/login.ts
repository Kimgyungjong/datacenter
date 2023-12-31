import api from "./api";

export interface LoginResponse {
  origin_token: string;
  response: object;
  msg: string;
  code: string;
}
interface UserInfo {
  id: number;
  email: string;
  role: string;
  status: string;
  language: string;
  name: string;
}
export async function login(
  email: string,
  password: string,
  forceLogin?: boolean
): Promise<LoginResponse | string | null> {
  try {
    // api login
    const res = await api.post<LoginResponse>(`/api/login`, {
      email,
      password,
      forceLogin,
    });
    if (res.status === 200) {
      const accessToken = res.headers["authorization"];
      const refreshToken = res.headers["refresh"];
      console.log("access token:", accessToken);
      console.log("refresh token:", refreshToken);
      api.defaults.headers.common["Authorization"] = `${accessToken}`;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("userInfo", JSON.stringify(res.data.response));

      return res.data.code;
    } else if (res.data.code === "TK0001") {
      return res.data.code;
    } else {
      return res.data.code;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

// 토큰 axios 헤더에 생성
export function setAuthHeader(token: string | null): void {
  if (token) {
    api.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}
export async function logout(id: number): Promise<void> {
  try {
    // api login
    const res = await api.post<LoginResponse>(`/api/logout/${id}`);
    if (res.status === 200) {
      console.log("logout");
      localStorage.clear();
    }
  } catch (err) {
    console.error(err);
    localStorage.clear();
  }
  return Promise.resolve();
}
// 정보 함수
export function getUserInfo(token: string): UserInfo | null | string {
  try {
    /** jwt 토큰 디코딩 */
    // const decodeToken = jwt_decode(token) as UserInfo;
    // return decodeToken;
    return token;
  } catch (error) {
    return null;
  }
}
