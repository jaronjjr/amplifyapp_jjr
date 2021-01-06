export default (value) =>
  value === "" ||
  String(value).trim() === "" ||
  value === undefined ||
  value === null ||
  value === false;
