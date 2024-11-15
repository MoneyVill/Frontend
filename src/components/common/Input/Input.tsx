import React, { useEffect, useState, useRef } from "react";
import { css, SerializedStyles } from "@emotion/react";

type InputProps = {
  theme: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  customCss?: SerializedStyles | SerializedStyles[];
  textAlign?: 'left' | 'right' | 'center';
  isFile?: boolean;
  isTextarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { theme, customCss, textAlign, leftContent, rightContent, isFile, isTextarea, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [isFocusing, setIsFocusing] = useState<boolean>(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    const resizeHeightHandler = () => {
      if (textareaRef.current && divRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        divRef.current.style.height = textareaRef.current.scrollHeight + "px";
      }
    };

    useEffect(() => {
      resizeHeightHandler();
    }, []);

    return (
      <div css={[themeProvider({ isFocusing })[theme], customCss]} ref={divRef}>
        <label css={initLabelCSS}>
          {leftContent && <div css={leftContentWrapperCSS}>{leftContent}</div>}
          {isTextarea ? (
            <textarea
              css={[initInputCSS({ isFile, textAlign }), initTextAreaCSS]}
              {...props}
              onFocus={() => setIsFocusing(true)}
              onBlur={() => setIsFocusing(false)}
              onInput={resizeHeightHandler}
              ref={textareaRef}
            />
          ) : (
            <input
              css={initInputCSS({ isFile, textAlign })}
              {...props}
              onFocus={() => setIsFocusing(true)}
              onBlur={() => setIsFocusing(false)}
              ref={ref}
            />
          )}
          {rightContent && <div css={rightContentWrapperCSS}>{rightContent}</div>}
        </label>
      </div>
    );
  }
);

// displayName 추가
Input.displayName = 'Input';

const initTextAreaCSS = css`
  padding: 8px;
  resize: none;
`;

const initInputCSS = ({ isFile, textAlign }: { isFile?: boolean; textAlign?: "left" | "right" | "center" }) => {
  return css`
    flex: 1;
    border: none;
    min-width: 0px;
    background-color: rgba(255, 255, 255, 0);
    padding: 0px 12px;
    height: 100%;
    display: ${isFile ? "none" : "block"};
    &:focus {
      outline: none;
    }
    text-align: ${textAlign};

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `;
};

const initLabelCSS = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  flex-wrap: nowrap;
`;

const themeProvider = ({ isFocusing }: { isFocusing: boolean }) => {
  const themes: { [prop: string]: SerializedStyles } = {
    default: css`
      border: none;
      background-color: rgb(230, 235, 240);
      border-radius: 10px;
      height: 42px;
      outline: ${isFocusing ? "4px solid rgba(0, 70, 150, 0.2)" : "2px solid rgba(0, 20, 50, 0.1)"};
      transition-duration: 0.15s;
      transition-property: outline ease;
      & input::placeholder,
      & textarea::placeholder {
        color: rgba(0, 20, 50, 0.5);
      }
    `,
    greenDefault: css`
      border: none;
      background-color: rgb(230, 240, 235);
      border-radius: 10px;
      height: 42px;
      outline: ${isFocusing ? "4px solid rgba(0, 150, 70, 0.2)" : "2px solid rgba(0, 50, 20, 0.1)"};
      transition-duration: 0.15s;
      transition-property: outline ease;
      & input::placeholder,
      & textarea::placeholder {
        color: rgba(0, 50, 20, 0.5);
      }
    `,
    mobileDefault: css`
      border: none;
      background-color: var(--student-main-color);
      border-radius: 10px;
      height: 42px;
      outline: ${isFocusing ? "4px solid var(--student-main-color-5)" : "2px solid rgba(0, 0, 0, 0.1)"};
      transition-duration: 0.15s;
      transition-property: outline ease;
      & input,
      & textarea {
        font-size: var(--student-h3);
      }
      & input::placeholder,
      & textarea::placeholder {
        color: #9b6f00c9;
      }
    `,
    mobileWhite: css`
      border: none;
      background-color: white;
      border-radius: 10px;
      height: 42px;
      outline: ${isFocusing ? "4px solid var(--student-main-color-2)" : "2px solid rgba(0, 0, 0, 0.1)"};
      transition-duration: 0.15s;
      transition-property: outline ease;
      & input,
      & textarea {
        font-size: var(--student-h3);
      }
      & input::placeholder,
      & textarea::placeholder {
        color: #9b6f00c9;
      }
    `,
    mobileSoft: css`
      border: none;
      background-color: var(--student-main-color-soft);
      border-radius: 10px;
      height: 42px;
      outline: ${isFocusing ? "4px solid var(--student-main-color-2)" : "2px solid rgba(0, 0, 0, 0.1)"};
      transition-duration: 0.15s;
      transition-property: outline ease;
      & input,
      & textarea {
        font-size: var(--student-h3);
      }
      & input::placeholder,
      & textarea::placeholder {
        color: #9b6f00c9;
      }
    `,
  };

  return themes;
};

const leftContentWrapperCSS = css`
  overflow: hidden;
`;

const rightContentWrapperCSS = css`
  right: 0;
`;

export default Input;

