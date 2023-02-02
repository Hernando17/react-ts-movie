import { Fragment } from "react";
import { TopBar } from "../../components";

export default function Layout({ children }) {
  return (
    <Fragment>
      <TopBar />
      {children}
    </Fragment>
  );
}
