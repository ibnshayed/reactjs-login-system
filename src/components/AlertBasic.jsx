import { Alert, AlertTitle } from "@material-ui/core";

const AlertBasic = (props) => {

	const { type, title, children } = props;

  return (
    <Alert severity={type}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
};

export default AlertBasic;
