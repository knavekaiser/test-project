import { LoginForm, RegisterForm } from "../components/Forms";
import { Switch, Route, Redirect } from "react-router-dom";

const UserStart = () => {
  return (
    <div className="pageContainer">
      <div className="lPad" />
      <Redirect to="/login" />
      <div className="forms">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
        </Switch>
      </div>
      <div className="pageDetail">
        <div className="wrapper">
          <h2>Dummy Heading</h2>
          <p>
            Through our marketplace, employers can hire freelancers to do work
            in areas such as software development, writing, data entry and
            design right through to engineering.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserStart;
