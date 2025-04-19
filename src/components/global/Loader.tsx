const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-3xl p-6">
      <div className="flex space-x-2">
        <div className="w-3.5 h-3.5 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-3.5 h-3.5 bg-blue-500 rounded-full animate-pulse delay-150"></div>
        <div className="w-3.5 h-3.5 bg-blue-500 rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
  );
};

export default Loader;
