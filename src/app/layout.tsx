import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { auth } from "/auth";

export const metadata: Metadata = {
  title: "Food Request Form",
  description: "Lateplate Portal - Kappa Sigma, Gamma Gamma",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`antialiased p-6 overflow-hidden`}>
        <Providers>
          <div>
            {(session != null && session.user != undefined) ? <div>Logged in as <b>{session.user.name}</b></div> : <><div>Currently not logged in. Use the <i>Sign In</i> button to login</div><b>Login with your <i>@mines.edu</i> Google Account</b></>}
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
