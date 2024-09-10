export const Columns = ({ isStackedOnMobile = false, children }) => {
  return (
    <div className="bg-slate-800 py-10">
      <div className={`max-w-7xl mx-auto ${isStackedOnMobile ? 'block md:flex' : 'flex'} gap-4`}>
        {children}
      </div>
    </div>
  );
};
