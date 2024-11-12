import React, { useReducer } from "react";
// import React, { useState, useReducer } from "react";
import { css } from "@emotion/react";
// import { useRouter } from "next/router";
import { ID_ICON, PASSWORD2_ICON } from "@/components/teacher/Signup/SignupIcons/SignupIcons";
import Input from "@/components/common/Input/Input";
import useNavigate from "@/hooks/useNavigate";
// import LoadImage from "@/components/common/LoadImage/LoadImage";
import Button from "@/components/common/Button/Button";
import Image from "next/image";

const initialState = { id: "", password: "" };


const inputReducer = (state: { id: string; password: string }, action: { type: string; value: string }) => {
	switch (action.type) {
		case "CHANGE_ID":
			return { ...state, id: action.value };
		case "CHANGE_PW":
			return { ...state, password: action.value };
		default:
			return state;
	}
};


// 컴포넌트 이름을 Login으로 변경
function Login() {
	const [inputState, dispatchInput] = useReducer(inputReducer, initialState);
	// const router = useRouter();
	const navigate = useNavigate();

	const loginHandler = async () => {
		if (inputState.id === "" || inputState.password === "") {
			alert("빈 칸을 모두 입력해주세요.");
			return;
		}

		alert("로그인 요청");
	};


	const navToSignup = () => {
		navigate("/student/signup", "bottomToTop");
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			loginHandler();
		}
	};

	return (
		<div css={wrapperCSS}>
			<div css={imageSectionCSS}>
				<Image
					src="/assets/login/login_illust_2.jpg"
					alt="signup_illust"
					css={imageWrapperCSS}
					layout="responsive"
					width={500} 
					height={300} 
				/>
			</div>
			<div css={loginSectionCSS}>
				<div css={loginHeaderCSS}>
					<div css={headerLabelCSS}>아이코에 오신 것을</div>
					<div css={headerLabelCSS}>환영합니다!</div>
				</div>
				<div css={loginFormCSS}>
					<Input
						customCss={inputCSS}
						leftContent={ID_ICON}
						theme={"mobileDefault"}
						type="text"
						placeholder="아이디를 입력해 주세요."
						onChange={(e) => dispatchInput({ type: "CHANGE_ID", value: e.target.value })}
					/>
					<Input
						customCss={inputCSS}
						leftContent={PASSWORD2_ICON}
						theme={"mobileDefault"}
						type="password"
						placeholder="비밀번호를 입력해주세요."
						onChange={(e) => dispatchInput({ type: "CHANGE_PW", value: e.target.value })}
						onKeyDown={handleKeyDown}
					/>

					<div css={signupLabelCSS}>
						<span>계정이 없으신가요?&nbsp;</span>
						<span css={signupCSS} onClick={navToSignup}>
							회원가입
						</span>
					</div>

					<Button
						theme={"highlighted"}
						width={"90%"}
						height={"42px"}
						text={"로그인"}
						fontSize={"var(--teacher-h5)"}
						onClick={loginHandler}
					/>
				</div>
			</div>
		</div>
	);
}

const wrapperCSS = css`
	display: flex;
	flex: 1;

	/* flex-direction: column; */
	width: 100%;
	/* height: 100vh; */
	/* background-color: red; */

	@media (max-width: 1440px) {
		flex-direction: column;
	}

	@media (min-width: 1441px) {
		height: 100vh;
		
	}
`

const loginSectionCSS = css`
	@media (max-width: 1440px) {
		/* height: 40%; */
		width: 100%;
		flex: 1;
		/* margin: 36px 0px 0px 0px; */
	}
	@media (min-width: 1441px) {
		height: 100vh;
		width: 25vw;
		
	}

	min-width: 360px;
	/* background-color: red; */
	/* box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2); */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* background-color: red; */
`

const imageSectionCSS = css`
	/* height: 100vh; */
	overflow: hidden;
	box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);

	/* @media (max-width: 1280px) {
		display: flex;
		justify-content: center;
	} */

	@media (max-width: 1440px) {
		height: 40vh;
	}

	@media (min-width: 1441px) {
		flex: 1;
	}
`

const imageWrapperCSS = css`
	width: 100%;
	height: auto;
	/* @media (max-width: 576px) {
		width: 100%;
		height: auto;
	}
	@media (min-width: 577px) {
		width: 100%;
		height: auto;
	} */
`

const loginFormCSS = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24px;
	width: 100%;
	/* background-color: blue; */
`

const inputCSS = css`
	width: 90%;
`

const loginHeaderCSS = css`
	margin-bottom: 4px;
	font-size: var(--student-h1);
	display: flex;
	flex-direction: column;
	align-items: center;
`

const headerLabelCSS = css`
	margin-bottom: 12px;
`

const signupLabelCSS = css`
	display: flex;

	color: rgba(0, 20, 50, 0.5);
`

const signupCSS = css`
	color: rgba(0, 20, 50, 1);
	cursor: pointer;

	transition-property: color;
	transition-duration: 0.3s;

	&:hover {
		color: rgba(0, 20, 50, 0.7);
	}
`

export default Login