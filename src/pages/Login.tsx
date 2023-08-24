import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import useFakeLogin from "@src/hooks/useFakeLogin";
import { styled } from "styled-components";
const Login: React.FC<{ name: string }> = () => {
  const { login } = useFakeLogin();
  const [userId, setUserId] = useState<string | undefined>();
  const [userPw, setUserPW] = useState<string | undefined>();
  const [showPswd, setShowPassword] = useState<boolean>(false);
  const handleLogin = async () => {
    if (userPw === undefined || userId === undefined) {
      return;
    } else {
      await login({ id: userId, pw: userPw }); // 페이크 로그인 시도 (useFakeLogin 훅 사용)
    }
  };
  const onChangeUserId = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setUserId(newValue);
  };
  const onChangePw = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setUserPW(newValue);
  };
  const toggleShowPswd = () => {
    setShowPassword(!showPswd);
  };
  return (
    <>
      <HelmetProvider>
        <div className="flex h-screen flex-col justify-between bg-emerald-100">
          <Helmet>
            <title>로그인</title>
          </Helmet>
          <section className="flex justify-center flex-col items-center h-[600px]">
            <StyledForm className="flex flex-col items-center justify-center shadow-md">
              <h1 className="flex text-5xl mb-10">MINI D</h1>
              <div>
                <label htmlFor="id">ID</label>
                <input
                  type="text"
                  name="id"
                  placeholder="로그인"
                  id="id"
                  defaultValue={userId}
                  onChange={onChangeUserId}
                />
              </div>
              {(userId === undefined || userId.length === 0) && (
                <span className="text-xs flex">아이디를 입력해주세요</span>
              )}
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
                <div className="absolute right-0" onClick={toggleShowPswd}>
                  눈
                </div>
              </div>
              {(userPw === undefined || userPw.length === 0) && (
                <span className="text-xs">비밀번호를 입력해주세요</span>
              )}
              <button
                className="button bg-blue-700 w-[200px] h-[36px] rounded mt-5"
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
};
const StyledForm = styled.div`
  width: 250px;
  height: 280px;
  padding: 1rem 1.4rem;
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
      width: calc(100% - 60px);
      border-radius: 0.25rem;
    }
  }
`;

export default Login;
