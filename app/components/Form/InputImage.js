export const InputImage = (props) => {
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
    placeholder
  } = props;
  const id =
    "check " + label
      ? label + (Math.random() + Math.random()).toString()
      : "field" + (Math.random() + Math.random()).toString();
  return (
    <div className={`gx-flex gx-flex-column gx-w-100`}>
      {label && (
        <label
          className="gx-fs-xs gx-mb-2"
          htmlFor={id}
        >
          {label} {required && <span className="text-red-200-color">*</span>}
        </label>
      )}

      <input
        className={`ant-input ${className}`}
        id={id}
        type="file"
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
