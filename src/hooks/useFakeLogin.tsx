import { useState, useEffect } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useNavigate, useLocation } from "react-router-dom"; // react-router-dom의 useLocation 훅
type Login = {
  id: string;
  pw: string;
};
const useFakeLogin = () => {
  const [mock] = useState(new MockAdapter(axios));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const navigate = useNavigate();
  mock.onPost("/api/pass").reply(200, {
    username: "test",
    token: "fakeToken123",
  });

  const location = useLocation(); // react-router-dom의 useLocation 훅

  const login = async ({ id, pw }: Login) => {
    try {
      // const response = await axios.post("/api/pass", {
      //   username: id,
      //   password: pw,
      // });
      // const token = response.data.token;
      // setIsLoggedIn(true);
      // localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("token", "");
    navigate("/login");
  };

  useEffect(() => {
    // 라우팅 변경 시 로그인 상태 업데이트
  }, [location]);

  const getIsLoggedIn = () => isLoggedIn;

  return { login, logout, getIsLoggedIn };
};

export default useFakeLogin;
