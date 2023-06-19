import { useField } from "formik";

const MySelect = ({options, defaultOption, label, labelClass, onChange, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name} className={labelClass}>{label}</label>
            <select
                {...props}
                onChange={(e) => {
                    field.onChange(e)
                    // onChange(e.target.value)
                }}
                name={field.name}
                onBlur={field.onBlur}
                value={field.value}
            >
                    <option disabled value="">{defaultOption}</option>
                    {options ? options.map(option => 
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ) : null}
            </select>


            {meta.touched && meta.error 
                ? <div className="error">{meta.error}</div>
                : null}
        </>

    );
};

export default MySelect;