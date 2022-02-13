import {
  CircularProgress,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  Modal,
} from "@mui/material";
import { Formik, FormikProps, Form, Field, FieldProps } from "formik";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import FieldErrorMessage from "../components/fieldErrorMessage";
import FieldSuccessMessage from "../components/fieldSuccessMessage";
import Vector from "../images/Vector.jpg";
import ModalContent from "../components/modalContent";
import { Context } from "../context/appContext";
import DefaultMeetupImage from "../images/svg/defaultMeetupImage";
import { UserRolesModel } from "../Models/Users/userRolesModel";
import { NewsValidationSchema } from "../textCorrection/formValidation";
import { NewsModel } from "../Models/News/newsModel";
import { useTranslation } from "react-i18next";

const EditNewsPageSpinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  color: ${colorTheme.palette.secondary.main};
`;

const EditNewsPageContainer = styled(Container)`
  margin-top: 8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const EditNewsPageHeader = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
  color: ${colorTheme.palette.primary.dark};
`;

const EditNewsPageBlock = styled(Paper)`
  margin-bottom: 1rem;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0px 4px 7px rgba(215, 221, 232, 0.398055);
  display: flex;
`;

const EditNewsPageFormBlock = styled.div`
  width: 100%;
  color: ${colorTheme.palette.primary.dark};
  font-size: 1rem;
`;

const EditNewsPageLabel = styled(Typography)`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.3rem;
  color: ${colorTheme.palette.primary.light};
  font-size: 0.9rem;
`;

const EditNewsImageBlock = styled.div`
  position: relative;
`;

const EditNewsImage = styled.img`
  width: 100%;
`;

const EditNewsChangeImageButton = styled(Button)`
  position: absolute;
  top: 90%;
  left: 95%;
  transform: translate(-50%, -50%);
  height: 40px;
  min-width: 40px;
  width: 40px;
  background-image: url(${Vector});
  background-size: cover;
  z-index: 100;
`;

const EditNewsImageInput = styled.input`
  width: 100%;
  opacity: 0;
`;

const EditNewsPageFormField = styled(TextField)`
  width: 100%;
  display: flex;
`;

const EditNewsPageGoBackButton = styled(Button)`
  width: 25%;
  text-transform: none;
  float: left;
  border-radius: 5px;
  color: ${colorTheme.palette.primary.light};
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid #e2e7ef;
`;

const EditNewsPageSubmitButton = styled(Button)`
  width: 25%;
  text-transform: none;
  margin-left: auto;
  border-radius: 5px;
  color: ${colorTheme.palette.primary.main};
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0px 6px 16px rgba(49, 74, 215, 0.242782);
  background-image: linear-gradient(114.85deg, #8065ec 15.83%, #314ad7 84.17%);
`;

const EditNewsPage: FC = observer(() => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [errorType, setErrorType] = useState<string>("");
  const handleClose = () => setOpenModal(false);
  const twoMB = 2 * 1024 * 1024;
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { t } = useTranslation();
  const { userStore, newsStore } = useContext(Context);
  const hasEditingRights =
    userStore.user?.roles === UserRolesModel.Chief ? true : false;
  const { id } = useParams();

  useEffect(() => {
    if (hasEditingRights) {
      newsStore.getNewsById(id).then((requestResult) => {
        if (requestResult && newsStore.choosenByIdNews) {
          if (newsStore.choosenByIdNews.image) {
            setImage(newsStore.choosenByIdNews.image);
          }
          setLoading(false);
        } else {
          navigate("/404/error", { replace: true });
        }
      });
    } else {
      navigate("/403/error", { replace: true });
    }
  }, [id, navigate, userStore, newsStore, hasEditingRights]);

  if (loading || newsStore.choosenByIdNews === null) {
    return <EditNewsPageSpinner />;
  }

  return (
    <EditNewsPageContainer maxWidth="sm">
      <EditNewsPageHeader>{t("edit_news_page.header")}</EditNewsPageHeader>
      <Formik
        initialValues={{
          id: newsStore.choosenByIdNews.id,
          publicationDate: newsStore.choosenByIdNews.publicationDate,
          title: newsStore.choosenByIdNews.title,
          text: newsStore.choosenByIdNews.text,
        }}
        validationSchema={NewsValidationSchema}
        onSubmit={async (values) => {
          const requestData: NewsModel = {
            id: values.id,
            publicationDate: values.publicationDate,
            title: values.title,
            text: values.text,
            image: image,
          };
          const data = await newsStore.editNews(requestData);
          if (data) {
            navigate("/news");
          } else {
            console.log("Something going wrong");
          }
        }}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <EditNewsPageBlock>
              <EditNewsPageFormBlock>
                <EditNewsPageLabel>
                  {t("edit_news_page.image")}
                </EditNewsPageLabel>
                <EditNewsImageBlock>
                  {image ? (
                    <EditNewsImage
                      src={require(`../images/${image}`).default}
                    />
                  ) : (
                    <DefaultMeetupImage />
                  )}
                  <EditNewsChangeImageButton>
                    <EditNewsImageInput
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        try {
                          const file = event.target.files;
                          if (file !== null && file.length > 0) {
                            if (file[0].type.substring(0, 5) === "image") {
                              if (file[0].size < twoMB) {
                                if (
                                  require(`../images/${file[0].name}`).default
                                ) {
                                  setImage(file[0].name);
                                }
                              } else {
                                setErrorType("sizeType");
                                setOpenModal(true);
                              }
                            } else {
                              setErrorType("fileType");
                              setOpenModal(true);
                            }
                          }
                        } catch (error) {
                          setErrorType("fileType");
                          setOpenModal(true);
                        }
                      }}
                    />
                  </EditNewsChangeImageButton>
                </EditNewsImageBlock>
                <EditNewsPageLabel>
                  {t("edit_news_page.title")}
                </EditNewsPageLabel>
                <Field name="title">
                  {({ field, form, meta }: FieldProps<string>) => (
                    <>
                      <EditNewsPageFormField
                        multiline
                        {...field}
                        data-test-id="title-field"
                      />
                      {meta.touched && meta.error ? (
                        <FieldErrorMessage error={meta.error} />
                      ) : (
                        <FieldSuccessMessage />
                      )}
                    </>
                  )}
                </Field>
                <EditNewsPageLabel>
                  {t("edit_news_page.text")}
                </EditNewsPageLabel>
                <Field name="text">
                  {({ field, form, meta }: FieldProps<string>) => (
                    <>
                      <EditNewsPageFormField
                        multiline
                        {...field}
                        data-test-id="text-field"
                      />
                      {meta.touched && meta.error ? (
                        <FieldErrorMessage error={meta.error} />
                      ) : (
                        <FieldSuccessMessage />
                      )}
                    </>
                  )}
                </Field>
              </EditNewsPageFormBlock>
            </EditNewsPageBlock>

            <EditNewsPageBlock>
              <EditNewsPageGoBackButton
                onClick={goBack}
                data-test-id="go-previous-page-button"
              >
                {t("edit_news_page.goBack_button")}
              </EditNewsPageGoBackButton>
              <EditNewsPageSubmitButton
                type="submit"
                data-test-id="edit-news-button"
              >
                {t("edit_news_page.edit_news_button")}
              </EditNewsPageSubmitButton>
            </EditNewsPageBlock>
          </Form>
        )}
      </Formik>
      <Modal open={openModal} onClose={handleClose}>
        <ModalContent errorType={errorType} close={handleClose} />
      </Modal>
    </EditNewsPageContainer>
  );
});

export default EditNewsPage;
