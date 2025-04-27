import React from "react";

const Notfound: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 mt-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl">404</h1>
          <p className="text-xl p-2 max-w-[70%]">Seite nicht gefunden.</p>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
