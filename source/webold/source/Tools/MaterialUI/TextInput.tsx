
/**
 * Text input component
 * 
 * @returns
 */
export default function ({ value, onChange, issue, ...props }: Props) {

    return <input {...props} value={value} onChange={event => onChange(event.target.value)} />
}

/**
 * Props
 * 
 */
interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
    value: string
    issue?: boolean
    onChange: (value: string) => unknown
}