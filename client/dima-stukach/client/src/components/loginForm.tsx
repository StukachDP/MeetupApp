import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { FC, useContext } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import { Context } from "../context/appContext";
import { Fingerprint } from "@mui/icons-material";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import FieldErrorMessage from "./fieldErrorMessage";
import FieldStartMessage from "./fieldStartMessage";
import FieldSuccessMessage from "./fieldSuccessMessage";
import { useTranslation } from "react-i18next";

const LoginFormContainer = styled(Container)`
  margin-top: 8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const LoginFormCard = styled(Card)`
  padding: 1rem;
`;

const LoginFormHeader = styled(Typography)`
  color: ${colorTheme.palette.primary.dark};
  font-weight: 700;
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
`;

const LoginFormLabel = styled(Typography)`
  width: 100%;
  margin-top: 0.5rem;
  color: ${colorTheme.palette.primary.light};
  font-size: 0.9rem;
`;

const LoginFormInputblock = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const LoginFormInputField = styled(TextField)`
  width: 100%;
`;

const LoginFormActionContainer = styled(CardActions)`
  padding: 1rem;
`;

const LoginFormLogButton = styled(Button)`
  width: 100%;
  text-transform: none;
  border-radius: 5px;
  color: ${colorTheme.palette.primary.main};
  font-weight: 500;
  box-shadow: 0px 6px 16px rgba(49, 74, 215, 0.242782);
  background-image: linear-gradient(132.17deg, #8065ec -2.22%, #314ad7 103.24%);
`;

const LoginForm: FC = observer(() => {
  const { userStore } = useContext(Context);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string().required(t("login_form.log_input_error_message")),
      password: Yup.string().required(t("login_form.pass_input_error_message")),
    }),
    onSubmit: (values) => {
      loginAction(values.login, values.password);
    },
  });

  const loginAction = async (login: string, password: string) => {
    const result = await userStore.loginUser(login, password);
    if (result) {
      navigate("/meetups");
    }
  };

  return (
    <LoginFormContainer maxWidth="sm">
      <LoginFormCard>
        <form onSubmit={formik.handleSubmit}>
          <LoginFormHeader>{t("login_form.header")}</LoginFormHeader>
          <CardContent>
            <LoginFormInputblock>
              <LoginFormLabel>{t("login_form.login_label")}</LoginFormLabel>
              <LoginFormInputField
                required
                type="text"
                data-test-id="login-field"
                {...formik.getFieldProps("login")}
              />
              {formik.touched.login && formik.errors.login ? (
                <FieldErrorMessage error={formik.errors.login} />
              ) : formik.touched.login ? (
                <FieldSuccessMessage />
              ) : (
                <FieldStartMessage
                  message={t("login_form.log_input_message")}
                />
              )}
            </LoginFormInputblock>
            <LoginFormInputblock>
              <LoginFormLabel>{t("login_form.password_label")}</LoginFormLabel>
              <LoginFormInputField
                required
                type="password"
                data-test-id="password-field"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <FieldErrorMessage error={formik.errors.password} />
              ) : formik.touched.password ? (
                <FieldSuccessMessage />
              ) : (
                <FieldStartMessage
                  message={t("login_form.pass_input_message")}
                />
              )}
            </LoginFormInputblock>
          </CardContent>
          <LoginFormActionContainer>
            <LoginFormLogButton
              startIcon={<Fingerprint />}
              endIcon={<Fingerprint />}
              type="submit"
              data-test-id="login-button"
            >
              {t("login_form.submit")}
            </LoginFormLogButton>
          </LoginFormActionContainer>
        </form>
      </LoginFormCard>
    </LoginFormContainer>
  );
});

export default LoginForm;
