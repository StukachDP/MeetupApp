import * as Yup from "yup";

const nowTime = new Date();
const maxFutureTime = new Date();
maxFutureTime.setFullYear(maxFutureTime.getFullYear() + 1);

export const MeetupValidationSchema = Yup.object().shape({
  subject: Yup.string().required(
    "edit_meetup_page.subject_input_error_message"
  ),
  startDate: Yup.date()
    .min(nowTime, "edit_meetup_page.date_input_error_message.start")
    .max(maxFutureTime, "edit_meetup_page.date_input_error_message.finish")
    .typeError("edit_meetup_page.date_input_error_message.format"),
  finishDate: Yup.date()
    .min(nowTime, "edit_meetup_page.date_input_error_message.start")
    .max(maxFutureTime, "edit_meetup_page.date_input_error_message.finish")
    .typeError("edit_meetup_page.date_input_error_message.format"),
  place: Yup.string(),
  authorData: Yup.string()
    .matches(
      /( )/,
      "edit_meetup_page.author_input_error_message.two_words_mistake"
    )
    .trim()
    .required("edit_meetup_page.author_input_error_message.required"),
  excerpt: Yup.string().required(
    "edit_meetup_page.excerpt_input_error_message"
  ),
});

export const NewsValidationSchema = Yup.object().shape({
  title: Yup.string().required("edit_news_page.title_input_error_message"),
  text: Yup.string().required("edit_news_page.text_input_error_message"),
});
