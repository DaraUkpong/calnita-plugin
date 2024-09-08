import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';
import { OnboardingInitValues } from './FormikSchemas';
import { CustomCheckboxInput, CustomSwitchInput } from './customInputs';
import Link from 'next/link';

interface OnboardingFormProps {
  onSubmit: (data: any) => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  return (
    <Formik
      initialValues={OnboardingInitValues}
      onSubmit={async (values,  { setSubmitting }) => {
       
        console.log(values);
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col h-full justify-end gap-8">
          {currentStep === 0 && (
            <>
              <h1 className="text-4xl font-[500]">💖 Tell Us About Your Beauty Needs</h1>
              <div className="flex flex-col w-full items-start h-1/2">
                <CustomCheckboxInput
                  placeholder={"Select category"}
                  name={"productPreferences.preferredCategory"}
                  label={"Select Your Preferred Category"}
                  options={["Skincare", "Cosmetics", "Fragrance", "Haircare"]}
                  multiple={true}
                  parentStyle={"flex flex-col gap-4 justify-start"}
                />
                <Link
                  href="https://google.com"
                  target="_blank"
                  className="w-full text-right text-gray-400 text-xs font-light underline underline-offset-2"
                >
                  How do I know my skin type?
                </Link>
              </div>

              <motion.button
                type="button"
                className=" text-base px-6 py-6 h-[15%] flex flex-col items-center justify-center bg-black w-1/2 text-white rounded-xl cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextStep}
              >
                Next
              </motion.button>
            </>
          )}

          {currentStep === 1 && (
            <>
              <CustomSwitchInput
                values={values.productPreferences.preferredCategory}
              />
              {/* <motion.button
                type="submit"
                className="p-2 bg-black w-fit text-white rounded cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                Submit
              </motion.button> */}
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default OnboardingForm;