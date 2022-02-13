import {
  Button,
  CircularProgress,
  Container,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import { MeetupModel } from "../Models/Meetups/meetupModel";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import DefaultMeetupImage from "../images/svg/defaultMeetupImage";
import { MeetupValidationSchema } from "../textCorrection/formValidation";
import Vector from "../images/Vector.jpg";
import ModalContent from "../components/modalContent";
import FieldErrorMessage from "../components/fieldErrorMessage";
import FieldSuccessMessage from "../components/fieldSuccessMessage";
import { observer } from "mobx-react-lite";
import { Context } from "../context/appContext";
import { UserRolesModel } from "../Models/Users/userRolesModel";
import { useTranslation } from "react-i18next";

const EditMeetupPageSpinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  color: ${colorTheme.palette.secondary.main};
`;

const EditMeetupPageContainer = styled(Container)`
  margin-top: 8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const EditMeetupPageHeader = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
  color: ${colorTheme.palette.primary.dark};
`;

const EditMeetupPageBlock = styled(Paper)`
  margin-bottom: 1rem;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0px 4px 7px rgba(215, 221, 232, 0.398055);
  display: flex;
`;

const EditMeetupPageFormBlock = styled.div`
  width: 100%;
  color: ${colorTheme.palette.primary.dark};
  font-size: 1rem;
`;

const EditMeetupPageFormTimeBlock = styled.div`
  display: flex;
`;

const EditMeetupPageStartTimeContent = styled.div`
  width: 48%;
  margin-right: 1rem;
  display: block;
`;

const EditMeetupPageFinishTimeContent = styled.div`
  width: 48%;
  margin-left: 1rem;
  display: block;
`;

const EditMeetupPageLabel = styled(Typography)`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.3rem;
  color: ${colorTheme.palette.primary.light};
  font-size: 0.9rem;
`;

const EditMeetupImageBlock = styled.div`
  position: relative;
`;

const EditMeetupImage = styled.img`
  width: 100%;
`;

const EditMeetupChangeImageButton = styled(Button)`
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

const EditMeetupImageInput = styled.input`
  width: 100%;
  opacity: 0;
`;

const EditMeetupPageFormField = styled(TextField)`
  width: 100%;
  display: flex;
`;

const EditMeetupPageGoBackButton = styled(Button)`
  width: 25%;
  text-transform: none;
  float: left;
  border-radius: 5px;
  color: ${colorTheme.palette.primary.light};
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid #e2e7ef;
`;

const EditMeetupPageSubmitButton = styled(Button)`
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

const EditMeetupPage: FC = observer(() => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [errorType, setErrorType] = useState<string>("");
  const handleClose = () => setOpenModal(false);
  const twoMB = 2 * 1024 * 1024;
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { t } = useTranslation();
  const { userStore, meetupsStore } = useContext(Context);
  const hasEditingRights =
    userStore.user?.id === meetupsStore.choosenByIdMeetup?.author.id ||
    userStore.user?.roles === UserRolesModel.Chief
      ? true
      : false;
  const { id } = useParams();

  useEffect(() => {
    meetupsStore.getMeetupById(id).then((requestResult) => {
      if (requestResult && meetupsStore.choosenByIdMeetup) {
        if (hasEditingRights) {
          if (meetupsStore.choosenByIdMeetup.image) {
            setImage(meetupsStore.choosenByIdMeetup.image);
          }
          setLoading(false);
        } else {
          navigate("/403/error", { replace: true });
        }
      } else {
        navigate("/404/error", { replace: true });
      }
    });
  }, [id, navigate, userStore, meetupsStore, hasEditingRights]);

  if (loading || meetupsStore.choosenByIdMeetup === null) {
    return <EditMeetupPageSpinner />;
  }

  return (
    <EditMeetupPageContainer maxWidth="sm">
      <EditMeetupPageHeader>
        {t("edit_meetup_page.header")}
      </EditMeetupPageHeader>
      <Formik
        initialValues={{
          id: meetupsStore.choosenByIdMeetup.id,
          modified: meetupsStore.choosenByIdMeetup.modified,
          startDate: new Date(meetupsStore.choosenByIdMeetup.start),
          finishDate: new Date(meetupsStore.choosenByIdMeetup.finish),
          authorId: meetupsStore.choosenByIdMeetup.author.id,
          authorData:
            meetupsStore.choosenByIdMeetup.author.name +
            " " +
            meetupsStore.choosenByIdMeetup.author.surname,
          speakers: meetupsStore.choosenByIdMeetup.speakers,
          subject: meetupsStore.choosenByIdMeetup.subject,
          excerpt: meetupsStore.choosenByIdMeetup.excerpt,
          place: meetupsStore.choosenByIdMeetup.place,
          goCount: meetupsStore.choosenByIdMeetup.goCount,
          status: meetupsStore.choosenByIdMeetup.status,
          isOver: meetupsStore.choosenByIdMeetup.isOver,
        }}
        validationSchema={MeetupValidationSchema}
        onSubmit={async (values) => {
          const authorData = {
            id: values.authorId,
            name: values.authorData.split(" ")[0],
            surname: values.authorData.split(" ")[1],
          };
          const requestData: MeetupModel = {
            id: values.id,
            modified: values.modified,
            start: values.startDate.toISOString(),
            finish: values.finishDate.toISOString(),
            author: authorData,
            speakers: values.speakers,
            subject: values.subject,
            excerpt: values.excerpt,
            place: values.place,
            goCount: values.goCount,
            status: values.status,
            isOver: values.isOver,
            image: image,
          };
          const data = await meetupsStore.editMeetup(requestData);
          if (data) {
            navigate("/meetups");
          } else {
            console.log("Something going wrong");
          }
        }}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <EditMeetupPageBlock>
              <EditMeetupPageFormBlock>
                <EditMeetupPageLabel>
                  {t("edit_meetup_page.image")}
                </EditMeetupPageLabel>
                <EditMeetupImageBlock>
                  {image !== "" ? (
                    <EditMeetupImage
                      src={require(`../images/${image}`).default}
                    />
                  ) : (
                    <DefaultMeetupImage />
                  )}
                  <EditMeetupChangeImageButton>
                    <EditMeetupImageInput
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
                  </EditMeetupChangeImageButton>
                </EditMeetupImageBlock>
                <EditMeetupPageLabel>
                  {t("edit_meetup_page.subject")}
                </EditMeetupPageLabel>
                <Field name="subject">
                  {({ field, form, meta }: FieldProps<string>) => (
                    <>
                      <EditMeetupPageFormField
                        multiline
                        {...field}
                        data-test-id="subject-field"
                      />
                      {meta.touched && meta.error ? (
                        <FieldErrorMessage error={meta.error} />
                      ) : (
                        <FieldSuccessMessage />
                      )}
                    </>
                  )}
                </Field>
                <EditMeetupPageFormTimeBlock>
                  <EditMeetupPageStartTimeContent>
                    <EditMeetupPageLabel>
                      {t("edit_meetup_page.start_date")}
                    </EditMeetupPageLabel>
                    <Field name="startDate">
                      {({ field, form, meta }: FieldProps<Date>) => (
                        <>
                          <DateTimePicker
                            disableMaskedInput
                            {...field}
                            onChange={(date) => {
                              form.setFieldTouched("startDate", true);
                              form.setFieldValue("startDate", date);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                data-test-id="start-date-field"
                              />
                            )}
                          />
                          {meta.touched && meta.error ? (
                            <FieldErrorMessage error={meta.error} />
                          ) : (
                            <FieldSuccessMessage />
                          )}
                        </>
                      )}
                    </Field>
                  </EditMeetupPageStartTimeContent>
                  <EditMeetupPageFinishTimeContent>
                    <EditMeetupPageLabel>
                      {t("edit_meetup_page.finish_date")}
                    </EditMeetupPageLabel>
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
                              <TextField
                                {...params}
                                data-test-id="finish-date-field"
                              />
                            )}
                          />
                          {meta.touched && meta.error ? (
                            <FieldErrorMessage error={meta.error} />
                          ) : (
                            <FieldSuccessMessage />
                          )}
                        </>
                      )}
                    </Field>
                  </EditMeetupPageFinishTimeContent>
                </EditMeetupPageFormTimeBlock>
                <EditMeetupPageLabel>
                  {t("edit_meetup_page.place")}
                </EditMeetupPageLabel>
                <Field name="place">
                  {({ field, form, meta }: FieldProps<string>) => (
                    <>
                      <EditMeetupPageFormField
                        multiline
                        {...field}
                        data-test-id="place-field"
                      />
                      {meta.touched && meta.error ? (
                        <FieldErrorMessage error={meta.error} />
                      ) : (
                        <FieldSuccessMessage />
                      )}
                    </>
                  )}
                </Field>
                <EditMeetupPageLabel>
                  {t("edit_meetup_page.speakers")}
                </EditMeetupPageLabel>
                <Field name="authorData">
                  {({ field, form, meta }: FieldProps<string>) => (
                    <>
                      <EditMeetupPageFormField
                        multiline
                        {...field}
                        data-test-id="speakers-field"
                      />
                      {meta.touched && meta.error ? (
                        <FieldErrorMessage error={meta.error} />
                      ) : (
                        <FieldSuccessMessage />
                      )}
                    </>
                  )}
                </Field>
                <EditMeetupPageLabel>
                  {t("edit_meetup_page.excerpt")}
                </EditMeetupPageLabel>
                <Field name="excerpt">
                  {({ field, form, meta }: FieldProps<string>) => (
                    <>
                      <EditMeetupPageFormField
                        multiline
                        {...field}
                        data-test-id="excerpt-field"
                      />
                      {meta.touched && meta.error ? (
                        <FieldErrorMessage error={meta.error} />
                      ) : (
                        <FieldSuccessMessage />
                      )}
                    </>
                  )}
                </Field>
              </EditMeetupPageFormBlock>
            </EditMeetupPageBlock>

            <EditMeetupPageBlock>
              <EditMeetupPageGoBackButton
                onClick={goBack}
                data-test-id="go-previous-page-button"
              >
                {t("edit_meetup_page.goBack_button")}
              </EditMeetupPageGoBackButton>
              <EditMeetupPageSubmitButton
                type="submit"
                disabled={!hasEditingRights}
                data-test-id="edit-meetup-button"
              >
                {t("edit_meetup_page.edit_meetup_button")}
              </EditMeetupPageSubmitButton>
            </EditMeetupPageBlock>
          </Form>
        )}
      </Formik>
      <Modal open={openModal} onClose={handleClose}>
        <ModalContent errorType={errorType} close={handleClose} />
      </Modal>
    </EditMeetupPageContainer>
  );
});

export default EditMeetupPage;
