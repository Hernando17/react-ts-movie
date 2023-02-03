import { Fragment } from "react";
import { TopBar } from "../../components";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children, title }) {
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <TopBar />
        {children}
      </HelmetProvider>
    </Fragment>
  );
}
