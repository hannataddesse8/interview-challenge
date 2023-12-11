import { useState } from "react";
import "./App.css";
import FirstForm from "./components/FirstForm";
import SecondForm from "./components/SecondForm";
import SubmitForm from "./components/SubmitForm";
interface FormValues {
  username: string;
  phone: string;
  country: string;
  password: string;
  repeatPassword: string;
  email: string;
  // Add other fields as needed
}

function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    phone: "",
    country: "",
    password: "",
    repeatPassword: "",
    email: "",
    // Add other fields as needed
  });

  const handleNextStep = (): void => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = (): void => {
    setCurrentStep(currentStep - 1);
  };

  // Render the appropriate step based on the current step state
  const renderStep = (): JSX.Element | null => {
    switch (currentStep) {
      case 1:
        return (
          <FirstForm
            formValues={formValues}
            setFormValues={setFormValues}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <SecondForm
            formValues={formValues}
            setFormValues={setFormValues}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 3:
        return (
          <SubmitForm
            formValues={formValues}
            setFormValues={setFormValues}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center content-center h-screen">
      <h2 className="text-center font-medium m-5 text-3xl">Super test Form</h2>
      {renderStep()}
    </div>
  );
}

export default App;
