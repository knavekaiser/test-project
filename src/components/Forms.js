import { useState } from "react";
import { Input, PasswordInput, Combobox } from "./FormElements";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <form className="login">
      <h1>Let's log in to your account</h1>
      <p className="redirect" role="redirect">
        New here? <Link to="/register">Register</Link>
      </p>
      <Input
        label="Email"
        autoComplete="off"
        defaultValue={email}
        required={true}
        pattern={
          new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
          )
        }
        required={true}
        validation="Enter a valid Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        label="Password"
        required={true}
        defaultValue={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button type="submit" disabled={!email || !pass} className="fill">
        Log in
      </button>
    </form>
  );
};

export const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [pass, setPass] = useState("");
  const [company, setCompany] = useState("");
  const [bzEmail, setBzEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setContry] = useState("");
  const [zip, setZip] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      alert("Form Submitted");
    }
  };
  return (
    <form className="login" onSubmit={submit}>
      <div className="steps">
        Step {step} of 3{" "}
        <div className="dots">
          <span className={`dot ${step === 1 ? "active" : ""} `} />
          <span className={`dot ${step === 2 ? "active" : ""} `} />
          <span className={`dot ${step === 3 ? "active" : ""} `} />
        </div>
      </div>
      <h1>Let's setup your account</h1>
      {step > 1 && (
        <button
          className="clear back"
          type="button"
          onClick={() => setStep((prev) => prev - 1)}
        >
          <HiOutlineArrowNarrowLeft /> Back
        </button>
      )}
      {step === 1 && (
        <>
          <p className="redirect" role="redirect">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          <Input
            name="name"
            label="Your name"
            defaultValue={name}
            pattern={new RegExp(/^[a-z ,.'-]+$/i)}
            required={true}
            validation="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="email"
            label="Email"
            defaultValue={email}
            pattern={
              new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
              )
            }
            required={true}
            validation="Please enter a valid email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Combobox
            name="role"
            placeholder="I would describe my user type as"
            required={true}
            validation="Choose your role"
            defaultValue={role}
            options={[
              { label: "Developer", value: "developer" },
              { label: "Engineer", value: "engineer" },
              { label: "Marketing Manager", value: "marketingManager" },
            ]}
            onChange={(option) => setRole(option.value)}
          />
          <PasswordInput
            name="password"
            label="Password"
            autoComplete="new-password"
            defaultValue={pass}
            required={true}
            pattern={new RegExp(/^.{8,32}$/)}
            onChange={(e) => setPass(e.target.value)}
            validation="Enter a password 8-32 character long"
            tip={
              (pass.length < 8 && "Minimum 8 Character") ||
              (pass.length > 32 && "Maximum 32 Character")
            }
          />
        </>
      )}
      {step === 2 && (
        <>
          <Input
            name="company"
            label="Company"
            defaultValue={company}
            pattern={new RegExp(/^[a-z ,.'-]+$/i)}
            required={true}
            validation="Enter your Company's name"
            onChange={(e) => setCompany(e.target.value)}
          />
          <Input
            name="companyEmail"
            label="Business Email"
            defaultValue={bzEmail}
            pattern={
              new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
              )
            }
            required={true}
            validation="Please enter a valid email address"
            onChange={(e) => setBzEmail(e.target.value)}
          />
        </>
      )}
      {step === 3 && (
        <>
          <Input
            name="address"
            label="Address"
            defaultValue={address}
            pattern={new RegExp(/^[a-z 0-9,.'-]+$/i)}
            required={true}
            validation="Enter your address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            name="city"
            label="City"
            defaultValue={city}
            pattern={new RegExp(/^[a-z ,.'-]+$/i)}
            required={true}
            validation="Enter your city"
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            name="state"
            label="State"
            defaultValue={state}
            pattern={new RegExp(/^[a-z ,.'-]+$/i)}
            required={true}
            validation="Enter your State"
            onChange={(e) => setState(e.target.value)}
          />
          <Input
            name="country"
            label="country"
            defaultValue={country}
            pattern={new RegExp(/^[a-z ,.'-]+$/i)}
            required={true}
            validation="Enter your Country"
            onChange={(e) => setContry(e.target.value)}
          />
        </>
      )}
      <button className="fill" type="submit">
        {step === 3 ? "Register" : "Next"}
      </button>
      <p className="terms">
        By clicking the "Next" button, you agree to creating a free account, and
        to <Link to="#">Terms of Service</Link> and{" "}
        <Link to="#">Privacy Policy</Link>{" "}
      </p>
    </form>
  );
};
