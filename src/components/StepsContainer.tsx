import React, { Children, ReactNode } from "react";

interface StepsContainerProps {
  title?: string;
  children: ReactNode;
}

export default function StepsContainer({
  title,
  children,
}: StepsContainerProps) {
  return (
    <div className="flex flex-col gap-3 bg-white w-full z-10 p-3 rounded-lg sm:w-full md:w-[70%] lg:w-[40%] xl:w-[25%]">
      {title && (
        <h2 className="font-bold text-md text-gray-600 mb-3 uppercase">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
