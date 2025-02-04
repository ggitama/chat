export const Input = (props) => {
  const {
    label,
    value,
    disabled,
    required,
    className,
    onChange,
    action,
    ref,
    error,
    placeholder,
    hidden,
    type
  } = props;
  const id =
    "check " + label
      ? label + (Math.random() + Math.random()).toString()
      : "field" + (Math.random() + Math.random()).toString();
    const hiddenInput = hidden ? "hidden" : "input"
    const typeInput = type || hiddenInput

  return (
    <div className={`gx-flex gx-flex-column gx-w-100`}>
      {label && (
        <label
          className="gx-fs-m gx-mb-2"
          htmlFor={id}
        >
          {label} {required && <span className="text-red-200-color">*</span>}
        </label>
      )}

      <input
        className={`ant-input ${className}`}
        id={id}
        type={typeInput}
        disabled={disabled}
        value={value}
        onChange={onChange}
        action={action}
        placeholder={placeholder ? placeholder : ""}
      />
      <div className="gx-fs-xs text-red-200-color gx-mt-1">
        {error && label + " " + error}
      </div>
    </div>
  );
};
