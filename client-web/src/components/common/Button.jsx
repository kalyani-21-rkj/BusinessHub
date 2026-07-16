const Button = ({ children }) => {
  return (
    <button
      className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-700"
    >
      {children}
    </button>
  );
};

export default Button;