import React, { useState, KeyboardEvent } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { styled } from "styled-components";
import { LoginResponse, login } from "@src/api/login";

interface LoginProps {
  setAuthenticated: (authenticated: boolean) => void;
}

function Login({ setAuthenticated }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("a@a.com");
  const [password, setPassword] = useState("");
  const [showPswd, setShowPassword] = useState<boolean>(false);

  const onChangeUserId = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setEmail(newValue);
  };
  const onChangePw = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setPassword(newValue);
  };
  const toggleShowPswd = () => {
    setShowPassword(!showPswd);
  };
  const stateSwitch = (code: LoginResponse | string | null) => {
    switch (code) {
      case "TK0001":
      case "TK0002":
        alert("토큰이 유효하지 않습니다");
        break;
      case "TK0003":
        alert("중복로그인 입니다.");
        break;
      case "L0001":
        alert("계정정보 없음");
        break;
      case "L0002":
        alert("비밀번호 불일치");
        break;
      default:
        alert("로그인실패");
        break;
    }
  };
  const handleLogin = async () => {
    const response = await login(email, password, true);
    if (response === "") {
      setAuthenticated(true);
      navigate("/dashboard");
    } else {
      stateSwitch(response);
      navigate("/login");
    }
  };
  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      try {
        await login(email, password, true);
        setAuthenticated(true);
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };
  return (
    <>
      <HelmetProvider>
        <div className="flex h-screen flex-col justify-between bg-white">
          <Helmet>
            <title>로그인</title>
          </Helmet>
          <section className="flex justify-center flex-col items-center h-[1000px]">
            <StyledForm className="flex flex-col items-center justify-center shadow-md">
              <h1 className="flex text-5xl mb-10">Alchera-DC</h1>
              <div>
                <label htmlFor="email">ID</label>
                <input
                  type="text"
                  name="id"
                  placeholder="이메일 주소"
                  id="email"
                  value={email}
                  onChange={onChangeUserId}
                />
              </div>
              <span className="text-xs h-4 flex justify-end w-[248px]">
                {(email === undefined || email.length === 0) && (
                  <span className=" text-red-200"> 아이디를 입력해주세요</span>
                )}
              </span>
              <div className=" relative">
                <label htmlFor="">PW</label>
                <input
                  className=" pr-5"
                  type={showPswd ? "text" : "password"}
                  name="pw"
                  placeholder="비밀번호"
                  id="pw"
                  onChange={onChangePw}
                  onKeyDown={handleKeyDown}
                />
                <div
                  className="absolute right-0 text-black"
                  onClick={toggleShowPswd}
                >
                  {showPswd ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <span className="text-xs h-4 flex justify-end w-[248px]">
                {(password === undefined || password.length === 0) && (
                  <span className=" text-red-200">
                    {" "}
                    비밀번호를 입력해주세요
                  </span>
                )}
              </span>
              <button
                className="button bg-blue-700 w-[248px] h-[46px] rounded m-5"
                onClick={handleLogin}
              >
                로그인
              </button>
            </StyledForm>
          </section>
        </div>
      </HelmetProvider>
    </>
  );
}
const StyledForm = styled.div`
  width: 350px;
  height: 350px;
  padding: 1.4rem;
  border-radius: 4px;
  color: #fff;
  background-color: cornflowerblue;
  & div {
    display: inline-flex;
    margin: 4px;
    align-items: center;
    & svg {
      color: #999;
    }
    & label {
      display: inherit;
      width: 60px;
    }
    & input {
      color: #666;
      padding: 2px 6px;
      outline: none;
      width: calc(100%);
      border-radius: 0.25rem;
    }
  }
`;

export default Login;
