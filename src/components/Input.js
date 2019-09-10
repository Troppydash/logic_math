import React from 'react';
import { Formik, Form, Field } from 'formik';

const Input = ({handleSubmit}) => (
    <div className="input-container">
        <Formik
            // input values
            initialValues={{ equation: '' }}
            // Submit Functions
            onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
                setSubmitting(false);
            }}>
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <h3>Equation:</h3>
                        <Field type="equation" name="equation" placeholder="Add an Equation here..."/>
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
);

export default Input;
