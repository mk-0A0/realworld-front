import { Metadata } from "next";

import { Header } from "@/components/home/Header";
import { TagList } from "@/components/home/TagList";
import { ArticleList } from "@/components/home/ArticleList";
import { ArticleHeader } from "@/components/home/ArticleHeader";

export const metadata: Metadata = {
	title: "Home — Conduit",
	description:
		"Conduit is realworld social blogging site. it uses a custom API for all requests, including authentication. home page of conduit",
};

export default function Home() {
	return (
		<main>
			<Header />
			<div className="flex min-w-full py-2 px-4 md:px-10 lg:px-14">
				<div className="flex-1">
					<ArticleHeader />
					<ArticleList />
				</div>
				<TagList />
			</div>
		</main>
	);
}
