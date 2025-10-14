import { ThemeProvider } from "../../components/ui/theme";
import { Manrope } from "next/font/google";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const manrope = Manrope({
  subsets: ["latin"],
});
const layout = ({ children }: Props) => {
  return (
    <div className="container m-auto flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
};

export default layout;
