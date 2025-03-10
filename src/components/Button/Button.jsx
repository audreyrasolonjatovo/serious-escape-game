import clsx from "clsx";

const Button = ({ variant = "primary", size = "md", children, ...props }) => {
  const baseStyles =
    "font-medium rounded-lg transition duration-200 focus:outline-none hover:cursor-pointer";

  const variantStyles = {
    primary: "bg-customBlue text-white hover:bg-customBlueLight",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-600 text-gray-600 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size])}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
