const validateRules = values => {
    const errors = {};

    if(!values.name) {
        errors.name = 'This field is required'
    } else if(values.name.length < 2) {
        errors.name = 'Min 2 symbols'
    }

    if(!values.description) {
        errors.description = 'This field is required'
    } else if(values.description.length < 4) {
        errors.description = 'Min 4 symbols'
    }

    if(!values.element) {
        errors.element = 'This field is required'
    }
    return errors;
}

export default validateRules;