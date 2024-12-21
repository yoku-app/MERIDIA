export interface FormFieldProps<T> {
    value: T;
    onChange: (date: T) => void;
    onBlur?: () => void;
}
