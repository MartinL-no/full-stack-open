import { Dispatch } from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { Diagnoses, NewEntry, EntryType, HealthCheckRating } from "../types";
import { useStateValue } from "../state/state";
import { TextField, SelectField, EntryTypeOption, DiagnosisSelection } from "./FormField";

export type EntryFormValues = NewEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  setError: Dispatch<string>;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: EntryType.Hospital, label: "Hospital" },
];

const healthCheckRatingOptions: EntryTypeOption[] = [
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
];

interface allEntryFields {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses['code']>;
  type: EntryType;
  discharge: {
    date: "",
    criteria: ""
  };
  employerName: string;
  sickLeave: {
    startDate: string
    endDate: string
  };
  healthCheckRating: HealthCheckRating;
}

export const AddEntryForm = ({ onSubmit, onCancel, setError }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const initialValues: allEntryFields = {
    type: EntryType.Hospital,
    description: "",
    specialist: "",
    diagnosisCodes: [],
    date: "",
    discharge: {
      date: "",
      criteria: ""
    },
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: ""
    },
    healthCheckRating: HealthCheckRating.Healthy
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: any = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          setError("Description field is required");
          setTimeout(() => setError(""), 5000);
          errors.description = requiredError;
        }
        if (!values.specialist) {
          setError("Specialist field is required");
          setTimeout(() => setError(""), 5000);
          errors.specialist = requiredError;
        }
        if (!values.date) {
          setError("Date field is required");
          setTimeout(() => setError(""), 5000);
          errors.date = requiredError;
        }
        if (!Date.parse(values.date)) {
          setError("Date is incorrect format");
          setTimeout(() => setError(""), 5000);
          errors.date = "Date is incorrect format";
        }
        if (values.type === "OccupationalHealthcare" && !values.employerName) {
          setError("Employer name is required");
          setTimeout(() => setError(""), 5000);
          errors.employerName = requiredError;
        }
        if (values.type === "OccupationalHealthcare" && !values.sickLeave.startDate) {
          setError("Sick leave start date field is required");
          setTimeout(() => setError(""), 5000);
          errors.sickLeave.startDate = requiredError;
        }
        if (values.type === "OccupationalHealthcare" && !Date.parse(values.sickLeave.startDate)) {
          setError("Sick leave start date is incorrect format");
          setTimeout(() => setError(""), 5000);
          errors.sickLeave.startDate = "Date is incorrect format";
        }
        if (values.type === "OccupationalHealthcare" && !values.sickLeave.endDate) {
          setError("Sick leave end date field is required");
          setTimeout(() => setError(""), 5000);
          errors.sickLeave.endDate = requiredError;
        }
        if (values.type === "OccupationalHealthcare" && !Date.parse(values.sickLeave.endDate)) {
          setError("Sick leave end date is incorrect format");
          setTimeout(() => setError(""), 5000);
          errors.sickLeave.endDate = "Date is incorrect format";
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        switch (values.type) {
          case "Hospital":
            return (
              <Form className="form ui">
                <SelectField label="Type" name="type" options={entryTypeOptions} />
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Discharge Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
                <Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ float: "left" }}
                      type="button"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: "right",
                      }}
                      type="submit"
                      variant="contained"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          case "OccupationalHealthcare":
            return (
              <Form className="form ui">
                <SelectField label="Type" name="type" options={entryTypeOptions} />
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave: start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave: end date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
                <Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ float: "left" }}
                      type="button"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: "right",
                      }}
                      type="submit"
                      variant="contained"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
            case "HealthCheck":
              return (
                <Form className="form ui">
                  <SelectField label="Type" name="type" options={entryTypeOptions} />
                  <Field
                    label="Description"
                    placeholder="Description"
                    name="description"
                    component={TextField}
                  />
                  <Field
                    label="Specialist"
                    placeholder="Specialist"
                    name="specialist"
                    component={TextField}
                  />
                  <DiagnosisSelection
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    diagnoses={Object.values(diagnoses)}
                  />
                  <Field
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    name="date"
                    component={TextField}
                  />
                  <SelectField label="Health Check Rating" name="healthCheckRating" options={healthCheckRatingOptions} />

                  <Grid>
                    <Grid item>
                      <Button
                        color="secondary"
                        variant="contained"
                        style={{ float: "left" }}
                        type="button"
                        onClick={onCancel}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        style={{
                          float: "right",
                        }}
                        type="submit"
                        variant="contained"
                        disabled={!dirty || !isValid}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
          default:
            break;
        }
      }}
    </Formik>
  );
};

export default AddEntryForm;
