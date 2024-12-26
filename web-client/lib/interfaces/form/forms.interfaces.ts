export interface FormFieldProps<T> {
    value: T;
    onChange: (value: T) => void;
    onBlur?: () => void;
}
