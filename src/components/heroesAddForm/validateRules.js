const validateRules = values => {
    const errors = {};

    if(!values.name) {
        errors.name = 'This field is required'
    } else if(values.name.length < 2) {
        errors.name = 'Min 2 symbols'
    }

    if(!values.text) {
        errors.text = 'This field is required'
    } else if(values.text.length < 4) {
        errors.text = 'Min 4 symbols'
    }

    if(!values.element) {
        errors.element = 'This field is required'
    }
    return errors;
}

export default validateRules;