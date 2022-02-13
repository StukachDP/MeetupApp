import { FC } from "react";
import { colorTheme } from "../../appTheme";

interface SecondFormStepProps {
  fillBackground?: string;
  fillText?: string;
}

const SecondFormStep: FC<SecondFormStepProps> = ({
  fillBackground,
  fillText,
}) => {
  const iconBackgroundColor = fillBackground
    ? fillBackground
    : colorTheme.palette.secondary.main;
  const iconTextColor = fillText ? fillText : colorTheme.palette.primary.main;
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
        fill={iconBackgroundColor}
      />
      <path
        d="M15.4824 16H9.63477V14.8398L12.3945 11.8984C12.7734 11.4844 13.0527 11.123 13.2324 10.8145C13.416 10.5059 13.5078 10.2129 13.5078 9.93555C13.5078 9.55664 13.4121 9.25977 13.2207 9.04492C13.0293 8.82617 12.7559 8.7168 12.4004 8.7168C12.0176 8.7168 11.7148 8.84961 11.4922 9.11523C11.2734 9.37695 11.1641 9.72266 11.1641 10.1523H9.46484C9.46484 9.63281 9.58789 9.1582 9.83398 8.72852C10.084 8.29883 10.4355 7.96289 10.8887 7.7207C11.3418 7.47461 11.8555 7.35156 12.4297 7.35156C13.3086 7.35156 13.9902 7.5625 14.4746 7.98438C14.9629 8.40625 15.207 9.00195 15.207 9.77148C15.207 10.1934 15.0977 10.623 14.8789 11.0605C14.6602 11.498 14.2852 12.0078 13.7539 12.5898L11.8145 14.6348H15.4824V16Z"
        fill={iconTextColor}
        fontSize="1rem"
      />
    </svg>
  );
};

export default SecondFormStep;
