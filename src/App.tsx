import React from "react";
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray
} from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import "./App.css";
import * as yup from "yup";

type MyRadioProps = { label: string } & FieldAttributes<{}>;

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);

  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required()
    .max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});

const App: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Formik
        validateOnChange={true}
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          yogurt: "",
          pets: [{ type: "cat", name: "jarvis", id: Math.random() }]
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log("data", data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => {
          return (
            <Form>
              <div>
                <Field
                  placeholder="first name"
                  name="firstName"
                  type="input"
                  as={TextField}
                />
              </div>
              <div>
                <Field
                  placeholder="last name"
                  name="lastName"
                  type="input"
                  as={TextField}
                />
              </div>
              <Field
                name="isTall"
                type="checkbox"
                value="chocolate chip"
                as={Checkbox}
              />

              <div>cookies:</div>
              <Field
                name="cookies"
                type="checkbox"
                value="chips"
                as={Checkbox}
              />
              <Field
                name="cookies"
                type="checkbox"
                value="ice cream"
                as={Checkbox}
              />
              <Field
                name="cookies"
                type="checkbox"
                value="pizza"
                as={Checkbox}
              />
              <div>
                <div>yogurt:</div>
                <MyRadio
                  name="yogurt"
                  type="radio"
                  value="berry"
                  label="berry"
                />
                <MyRadio
                  name="yogurt"
                  type="radio"
                  value="blackberry"
                  label="blackberry"
                />
                <MyRadio
                  name="yogurt"
                  type="radio"
                  value="apple"
                  label="apple"
                />
              </div>
              <FieldArray name="pets">
                {arrayHelpers => (
                  <div>
                    <Button
                      onClick={() => {
                        arrayHelpers.push({
                          type: "frog",
                          name: "",
                          id: "" + Math.random()
                        });
                      }}
                    >
                      Add pet
                    </Button>
                    {values.pets.map((pet, index) => {
                      return (
                        <div key={pet.id}>
                          <MyTextField
                            placeholder="first name"
                            name={`pets.${index}.name`}
                          />
                          <Field
                            name={`pets.${index}.type`}
                            type="select"
                            as={Select}
                          >
                            <MenuItem value="cat">Cat</MenuItem>
                            <MenuItem value="dog">Dog</MenuItem>
                            <MenuItem value="frog">Frog</MenuItem>
                          </Field>
                          <Button onClick={() => arrayHelpers.remove(index)}>
                            X
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default App;
