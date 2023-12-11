import { Button, Select, TextField } from "@mui/material";

import { deepPurple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface Country {
  id: string;
  name: string;
}

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
interface FirstFormProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  handleNextStep: () => void;
}

const FirstForm: React.FC<FirstFormProps> = ({
  formValues,
  setFormValues,
  handleNextStep,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch("https://services.bluekai.com/rest/countries", {
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.log(error));
  }, []);
  console.log(countries);
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Username must be at least 4 Char")
      .max(12, "Username can be at most 12 Char")
      .required("Username is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must only contain digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number can be at most 15 digits")
      .required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
  });
  return (
    <>
      <h2 className="text-center font-medium mt-0 m-5 text-xl">Intial Info</h2>
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
                <label htmlFor="username">User Name</label>
                <Field
                  as={TextField}
                  type="text"
                  name="username"
                  className="bg-white/90 rounded-lg"
                />
                <ErrorMessage name="username" component="div" />

                <label htmlFor="email">Email</label>
                <Field
                  as={TextField}
                  type="email"
                  name="email"
                  label="Email"
                  className="bg-white/90 rounded-lg"
                />
                <ErrorMessage name="email" component="div" />

                <label htmlFor="phone">Phone Number</label>
                <Field
                  as={TextField}
                  type="text"
                  name="phone"
                  label="Phone"
                  className="bg-white/90 rounded-lg"
                />
                <ErrorMessage name="phone" component="div" />

                <label htmlFor="country">Country</label>
                <Field
                  as={Select}
                  name="country"
                  label="Country"
                  className="bg-white/90 rounded-lg"
                >
                  {/* {countries!.map((country, index) => {
                  <MenuItem key={index} value={country.name}>
                    {country.name}
                  </MenuItem>;
                })} */}
                </Field>
                <ErrorMessage name="country" component="div" />

                <Button
                  variant="contained"
                  color="secondary"
                  disabled={!isValid}
                  type="submit"
                >
                  Continue
                </Button>
              </Form>
            )}
          </Formik>
        </ThemeProvider>
      </div>
    </>
  );
};

export default FirstForm;
