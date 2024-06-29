import type { Metadata } from "next";

import "./globals.css";
import NavBar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { sourceSansPro } from "@/lib/font-loader";

export const metadata: Metadata = {
	title: {
		default: "Conduit",
		template: "%s — Conduit",
	},
	description:
		"Conduit is realworld social blogging site. it uses a custom API for all requests, including authentication.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<div
					className={`${sourceSansPro.className} text-[1rem] text-black-custom leading-6 bg-white min-h-screen flex flex-col gap-2`}
				>
					<header>
						<NavBar />
					</header>
					<main>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
