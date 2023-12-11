import { Button } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Form, Formik } from "formik";
import React, { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";

const theme = createTheme({
  palette: {
    primary: { main: deepPurple[300] },
    secondary: { main: "#fff" },
  },
});

interface FormValues {
  username: string;
  phone: string;
  country: string;
  password: string;
  repeatPassword: string;
  email: string;
  // Add other fields as needed
}
interface SubmitFormProps {
  formValues: FormValues;
  setFormValues: Dispatch<SetStateAction<FormValues>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const SubmitForm: React.FC<SubmitFormProps> = ({
  formValues,
  handlePreviousStep,
}) => {
  const validationSchema = Yup.object({});

  return (
    <>
      <h2 className="text-center font-medium mt-0 m-5 text-xl">Review</h2>
      <div className="flex flex-col m-auto w-1/3 justify-center bg-[#817CA5] rounded-2xl">
        <div className="flex flex-col p-5 space-y-2">
          <p className="flex flex-row justify-between text-white/40">
            Username <span className="text-white">{formValues.username}</span>
          </p>
          <p className="flex flex-row justify-between text-white/40">
            Phone <span className="text-white">{formValues.phone}</span>
          </p>
          <p className="flex flex-row justify-between text-white/40">
            Country <span className="text-white">{formValues.country}</span>
          </p>
        </div>
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Perform any necessary actions with the form values
            // ...
            // Proceed to the next step or finish the form submission
            // ...
          }}
        >
          <Form className="flex flex-col p-5 space-y-2">
            <ThemeProvider theme={theme}>
              <Button variant="contained" color="secondary" type="submit">
                Complete
              </Button>
            </ThemeProvider>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default SubmitForm;
