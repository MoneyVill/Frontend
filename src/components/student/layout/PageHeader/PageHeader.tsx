import React, { useEffect, useState, useRef } from "react"
import { css } from "@emotion/react"
import { useRouter } from "next/router"

const backBtn = (
    <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.0892 3.57757C13.4146 3.90301 13.4146 4.43065 13.0892 4.75609L7.8451 10.0002L13.0892 15.2442C13.4146 15.5697 13.4146 16.0973 13.0892 16.4228C12.7637 16.7482 12.2361 16.7482 11.9107 16.4228L6.07733 10.5894C5.75189 10.264 5.75189 9.73634 6.07733 9.41091L11.9107 3.57757C12.2361 3.25214 12.7637 3.25214 13.0892 3.57757Z"
            fill="black"
        />
    </svg>
)

type PageHeaderProps = {
    title: string
    addComp?: React.ReactNode;
}

function PageHeader({ title, addComp }: PageHeaderProps) {
    const [isScrolled, setIsScrolled] = useState<boolean>(false)
    const headerRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const [compHeight, setCompHeight] = useState<number>(0)

    const handleScroll = () => {
        setIsScrolled(window.scrollY !== 0)
    }

    const goBackHandler = () => {
        router.back()
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { capture: true }) // 스크롤 이벤트 등록
        return () => {
            window.removeEventListener("scroll", handleScroll) // 스크롤 이벤트 제거
        }
    }, [])

    useEffect(() => {
        if (headerRef.current) {
            setCompHeight(headerRef.current.clientHeight)
        }
    }, [])

    const renderBtn = (
        <div onClick={goBackHandler} css={goBackCSS}>
            {backBtn}
        </div>
    )

    return (
        <div css={headerOuterWrapperCSS({ compHeight })}>
            <div css={headerWrapperCSS({ isScrolled })}>
                <div css={headerContentWrapperCSS({ isScrolled })}>
                    {renderBtn}
                    <div css={titleCSS({ isScrolled })}>{title}</div>
                    <div css={whiteSpaceCSS}>{renderBtn}</div>
                </div>
                <div ref={headerRef}>{addComp}</div>
            </div>
        </div>
    )
}

const headerOuterWrapperCSS = ({ compHeight }: { compHeight: number }) => css`
    height: ${compHeight + 70}px;
    margin-bottom: 16px;
`

const headerWrapperCSS = ({ isScrolled }: { isScrolled: boolean }) => css`
    z-index: 9000;
    position: fixed;
    width: 100%;
    top: ${isScrolled ? `-55px` : "0px"};
    box-shadow: ${isScrolled ? "0px 0px 30px 1px rgba(0, 0, 0, 0.1)" : null};
    border-bottom: ${isScrolled ? '2px solid #ff9d0058' : null};
    background-color: ${isScrolled ? 'var(--student-main-color-soft)' : 'var(--student-main-color)'};
    transition: box-shadow 0.3s, background-color 0.3s;
`

const headerContentWrapperCSS = ({ isScrolled }: { isScrolled: boolean }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    height: ${isScrolled ? "55px" : "70px"};
    transition: height 0.3s;
`

const goBackCSS = css`
    cursor: pointer;
`

const titleCSS = ({ isScrolled }: { isScrolled: boolean }) => css`
    transition: font-size 0.3s;
    font-size: ${isScrolled ? "var(--student-h2)" : "22px"};
    font-weight: 700;
`

const whiteSpaceCSS = css`
    visibility: hidden;
`

export default PageHeader
