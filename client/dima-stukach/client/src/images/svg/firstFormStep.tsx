import { FC } from "react";
import { colorTheme } from "../../appTheme";

const FirstFormStep: FC = () => {
  return (
    <svg
      width="30"
      height="24"
      viewBox="0 0 24 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill={colorTheme.palette.secondary.main}
      />
      <path
        d="M13.748 16H12.0547V9.47266L10.0332 10.0996V8.72266L13.5664 7.45703H13.748V16Z"
        fill={colorTheme.palette.primary.main}
        fontSize="1rem"
      />
    </svg>
  );
};

export default FirstFormStep;
