const SmallScreen = ({ text }: { text: string }) => {
  return (
    <div className="bg-slate-900 text-center text-white p-10 w-full ">
      <h2 className="text-xl font-bold">Your screen size is too small</h2>
      <p>{text}</p>
    </div>
  );
};

export default SmallScreen;
