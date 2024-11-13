import { useState, useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { postImmigrationAPI } from "@/api/student/user/postImmigrationAPI"
import Button from "@/components/common/Button/Button"
import LoadImage from "@/components/common/LoadImage/LoadImage"
import useGetTokenStatus from "@/hooks/useGetTokenStatus"
import { removeCookie } from "@/api/cookie"

type CodeType = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
}

function Enter() {
  const [, setTokenStatus] = useGetTokenStatus()
  const [phase, setPhase] = useState<number>(0)
  const [number, setNumber] = useState<number>(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const submitCodeRef = useRef<string>("")

  const passFirstPhaseHandler = () => {
    setPhase(1)
  }

  const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(parseInt(event.target.value, 10))
  }

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const inputLength = e.currentTarget.value.length
    const nextIndex = index + 1
    const prevIndex = index - 1

    if (inputLength === 1 && nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex]?.focus()
    }
    if (inputLength === 0 && prevIndex >= 0) {
      inputRefs.current[prevIndex]?.focus()
    }
  }

  const [code, setCode] = useState<CodeType>({
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
	code6: "",
  })

  const submitCodeFunction = async () => {
    try {
      await postImmigrationAPI({
        body: {
          code: submitCodeRef.current,
          number: number,
        },
      })

      await setTokenStatus({ showMessage: false })
      console.log("여기에 할일")
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const allFilled = Object.values(code).every(value => value !== "")
    if (allFilled) {
      submitCodeRef.current = Object.values(code).join("")
      console.log(submitCodeRef.current)
    }
  }, [code])

  const renderInput = (code: CodeType) => {
    return Array.from({ length: 6
	 }, (_, i) => {
      const key = `code${i + 1}` as keyof CodeType
      return (
        <input
          css={inputWrapperCSS}
          value={code[key]}
          onChange={(e) => {
            const newValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
            if (newValue.length <= 1) {
              setCode(prevCode => ({
                ...prevCode,
                [key]: newValue
              }))
            }
          }}
          onKeyUp={(e) => handleChange(e, i)}
          maxLength={1}
          ref={(el: HTMLInputElement | null) => {
            inputRefs.current[i] = el
          }}
          key={i}
        />
      )
    })
  }

  const signoutHandler = async () => {
    removeCookie("Authorization", { path: "/" })
    await setTokenStatus({ showMessage: false })
    console.log("여기에 할일")
  }

  return (
    <div css={enterWrapperCSS}>
      <div css={gridCSS({ phase })}>
        <div css={phaseWrapperCSS}>
          <div css={logoutWrapperCSS}>
            <div onClick={signoutHandler}>로그아웃</div>
          </div>
          <div>
            <LoadImage
              src={"/assets/enter/enter_image.png"}
              alt={"signup_illust"}
              wrapperCss={imageWrapper}
              dev={false}
            />
          </div>

          <div css={WrapperCSS}>
            <div css={css`
              margin-top: 12px;
              font-weight: 700;
              font-size: 8vw;
            `}>
              반 입장
            </div>
            <div css={css`
              margin-top: 12px;
              font-weight: 500;
              font-size: 5vw;
            `}>
              나의 반 번호를 입력해주세요.
            </div>

            <div css={bottomWrapperCSS}>
              <div css={inputOuterWrapperCSS}>
                <input 
                  css={inputWrapperCSS} 
                  style={{ width: "20vw" }} 
                  type="number" 
                  onChange={handleClassChange} 
                />
              </div>

              <Button
                text={"다음으로!"}
                fontSize={"5vw"}
                width={"60%"}
                height={"15vw"}
                theme={"mobileNormal"}
                onClick={passFirstPhaseHandler}
              />
            </div>
          </div>
        </div>

        <div css={phaseWrapperCSS}>
          <div css={logoutWrapperCSS}>
            <div onClick={signoutHandler}>로그아웃</div>
          </div>
          <div css={WrapperCSS} style={{ marginTop: "100vw" }}>
            <div css={css`
              margin-top: 12px;
              font-weight: 700;
              font-size: 8vw;
            `}>
              반 입장
            </div>
            <div css={css`
              margin-top: 12px;
              font-weight: 500;
              font-size: 5vw;
            `}>
              코드를 입력해주세요.
            </div>
            <div css={bottomWrapperCSS}>
              <div css={inputOuterWrapperCSS}>
                {renderInput(code)}
              </div>

              <Button
                text={"입장할래요!"}
                fontSize={"5vw"}
                width={"60%"}
                height={"15vw"}
                theme={"mobileNormal"}
                onClick={submitCodeFunction}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const enterWrapperCSS = css`
  width: 100%;
  min-height: 70vh;
  overflow: hidden;
  flex: 1;
  display: flex;
`

const gridCSS = ({ phase }: { phase: number }) => css`
  display: grid;
  grid-template-columns: 100% 100%;
  transition-property: transform;
  transition-duration: 0.5s;
  flex: 1;
  transform: translate(calc(-${phase} * 100%), 0px);
`

const phaseWrapperCSS = css`
  max-width: 100vw;
  display: flex;
  flex: 1;
  flex-direction: column;
`

const WrapperCSS = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 36px;
`

const imageWrapper = css`
  margin-top: 8px;
  width: 200%;
  height: 100vw;
  overflow: visible;
`

const inputOuterWrapperCSS = css`
  height: 22vw;
  margin: 24px 0px 24px 0px;
`

const inputWrapperCSS = css`
  width: 15vw;
  height: 21vw;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  border-bottom: 3px solid var(--student-main-color-4);
  margin: 0px 4px 0px 4px;
  font-size: 10vw;
  text-align: center;
  transition-property: border-bottom background-color;
  transition-duration: 0.3s;

  &:focus {
    outline: none;
    background-color: var(--student-main-color-2);
    border-bottom: 8px solid var(--student-main-color-5);
  }
`

const bottomWrapperCSS = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const logoutWrapperCSS = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  position: absolute;
  z-index: 200;
`

export default Enter