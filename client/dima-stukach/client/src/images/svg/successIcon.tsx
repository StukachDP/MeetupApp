import { FC } from "react";

interface SuccessIconProps {
  width?: string;
  height?: string;
  viewBox?: string;
}

const SuccessIcon: FC<SuccessIconProps> = ({ width, height, viewBox }) => {
  const iconWidth = width ? width : 16;
  const iconHeight = height ? height : 16;
  const iconViewBox = viewBox ? viewBox : "0 0 16 16";
  return (
    <>
      <svg
        width={iconWidth}
        height={iconHeight}
        viewBox={iconViewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM6.4714 7.5286C6.21106 7.26825 5.78895 7.26825 5.5286 7.5286C5.26825 7.78895 5.26825 8.21106 5.5286 8.4714L6.86193 9.80474C7.12228 10.0651 7.54439 10.0651 7.80474 9.80474L10.4714 7.13807C10.7318 6.87772 10.7318 6.45561 10.4714 6.19526C10.2111 5.93491 9.78895 5.93491 9.5286 6.19526L7.33333 8.39052L6.4714 7.5286Z"
          fill="#009A73"
        />
      </svg>
    </>
  );
};

export default SuccessIcon;
