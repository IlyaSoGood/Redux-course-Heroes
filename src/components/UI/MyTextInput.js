import { useField } from "formik";
import './myTextInput.scss';

const MyTextInput = ({Component, label, labelClass, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name} className={labelClass}>{label}</label>
            <Component {...props} {...field}/>
            {meta.touched && meta.error 
                ? <div className="error">{meta.error}</div>
                : null}
        </>
    )
}

export default MyTextInput;