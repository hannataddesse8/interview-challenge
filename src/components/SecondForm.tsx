import { Button, TextField } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
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
interface SecondFormProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const SecondForm: React.FC<SecondFormProps> = ({
  formValues,
  setFormValues,
  handleNextStep,
  handlePreviousStep,
}) => {
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password can be at most 16 Char"),
    repeatPassword: Yup.string()
      .required("Repeat Password is required")
      .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  });

  return (
    <>
      <h2 className="text-center font-medium mt-0 m-5 text-xl">
        password screen
      </h2>
      <div className="flex flex-col m-auto w-1/3 justify-center bg-[#817CA5] rounded-2xl">
        <ThemeProvider theme={theme}>
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // Save the form values and proceed to the next step
              setFormValues(values);
              handleNextStep();
            }}
          >
            {({ isValid }) => (
              <Form className="flex flex-col p-5 space-y-2">
                <label htmlFor="password">Password</label>
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  label="Password"
                  className="bg-white/90 rounded-lg"
                />
                <ErrorMessage name="password" component="div" />

                <label htmlFor="repeatPassword">Confirm Password</label>
                <Field
                  as={TextField}
                  type="password"
                  name="repeatPassword"
                  label="Repeat Password"
                  className="bg-white/90 rounded-lg"
                />
                <ErrorMessage name="repeatPassword" component="div" />

                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={!isValid}
                >
                  Next
                </Button>
              </Form>
            )}
          </Formik>
        </ThemeProvider>
      </div>
    </>
  );
};

export default SecondForm;
