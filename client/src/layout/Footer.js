const footerOptions = [
  {
    title: "About us",
    href: "",
  },
  {
    title: "Terms of use",
    href: "",
  },
  {
    title: "Report a bug",
    href: "",
  },
  {
    title: "Help",
    href: "",
  },
];

const Footer = () => {
  return (
    <div
      className="text-sm md:text-md bg-neutral-darkest text-white flex  justify-center h-16 
    items-center border border-t md:divide-x shadow-inner "
    >
      {footerOptions.map((item, idx) => {
        return (
          <a key={idx} className="px-4 hover:underline cursor-pointer">
            {item.title}
          </a>
        );
      })}
    </div>
  );
};

export default Footer;
