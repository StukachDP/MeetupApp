import {
  Button,
  Container,
  Modal,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import backgroundIMG from "../images/backgroundIMG.jpg";
import { colorTheme } from "../appTheme";
import { Formik, FormikProps, Form, Field, FieldProps } from "formik";
import { MeetupValidationSchema } from "../textCorrection/formValidation";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/lab";
import FirstFormStep from "../images/svg/firstFormStep";
import SecondFormStep from "../images/svg/secondFormStep";
import ModalContent from "../components/modalContent";
import { MeetupModel } from "../Models/Meetups/meetupModel";
import { MeetupStatusModel } from "../Models/Meetups/meetupStatusModel";
import FieldErrorMessage from "../components/fieldErrorMessage";
import FieldSuccessMessage from "../components/fieldSuccessMessage";
import FieldStartMessage from "../components/fieldStartMessage";
import SuccessIcon from "../images/svg/successIcon";
import { useDropzone } from "react-dropzone";
import DownloadCloud from "../images/svg/downloadCloud";
import { observer } from "mobx-react-lite";
import { Context } from "../context/appContext";
import { useTranslation } from "react-i18next";

const CreateMeetupContainer = styled(Container)`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const CreateMeetupFormNavigator = styled(Tab)`
  width: 50%;
  font-weight: 500;
  font-size: 1rem;
`;

const CreateMeetupHeader = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  color: ${colorTheme.palette.primary.dark};
`;

const CreateMeetupInfoContent = styled(Typography)`
  font-size: 0.8rem;
  font-weight: 400;
  width: 100%;
  text-align: center;
  padding: 1rem;
  color: ${colorTheme.palette.secondary.light};
`;

const CreateMeetupPageBlock = styled(Paper)`
  margin-bottom: 1rem;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0px 4px 7px rgba(215, 221, 232, 0.398055);
  display: flex;
`;

const CreateMeetupPageFormBlock = styled.div`
  width: 100%;
  color: ${colorTheme.palette.primary.dark};
  font-size: 1rem;
`;

const CreateMeetupPageLabel = styled(Typography)`
  width: 100%;
  margin-top: 0.5rem;
  color: ${colorTheme.palette.primary.light};
  font-size: 0.9rem;
`;

const CreateMeetupPageFormField = styled(TextField)`
  width: 100%;
`;

const CreateMeetupPageFormTimeBlock = styled.div`
  display: flex;
`;

const CreateMeetupPageStartTimeContent = styled.div`
  width: 48%;
  margin-right: 1rem;
  display: block;
`;

const CreateMeetupPageFinishTimeContent = styled.div`
  width: 48%;
  margin-left: 1rem;
  display: block;
`;

const CreateMeetupPageImageDropBlock = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px dashed ${colorTheme.palette.info.light};
  margin-top: 1rem;
  padding: 1.2rem 0rem;
`;

const CreateMeetupPageImageDropMainContentBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CreateMeetupPageImageDropExtraContentBlock = styled.div`
  width: 100%;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CreateMeetupPageImageDropMainContent = styled(Typography)`
  width: 100%;
  color: ${colorTheme.palette.secondary.light};
  font-size: 0.8rem;
  text-align: center;
`;

const CreateMeetupPageImageDropExtraContent = styled(Typography)`
  width: 100%;
  color: ${colorTheme.palette.secondary.contrastText};
  font-size: 0.7rem;
  text-align: center;
`;

const CreateMeetupImageInput = styled.input`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem 0;
  border: 1px solid ${colorTheme.palette.primary.dark};
`;

const CreateMeetupImagePreview = styled.img`
  width: 100%;
`;

const CreateMeetupPagePreviewImageBlock = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

const CreateMeetupPagePreviewActionBlock = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1rem;
`;

const CreateMeetupPageDeleteImageButton = styled(Button)`
  width: 100%;
  text-transform: none;
  border-radius: 5px;
  color: ${colorTheme.palette.secondary.main};
  font-weight: 400;
  font-size: 0.8rem;
  border: 1px solid ${colorTheme.palette.secondary.main};
`;

const CreateMeetupPageGoBackButton = styled(Button)`
  width: 25%;
  text-transform: none;
  float: left;
  border-radius: 5px;
  color: ${colorTheme.palette.primary.light};
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid #e2e7ef;
`;

const CreateMeetupPageSubmitButton = styled(Button)`
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

const CreateMeetupImage = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const CreateMeetupPage: FC = observer(() => {
  const [tabNumber, setTabNumber] = useState(0);
  const [image, setImage] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [errorType, setErrorType] = useState<string>("");
  const handleClose = () => setOpenModal(false);
  const twoMB = 2 * 1024 * 1024;
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { t } = useTranslation();
  const goPreviosPartForm = () => setTabNumber(0);
  const goNextPartForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setTabNumber(1);
  };
  const [mainTabIcon, setMainTabIcon] = useState(<FirstFormStep />);
  const [extraTabIcon, setExtraTabIcon] = useState(
    <SecondFormStep
      fillBackground={`${colorTheme.palette.primary.contrastText}`}
      fillText={`${colorTheme.palette.secondary.contrastText}`}
    />
  );
  const [files, setFiles] = useState<string>("");
  const [isSubjectValid, setIsSubjectValid] = useState(false);
  const [isSpeakersValid, setIsSpeakersValid] = useState(false);
  const [isExcerptValid, setIsExcerptValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { meetupsStore } = useContext(Context);

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

  const handleChange = useCallback(
    (event: SyntheticEvent, newTabNumber: number) => {
      setTabNumber(newTabNumber);
    },
    [setTabNumber]
  );

  useEffect(() => {
    if (isSubjectValid && isSpeakersValid && isExcerptValid) {
      setIsFormValid(true);
      setMainTabIcon(
        <SuccessIcon width="30" height="30" viewBox="0 0 16 16" />
      );
      setExtraTabIcon(<SecondFormStep />);
    } else {
      setIsFormValid(false);
      setMainTabIcon(<FirstFormStep />);
      setExtraTabIcon(
        <SecondFormStep
          fillBackground={`${colorTheme.palette.primary.contrastText}`}
          fillText={`${colorTheme.palette.secondary.contrastText}`}
        />
      );
    }
  }, [isSubjectValid, isSpeakersValid, isExcerptValid]);

  return (
    <>
      <CreateMeetupContainer maxWidth="sm">
        <Tabs
          value={tabNumber}
          onChange={handleChange}
          aria-label="full width tabs example"
        >
          <CreateMeetupFormNavigator
            id="mainFormPart"
            icon={mainTabIcon}
            iconPosition="start"
            data-test-id="main-fields-tab"
            label={t("create_meetup_page.main_tab")}
          />
          <CreateMeetupFormNavigator
            id="extraFormPart"
            disabled={!isFormValid}
            icon={extraTabIcon}
            iconPosition="start"
            data-test-id="extra-fields-tab"
            label={t("create_meetup_page.extra_tab")}
          />
        </Tabs>
        <CreateMeetupHeader>
          {t("create_meetup_page.header")}
        </CreateMeetupHeader>
        <CreateMeetupInfoContent>
          {t("create_meetup_page.help_content")}
        </CreateMeetupInfoContent>
        <Formik
          initialValues={{
            modified: new Date(),
            startDate: new Date(),
            finishDate: new Date(),
            authorId: "",
            authorData: "",
            speakers: [],
            subject: "",
            excerpt: "",
            place: "",
          }}
          validationSchema={MeetupValidationSchema}
          onSubmit={async (values) => {
            const authorData = {
              id: "1",
              name: values.authorData.split(" ")[0],
              surname: values.authorData.split(" ")[1],
            };
            const speakersData = [
              {
                id: "1",
                name: values.authorData.split(" ")[0],
                surname: values.authorData.split(" ")[1],
              },
            ];
            const requestResult: MeetupModel = {
              id: "8",
              modified: values.modified.toISOString(),
              start: values.startDate.toISOString(),
              finish: values.finishDate.toISOString(),
              author: authorData,
              speakers: speakersData,
              subject: values.subject,
              excerpt: values.excerpt,
              place: values.place,
              goCount: 0,
              status: MeetupStatusModel.Request,
              isOver: false,
              image: image,
            };
            const data = await meetupsStore.createMeetup(requestResult);
            if (data) {
              navigate("/meetups");
            } else {
              console.log("something going wrong");
            }
          }}
        >
          {(props: FormikProps<any>) => (
            <Form>
              {tabNumber === 0 ? (
                <>
                  <CreateMeetupPageBlock>
                    <CreateMeetupPageFormBlock>
                      <CreateMeetupPageLabel>
                        {t("create_meetup_page.subject")}
                      </CreateMeetupPageLabel>
                      <Field name="subject">
                        {({ field, form, meta }: FieldProps<string>) => (
                          <>
                            <CreateMeetupPageFormField
                              multiline
                              {...field}
                              data-test-id="subject-field"
                            />
                            {meta.touched && meta.error ? (
                              <>
                                <FieldErrorMessage error={meta.error} />
                                {setIsSubjectValid(false)}
                              </>
                            ) : meta.touched ? (
                              <>
                                <FieldSuccessMessage />
                                {setIsSubjectValid(true)}
                              </>
                            ) : (
                              <FieldStartMessage
                                message={t(
                                  "create_meetup_page.subject_input_start_message"
                                )}
                              />
                            )}
                          </>
                        )}
                      </Field>
                      <CreateMeetupPageLabel>
                        {t("create_meetup_page.speakers")}
                      </CreateMeetupPageLabel>
                      <Field name="authorData">
                        {({ field, form, meta }: FieldProps<string>) => (
                          <>
                            <CreateMeetupPageFormField
                              multiline
                              {...field}
                              data-test-id="speakers-field"
                            />
                            {meta.touched && meta.error ? (
                              <>
                                <FieldErrorMessage error={meta.error} />
                                {setIsSpeakersValid(false)}
                              </>
                            ) : meta.touched ? (
                              <>
                                <FieldSuccessMessage />
                                {setIsSpeakersValid(true)}
                              </>
                            ) : (
                              <FieldStartMessage
                                message={t(
                                  "create_meetup_page.author_input_start_message"
                                )}
                              />
                            )}
                          </>
                        )}
                      </Field>
                      <CreateMeetupPageLabel data-test-id="excerpt-label">
                        {t("create_meetup_page.excerpt")}
                      </CreateMeetupPageLabel>
                      <Field name="excerpt">
                        {({ field, form, meta }: FieldProps<string>) => (
                          <>
                            <CreateMeetupPageFormField
                              multiline
                              minRows={3}
                              {...field}
                              data-test-id="excerpt-field"
                            />
                            {meta.touched && meta.error ? (
                              <>
                                <FieldErrorMessage error={meta.error} />
                                {setIsExcerptValid(false)}
                              </>
                            ) : meta.touched ? (
                              <>
                                <FieldSuccessMessage />
                                {setIsExcerptValid(true)}
                              </>
                            ) : (
                              <FieldStartMessage
                                message={t(
                                  "create_meetup_page.excerpt_input_start_message"
                                )}
                              />
                            )}
                          </>
                        )}
                      </Field>
                    </CreateMeetupPageFormBlock>
                  </CreateMeetupPageBlock>

                  <CreateMeetupPageBlock data-test-id="action_block">
                    <CreateMeetupPageGoBackButton
                      onClick={goBack}
                      data-test-id="go-previous-page-button"
                    >
                      {t("create_meetup_page.goBack_button")}
                    </CreateMeetupPageGoBackButton>
                    <CreateMeetupPageSubmitButton
                      onClick={goNextPartForm}
                      data-test-id="to-extra-fields-button"
                      disabled={!isFormValid}
                    >
                      {t("create_meetup_page.goNext_button")}
                    </CreateMeetupPageSubmitButton>
                  </CreateMeetupPageBlock>
                </>
              ) : (
                <>
                  <CreateMeetupPageBlock>
                    <CreateMeetupPageFormBlock>
                      <CreateMeetupPageFormTimeBlock>
                        <CreateMeetupPageStartTimeContent>
                          <CreateMeetupPageLabel>
                            {t("create_meetup_page.start_date")}
                          </CreateMeetupPageLabel>
                          <Field name="startDate">
                            {({ field, form, meta }: FieldProps<Date>) => (
                              <>
                                <DateTimePicker
                                  {...field}
                                  onChange={(date) => {
                                    form.setFieldTouched("startDate", true);
                                    form.setFieldValue("startDate", date);
                                  }}
                                  renderInput={(params) => (
                                    <CreateMeetupPageFormField
                                      {...params}
                                      data-test-id="start-date-field"
                                    />
                                  )}
                                />
                                {meta.touched && meta.error ? (
                                  <FieldErrorMessage error={meta.error} />
                                ) : meta.touched ? (
                                  <FieldSuccessMessage />
                                ) : (
                                  <FieldStartMessage
                                    message={t(
                                      "create_meetup_page.start_date_input_start_message"
                                    )}
                                  />
                                )}
                              </>
                            )}
                          </Field>
                        </CreateMeetupPageStartTimeContent>
                        <CreateMeetupPageFinishTimeContent>
                          <CreateMeetupPageLabel>
                            {t("create_meetup_page.finish_date")}
                          </CreateMeetupPageLabel>
                          <Field name="finishDate">
                            {({ field, form, meta }: FieldProps<Date>) => (
                              <>
                                <DateTimePicker
                                  {...field}
                                  onChange={(date) => {
                                    form.setFieldTouched("finishDate", true);
                                    form.setFieldValue("finishDate", date);
                                  }}
                                  renderInput={(params) => (
                                    <CreateMeetupPageFormField
                                      {...params}
                                      data-test-id="finish-date-field"
                                    />
                                  )}
                                />
                                {meta.touched && meta.error ? (
                                  <FieldErrorMessage error={meta.error} />
                                ) : meta.touched ? (
                                  <FieldSuccessMessage />
                                ) : (
                                  <FieldStartMessage
                                    message={t(
                                      "create_meetup_page.finish_date_input_start_message"
                                    )}
                                  />
                                )}
                              </>
                            )}
                          </Field>
                        </CreateMeetupPageFinishTimeContent>
                      </CreateMeetupPageFormTimeBlock>
                      <CreateMeetupPageLabel data-test-id="place-label">
                        {t("create_meetup_page.place")}
                      </CreateMeetupPageLabel>
                      <Field name="place">
                        {({ field, form, meta }: FieldProps<string>) => (
                          <>
                            <CreateMeetupPageFormField
                              multiline
                              {...field}
                              data-test-id="place-field"
                            />
                            {meta.touched && meta.error ? (
                              <FieldErrorMessage error={meta.error} />
                            ) : meta.touched ? (
                              <FieldSuccessMessage />
                            ) : (
                              <FieldStartMessage
                                message={t(
                                  "create_meetup_page.place_input_start_message"
                                )}
                              />
                            )}
                          </>
                        )}
                      </Field>
                      <CreateMeetupPageImageDropBlock>
                        {image === "" ? (
                          <div {...getRootProps()}>
                            <CreateMeetupImageInput {...getInputProps()} />
                            <CreateMeetupPageImageDropMainContentBlock>
                              <DownloadCloud />
                            </CreateMeetupPageImageDropMainContentBlock>
                            <CreateMeetupPageImageDropMainContentBlock>
                              {isDragActive ? (
                                <CreateMeetupPageImageDropMainContent>
                                  {t("drop_image_content.drop_advice")}
                                </CreateMeetupPageImageDropMainContent>
                              ) : (
                                <CreateMeetupPageImageDropMainContent>
                                  {t(
                                    "drop_image_content.drag_download_advice.drag"
                                  )}{" "}
                                  <br />{" "}
                                  {t(
                                    "drop_image_content.drag_download_advice.download"
                                  )}
                                </CreateMeetupPageImageDropMainContent>
                              )}
                            </CreateMeetupPageImageDropMainContentBlock>
                            <CreateMeetupPageImageDropExtraContentBlock>
                              <CreateMeetupPageImageDropExtraContent>
                                {t("drop_image_content.type_advice")}
                              </CreateMeetupPageImageDropExtraContent>
                              <CreateMeetupPageImageDropExtraContent>
                                {t("drop_image_content.size_advice")}
                              </CreateMeetupPageImageDropExtraContent>
                            </CreateMeetupPageImageDropExtraContentBlock>
                          </div>
                        ) : (
                          <CreateMeetupPageImageDropMainContentBlock>
                            <CreateMeetupPagePreviewImageBlock
                              {...getRootProps()}
                            >
                              <CreateMeetupImagePreview
                                src={files}
                                alt="preview"
                              />
                              <CreateMeetupImageInput {...getInputProps()} />
                            </CreateMeetupPagePreviewImageBlock>
                            <CreateMeetupPagePreviewActionBlock>
                              <CreateMeetupPageDeleteImageButton
                                onClick={deleteImage}
                              >
                                {t("drop_image_content.delete_image_button")}
                              </CreateMeetupPageDeleteImageButton>
                            </CreateMeetupPagePreviewActionBlock>
                          </CreateMeetupPageImageDropMainContentBlock>
                        )}
                      </CreateMeetupPageImageDropBlock>
                    </CreateMeetupPageFormBlock>
                  </CreateMeetupPageBlock>
                  <CreateMeetupPageBlock>
                    <CreateMeetupPageGoBackButton
                      onClick={goPreviosPartForm}
                      data-test-id="to-main-fields-button"
                    >
                      {t("create_meetup_page.goBack_button")}
                    </CreateMeetupPageGoBackButton>
                    <CreateMeetupPageSubmitButton
                      type="submit"
                      data-test-id="create-meetup-button"
                    >
                      {t("create_meetup_page.create_meetup_button")}
                    </CreateMeetupPageSubmitButton>
                  </CreateMeetupPageBlock>
                </>
              )}
            </Form>
          )}
        </Formik>
        <Modal open={openModal} onClose={handleClose}>
          <ModalContent errorType={errorType} close={handleClose} />
        </Modal>
      </CreateMeetupContainer>
      <CreateMeetupImage src={backgroundIMG} alt="basic-page-background" />
    </>
  );
});

export default CreateMeetupPage;
