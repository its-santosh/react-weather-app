import Header from "./Header";
import Footer from "./Footer";

const BaseLayout = ({ children, pageType }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen min-w-screen border">
      <Header pageType={pageType} />
        {children}
      <Footer />
    </div>
  );
};
export default BaseLayout;
