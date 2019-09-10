import React from 'react';
import { Formik, Form, Field } from 'formik';

const Input = ({handleSubmit}) => (
    <div className="input-container">
        <Formik
            // input values
            initialValues={{ amount: 0, equation: '' }}
            // Submit Functions
            onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
                setSubmitting(false);
            }}>
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <h5>Number of Variables:</h5>
                        <Field type="amount" name="amount" placeholder=""/>
                    </div>
                    <div>
                        <h5>Equation:</h5>
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
