import React, { useState } from "react";
import Image from "next/image";
import { css, SerializedStyles } from "@emotion/react";

type LoadImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  wrapperCss?: SerializedStyles;
  imageCss?: SerializedStyles;
  skeletonCss?: SerializedStyles;
  useSkeleton?: boolean;
  dev?: boolean;
};

function LoadImage({
  src,
  alt,
  sizes,
  wrapperCss,
  imageCss,
  useSkeleton,
  skeletonCss,
  dev,
}: LoadImageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div
      className="image-wrapper"
      css={[wrapperCss, imageWrapperCSS({dev })]}
    >
      {useSkeleton && <div css={[skeletonCss, skeletonInitCSS({ isLoading })]} />}
      <Image
        css={[imageCss, imageCSS({ isLoading, dev })]}
        src={src}
        alt={alt}
        sizes={sizes}
        priority={true}
        fill
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
}

const imageWrapperCSS = ({ dev }: { dev?: boolean }) => {
    return css`
      position: relative;
      overflow: hidden;
      background-color: ${dev && "blue"};
    `;
  };

const skeletonInitCSS = ({ isLoading }: { isLoading: boolean }) => {
  return css`
    transition-property: opacity;
    transition-duration: 0.2s;
    opacity: ${isLoading ? "1000%" : "0%"};
    width: 100%;
    height: 100%;
    background-color: rgba(230, 230, 230, 1);
  `;
};

const imageCSS = ({ isLoading, dev }: { isLoading: boolean; dev?: boolean }) => {
  return css`
    transition-property: opacity;
    transition-duration: 0.2s;
    opacity: ${isLoading ? "0%" : "100%"};
    border: ${dev && "1px solid red"};
    object-fit: contain;
  `;
};

export default LoadImage;
