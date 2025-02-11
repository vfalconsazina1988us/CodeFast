import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name, extraStyle }) => {
  /*  const { isLoggedIn, name } = props;*/
     

  if (isLoggedIn) {
    return (
      <Link
        href="/dashboard"
        className={`btn btn-primary  ${extraStyle ? extraStyle : ""}`}
      >
         {name}
      </Link>
    );
  } else {
    return <button>Login</button>;
  }
};

export default ButtonLogin;
