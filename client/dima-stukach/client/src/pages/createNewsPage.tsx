import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import { Formik, FormikProps, Form, Field, FieldProps } from "formik";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import FieldErrorMessage from "../components/fieldErrorMessage";
import FieldStartMessage from "../components/fieldStartMessage";
import FieldSuccessMessage from "../components/fieldSuccessMessage";
import ModalContent from "../components/modalContent";
import { Context } from "../context/appContext";
import DownloadCloud from "../images/svg/downloadCloud";
import { NewsValidationSchema } from "../textCorrection/formValidation";
import { NewsModel } from "../Models/News/newsModel";
import { useTranslation } from "react-i18next";
import { UserRolesModel } from "../Models/Users/userRolesModel";

const CreateNewsContainer = styled(Container)`
  margin-top: 8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const CreateNewsHeader = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;
  color: ${colorTheme.palette.primary.dark};
`;

const CreateNewsPageBlock = styled(Paper)`
  margin-bottom: 1rem;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0px 4px 7px rgba(215, 221, 232, 0.398055);
  display: flex;
`;

const CreateNewsPageFormBlock = styled.div`
  width: 100%;
  color: ${colorTheme.palette.primary.dark};
  font-size: 1rem;
`;

const CreateNewsPageLabel = styled(Typography)`
  width: 100%;
  margin-top: 0.5rem;
  color: ${colorTheme.palette.primary.light};
  font-size: 0.9rem;
`;

const CreateNewsPageFormField = styled(TextField)`
  width: 100%;
`;

const CreateNewsPageImageDropBlock = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px dashed ${colorTheme.palette.info.light};
  margin-top: 1rem;
  padding: 1.2rem 0rem;
`;

const CreateNewsPageImageDropMainContentBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CreateNewsPageImageDropExtraContentBlock = styled.div`
  width: 100%;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CreateNewsPageImageDropMainContent = styled(Typography)`
  width: 100%;
  color: ${colorTheme.palette.secondary.light};
  font-size: 0.8rem;
  text-align: center;
`;

const CreateNewsPageImageDropExtraContent = styled(Typography)`
  width: 100%;
  color: ${colorTheme.palette.secondary.contrastText};
  font-size: 0.7rem;
  text-align: center;
`;

const CreateNewsImageInput = styled.input`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem 0;
  border: 1px solid ${colorTheme.palette.primary.dark};
`;

const CreateNewsImagePreview = styled.img`
  width: 100%;
`;

const CreateNewsPagePreviewImageBlock = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

const CreateNewsPagePreviewActionBlock = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1rem;
`;

const CreateNewsPageDeleteImageButton = styled(Button)`
  width: 100%;
  text-transform: none;
  border-radius: 5px;
  color: ${colorTheme.palette.secondary.main};
  font-weight: 400;
  font-size: 0.8rem;
  border: 1px solid ${colorTheme.palette.secondary.main};
`;

const CreateNewsPageGoBackButton = styled(Button)`
  width: 25%;
  text-transform: none;
  float: left;
  border-radius: 5px;
  color: ${colorTheme.palette.primary.light};
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid #e2e7ef;
`;

const CreateNewsPageSubmitButton = styled(Button)`
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

const CreateNewsPage: FC = observer(() => {
  const [image, setImage] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [errorType, setErrorType] = useState<string>("");
  const handleClose = () => setOpenModal(false);
  const twoMB = 2 * 1024 * 1024;
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { t } = useTranslation();
  const [files, setFiles] = useState<string>("");
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isTextValid, setIsTextValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { userStore, newsStore } = useContext(Context);
  const hasEditingRights =
    userStore.user?.roles === UserRolesModel.Chief ? true : false;

  const onDrop = useCallback(
    (uploadFiles: Array<File>) => {
      uploadFiles.map((file) => {
        try {
          if (file.type.substring(0, 5) === "image") {
            if (file.size < twoMB) {
              if (require(`../images/${file.name}`).default) {
                setImage(file.name);
                setFiles(URL.createObjectURL(file));
              }
            } else {
              setErrorType("sizeType");
              setOpenModal(true);
            }
          } else {
            setErrorType("fileType");
            setOpenModal(true);
          }
        } catch (error) {
          setErrorType("fileType");
          setOpenModal(true);
        }
      });
    },
    [twoMB]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const deleteImage = useCallback(() => {
    setImage("");
    setFiles("");
  }, []);

  useEffect(() => {
    if (!hasEditingRights) {
      navigate("/403/error", { replace: true });
    }
  }, [navigate, hasEditingRights]);

  useEffect(() => {
    if (isTitleValid && isTextValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isTitleValid, isTextValid]);

  return (
    <>
      <CreateNewsContainer maxWidth="sm">
        <CreateNewsHeader data-test-id="create-news-header">
          {t("create_news_page.header")}
        </CreateNewsHeader>
        <Formik
          initialValues={{
            title: "",
            text: "",
          }}
          validationSchema={NewsValidationSchema}
          onSubmit={async (values) => {
            const requestResult: NewsModel = {
              id: "8",
              publicationDate: new Date().toISOString(),
              title: values.title,
              text: values.text,
              image: image,
            };
            const data = await newsStore.createNews(requestResult);
            if (data) {
              navigate("/news");
            } else {
              console.log("something going wrong");
            }
          }}
        >
          {(props: FormikProps<any>) => (
            <Form>
              <CreateNewsPageBlock>
                <CreateNewsPageFormBlock>
                  <CreateNewsPageLabel>
                    {t("create_news_page.title")}
                  </CreateNewsPageLabel>
                  <Field name="title">
                    {({ field, form, meta }: FieldProps<string>) => (
                      <>
                        <CreateNewsPageFormField
                          multiline
                          {...field}
                          data-test-id="title-field"
                        />
                        {meta.touched && meta.error ? (
                          <>
                            <FieldErrorMessage error={meta.error} />
                            {setIsTitleValid(false)}
                          </>
                        ) : meta.touched ? (
                          <>
                            <FieldSuccessMessage />
                            {setIsTitleValid(true)}
                          </>
                        ) : (
                          <FieldStartMessage
                            message={t("create_news_page.title_input_message")}
                          />
                        )}
                      </>
                    )}
                  </Field>
                  <CreateNewsPageLabel>
                    {t("create_news_page.text")}
                  </CreateNewsPageLabel>
                  <Field name="text">
                    {({ field, form, meta }: FieldProps<string>) => (
                      <>
                        <CreateNewsPageFormField
                          multiline
                          minRows={3}
                          {...field}
                          data-test-id="text-field"
                        />
                        {meta.touched && meta.error ? (
                          <>
                            <FieldErrorMessage error={meta.error} />
                            {setIsTextValid(false)}
                          </>
                        ) : meta.touched ? (
                          <>
                            <FieldSuccessMessage />
                            {setIsTextValid(true)}
                          </>
                        ) : (
                          <FieldStartMessage
                            message={t("create_news_page.text_input_message")}
                          />
                        )}
                      </>
                    )}
                  </Field>
                  <CreateNewsPageImageDropBlock>
                    {image === "" ? (
                      <div {...getRootProps()}>
                        <CreateNewsImageInput {...getInputProps()} />
                        <CreateNewsPageImageDropMainContentBlock>
                          <DownloadCloud />
                        </CreateNewsPageImageDropMainContentBlock>
                        <CreateNewsPageImageDropMainContentBlock>
                          {isDragActive ? (
                            <CreateNewsPageImageDropMainContent>
                              {t("drop_image_content.drop_advice")}
                            </CreateNewsPageImageDropMainContent>
                          ) : (
                            <CreateNewsPageImageDropMainContent>
                              {t(
                                "drop_image_content.drag_download_advice.drag"
                              )}{" "}
                              <br />{" "}
                              {t(
                                "drop_image_content.drag_download_advice.download"
                              )}
                            </CreateNewsPageImageDropMainContent>
                          )}
                        </CreateNewsPageImageDropMainContentBlock>
                        <CreateNewsPageImageDropExtraContentBlock>
                          <CreateNewsPageImageDropExtraContent>
                            {t("drop_image_content.type_advice")}
                          </CreateNewsPageImageDropExtraContent>
                          <CreateNewsPageImageDropExtraContent>
                            {t("drop_image_content.size_advice")}
                          </CreateNewsPageImageDropExtraContent>
                        </CreateNewsPageImageDropExtraContentBlock>
                      </div>
                    ) : (
                      <CreateNewsPageImageDropMainContentBlock>
                        <CreateNewsPagePreviewImageBlock {...getRootProps()}>
                          <CreateNewsImagePreview src={files} alt="preview" />
                          <CreateNewsImageInput {...getInputProps()} />
                        </CreateNewsPagePreviewImageBlock>
                        <CreateNewsPagePreviewActionBlock>
                          <CreateNewsPageDeleteImageButton
                            onClick={deleteImage}
                          >
                            {t("drop_image_content.delete_image_button")}
                          </CreateNewsPageDeleteImageButton>
                        </CreateNewsPagePreviewActionBlock>
                      </CreateNewsPageImageDropMainContentBlock>
                    )}
                  </CreateNewsPageImageDropBlock>
                </CreateNewsPageFormBlock>
              </CreateNewsPageBlock>
              <CreateNewsPageBlock data-test-id="action-block">
                <CreateNewsPageGoBackButton
                  onClick={goBack}
                  data-test-id="go-previous-page-button"
                >
                  {t("create_news_page.goBack_button")}
                </CreateNewsPageGoBackButton>
                <CreateNewsPageSubmitButton
                  type="submit"
                  disabled={!isFormValid}
                  data-test-id="create-news-button"
                >
                  {t("create_news_page.create_news_button")}
                </CreateNewsPageSubmitButton>
              </CreateNewsPageBlock>
            </Form>
          )}
        </Formik>
        <Modal open={openModal} onClose={handleClose}>
          <ModalContent errorType={errorType} close={handleClose} />
        </Modal>
      </CreateNewsContainer>
    </>
  );
});

export default CreateNewsPage;
