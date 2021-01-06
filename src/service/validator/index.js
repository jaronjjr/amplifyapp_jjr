import { forEach } from "lodash";
import isEmpty from "./isEmpty";
import isMobileNumber from "./isMobileNumber";
import { NOT_EMPTY, MOBILE_NUMBER } from "./errorMsgConst";

function runChecks(data, rule, value) {
  if (rule.required && isEmpty(value)) {
    return NOT_EMPTY;
  }
  return "";
}

export default function validator(rules) {
  return function validate(data) {
    const errors = {};

    forEach(data, (value, key) => {
      if (rules[key]) {
        errors[key] = runChecks(data, rules[key], value);
      }
    });

    return errors;
  };
}
