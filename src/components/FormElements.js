import {
  useState,
  useRef,
  useLayoutEffect,
  forwardRef,
  useEffect,
  useCallback,
} from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { IoChevronDownSharp } from "react-icons/io5";

export const Input = forwardRef(
  (
    {
      className,
      defaultValue,
      pattern,
      tip,
      label,
      validation,
      required,
      onChange,
      children,
      ...rest
    },
    ref
  ) => {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState(defaultValue || "");
    const [patt, setPatt] = useState(
      !pattern?.test(defaultValue) ? pattern?.toString() : null
    );
    const [err, setErr] = useState(() => {
      return (
        (defaultValue && required && !pattern?.test(defaultValue)) || false
      );
    });
    return (
      <section
        className={`input ${focus ? "focus" : ""} ${err ? "err" : ""} ${
          className || ""
        }`}
      >
        <div className={`inputWrapper`}>
          <label className={value || focus ? "small" : ""}>
            {label} {required && "*"}
          </label>
          <input
            ref={ref}
            value={value}
            onFocus={() => setFocus(true)}
            onBlur={() => {
              setFocus(false);
              if (pattern && !pattern?.test(value)) {
                setErr(true);
                setPatt(pattern?.toString());
              } else {
                setPatt(null);
              }
            }}
            onChange={(e) => {
              setValue(e.target.value);
              if (err) {
                if (!pattern?.test(e.target.value)) {
                  setErr(true);
                } else {
                  setErr(false);
                }
              }
              if (pattern?.test(e.target.value)) {
                setPatt(null);
              }
              onChange?.(e);
            }}
            onInvalid={(e) => {
              e.preventDefault();
              setErr(true);
            }}
            pattern={patt}
            required={required}
            {...rest}
          />
          {children}
        </div>
        {err && <p className="validationMsg">{validation}</p>}
        {!err && tip && <p className="tip">{tip}</p>}
      </section>
    );
  }
);
export const PasswordInput = ({
  label,
  placeholder,
  onChange,
  defaultValue,
  validation,
  children,
  name,
  pattern,
  autoComplete,
  className,
  match,
  tip,
}) => {
  const inputRef = useRef();
  const [type, setType] = useState("password");
  const [value, setValue] = useState("");
  function change(target) {
    setValue(target.value);
    onChange && onChange(target);
  }
  return (
    <Input
      ref={inputRef}
      defaultValue={defaultValue}
      pattern={pattern || (match ? new RegExp(`^${match}$`) : null)}
      type={type}
      required={true}
      label={label}
      className="password"
      onChange={change}
      placeholder={placeholder}
      validation={match ? "Password did not match" : validation}
      name={name}
      autoComplete={autoComplete}
      tip={tip}
    >
      {name === "confirmedPassword" && value && (
        <span className={`passwordConfirm ${match === value ? "match" : ""}`} />
      )}
      <button
        type="button"
        onClick={() => {
          setType((prev) => (prev === "password" ? "text" : "password"));
          inputRef.current?.focus();
        }}
        className="eye clear midY"
      >
        {type === "text" ? <HiEyeOff /> : <HiEye />}
      </button>
      {children}
    </Input>
  );
};

export const Combobox = ({
  options,
  defaultValue,
  onChange,
  maxHeight,
  required,
  disabled,
  validation,
  className,
  placeholder,
  tip,
}) => {
  const [value, setValue] = useState(() => {
    if (defaultValue > -1 && options[defaultValue]) {
      return options[defaultValue].label;
    } else if (options.find((item) => item.value === defaultValue)) {
      return options.find((item) => item.value === defaultValue).label;
    } else if (typeof defaultValue === "object") {
      return defaultValue.label;
    } else {
      return "";
    }
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [optionsStyle, setOptionsStyle] = useState({});
  const [err, setErr] = useState(false);
  const input = useRef();
  const section = useRef();
  const clickHandler = useCallback(
    (e) => {
      if (!e.path.includes(section.current)) {
        if (required && !value && open) {
          setErr(true);
        }
        setOpen(false);
      }
    },
    [value, open]
  );
  useLayoutEffect(() => {
    const { width, height, x, y } = section.current.getBoundingClientRect();
    setOptionsStyle({
      position: "absolute",
      left: x,
      top: y + height,
      width: width,
      height: 37 * options.length,
      maxHeight: window.innerHeight - (y + height) - 16,
    });
  }, [open]);
  useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);
  return (
    <section
      className={`combobox ${open ? "open" : ""} ${err ? "err" : ""}`}
      ref={section}
      onClick={() => setOpen(!open)}
    >
      <div className="wrapper">
        {placeholder && !value && <label className="midY">{placeholder}</label>}
        <input
          ref={input}
          required={required}
          value={value}
          onFocus={(e) => e.target.blur()}
          onChange={() => {}}
          onInvalid={(e) => {
            e.preventDefault();
            setErr(true);
          }}
        />
        <button type="button" className="midY clear">
          <IoChevronDownSharp />
        </button>
        <ul
          style={{
            width: "100%",
            maxHeight: open ? maxHeight : 0,
            zIndex: 100,
          }}
          className={"options"}
        >
          {options.map((option) => (
            <li
              key={option.label}
              onClick={(e) => {
                setData(option.value);
                setValue(option.label);
                onChange && onChange(option);
                setOpen(false);
                setErr(false);
              }}
              className={`${"option"} ${
                value === option.label ? "selected" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
      {err && <p className="validationMsg">{validation}</p>}
      {!err && tip && <p className="tip">{tip}</p>}
    </section>
  );
};
