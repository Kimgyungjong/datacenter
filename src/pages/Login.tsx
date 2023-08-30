import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { login } from "../util/authUtils";
import { styled } from "styled-components";

interface LoginProps {
  setAuthenticated: (authenticated: boolean) => void;
}

function Login({ setAuthenticated }: LoginProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPswd, setShowPassword] = useState<boolean>(false);

  const onChangeUserId = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setUsername(newValue);
  };
  const onChangePw = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setPassword(newValue);
  };
  const toggleShowPswd = () => {
    setShowPassword(!showPswd);
  };
  const handleLogin = async () => {
    try {
      await login(username, password);
      setAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
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
                <label htmlFor="id">ID</label>
                <input
                  type="text"
                  name="id"
                  placeholder="로그인"
                  id="id"
                  value={username}
                  onChange={onChangeUserId}
                />
              </div>
              <span className="text-xs h-4 flex justify-end w-[248px]">
                {(username === undefined || username.length === 0) && (
                  <span> 아이디를 입력해주세요</span>
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
                />
                <div
                  className="absolute right-0 text-black"
                  onClick={toggleShowPswd}
                >
                  {showPswd ? "X" : "O"}
                </div>
              </div>
              <span className="text-xs h-4 flex justify-end w-[248px]">
                {(password === undefined || password.length === 0) && (
                  <span> 비밀번호를 입력해주세요</span>
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
