import React from 'react';
import { Form } from 'react-bootstrap';

// quick and dirty upgrade from react-bootstrap 0 to react-bootstrap 1
export default ({ validationState: feedbackType, children, ...other }) =>
{
    const fixedFeedback = children || <span>&nbsp;</span>;

    if (feedbackType === 'valid' || feedbackType === 'invalid')
    {
        return (
            <Form.Control.Feedback type={feedbackType} {...other}>
                {fixedFeedback}
            </Form.Control.Feedback>
        );
    }

    let className = 'text-muted';
    if (feedbackType === 'warning') { className = 'text-warning'; }
    if (feedbackType === 'error') { className = 'text-danger'; }

    return (
        <Form.Text className={className} {...other}>
            {fixedFeedback}
        </Form.Text>
    );
};