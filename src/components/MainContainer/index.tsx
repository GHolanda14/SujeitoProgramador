import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  classe?: string;
};

export default function MainContainer({ children, classe }: Props) {
  return (
    <main
      className={`flex min-h-[calc(100vh-6em)] py-0 px-7 my-0 mx-auto max-w-6xl flex-col items-center ${
        classe ? classe : ""
      }`}
    >
      {children}
    </main>
  );
}
