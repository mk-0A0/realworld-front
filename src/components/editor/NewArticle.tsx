"use client";

import { useState } from "react";

import { z } from "zod";
import axios from "axios";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
	Form,
	FormItem,
	FormField,
	FormControl,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TError } from "@/app/api/(auth)/login/interfaces/error";
import { FormattedErrors } from "@/components/error/FormattedErrors";

const formSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	body: z.string().min(1),
	tagList: z.string().optional(),
});

type TStateProp = {
	loading: boolean;
	isError: boolean;
	errors: {
		[key: string]: string[];
	};
	tagList: string[];
};

type TEditorProps = {
	token: string;
};

export const NewArticle: React.FC<TEditorProps> = ({ token }) => {
	const [state, setState] = useState<TStateProp>({
		loading: false,
		isError: false,
		errors: {},
		tagList: [],
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			body: "",
			tagList: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setState((prevState) => ({ ...prevState, loading: true }));
		await axios
			.post("/api/articles", {
				...values,
				tagList: state.tagList,
				token,
			})
			.then((res) => {
				if (res.data.status === 201) {
					const { article } = res.data.data;
					setState((prevState) => ({ ...prevState, loading: false }));
					window.location.assign(`/article/${article.slug}`);
				} else {
					setState((prevState) => ({
						...prevState,
						loading: false,
						isError: true,
						errors: res.data.data,
					}));
				}
			})
			.catch((err) => {
				console.log("From Editor page", err);
				const errors: TError = {
					"": [err.response.statusText],
				};
				setState((prevState) => ({
					...prevState,
					loading: false,
					isError: true,
					errors,
				}));
			});
	}

	return (
		<>
			{state.isError && (
				<FormattedErrors data={state.errors} className="ml-5" />
			)}

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="title"
						disabled={state.loading}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Article Title"
										{...field}
										className="py-3 px-6 text-xl rounded-s-md text-gray-400 placeholder:text-gray-400  focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-blue-custom"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						disabled={state.loading}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="What's this article about?"
										{...field}
										className="py-3 px-6 text-xl rounded-s-md text-gray-400 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-blue-custom"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="body"
						disabled={state.loading}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										placeholder="Write your article(in markdown)"
										{...field}
										className="py-3 px-6 h-52 text-xl rounded-s-md text-gray-400 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-blue-custom"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tagList"
						disabled={state.loading}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										placeholder="Enter tags"
										{...field}
										onKeyUp={(e) => {
											if (e.key === "Enter") {
												state.tagList.push(
													field.value?.trim() as string
												);
												form.reset({
													title: form.getValues(
														"title"
													),
													description:
														form.getValues(
															"description"
														),
													body: form.getValues(
														"body"
													),
													tagList: "",
												});
											}
										}}
										className="px-6 py-1 min-h-5 h-10 overflow-hidden resize-none text-xl rounded-s-md text-gray-400 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-blue-custom"
									/>
								</FormControl>
								<FormMessage />
								<FormDescription>
									hint: after each tag press enter key
								</FormDescription>
							</FormItem>
						)}
					/>
					<div className="flex">
						{state.tagList.map((ele, index) => (
							<span
								className="bg-gray-400 p-2 mr-1 rounded-full flex w-fit h-fit gap-1 justify-center items-center"
								key={index}
							>
								<X
									height={13}
									width={13}
									className="cursor-pointer"
									onClick={() => {
										setState((prevState) => ({
											...prevState,
											tagList: state.tagList.filter(
												(e) => e !== ele
											),
										}));
									}}
								/>
								{ele}
							</span>
						))}
					</div>
					<div className="flex justify-end">
						<Button
							type="submit"
							disabled={state.loading}
							className="bg-green-custom opacity-85 py-3 px-5 rounded-md  text-xl hover:bg-green-custom hover:opacity-100"
						>
							Publish Article
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};