import Link from "next/link";

const ButtonLogin = (props) => {
  const { isLoggedIn, name } = props;

  if (props.isLoggedIn) {
    return (
      <Link href="/dashboard" className="btn btn-primary">
        Welcome back {props.name}
      </Link>
    );
  } else {
    return <button>Login</button>;
  }
};

export default ButtonLogin;
