import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      {children}
    </div>
  );
}