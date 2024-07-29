"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

type TTagProps = {
	ele: string;
	className?: string;
	isClickable?: boolean;
};

export const setQuery = (
	params: URLSearchParams,
	elements: { key: string; value: any }[]
) => {
	elements.map((element) => {
		params.set(element.key, element.value);
	});

	return params.toString();
};

export const Tag: React.FC<TTagProps> = ({ ele, className, isClickable }) => {
	const route = useRouter();
	const param = useSearchParams();

	let action = isClickable
		? () => {
				const result = setQuery(new URLSearchParams(param.toString()), [
					{ key: "tag", value: ele },
				]);
				route.push(`/?${result}`);
		  }
		: undefined;

	return (
		<span
			onClick={action}
			className={cn(
				"border border-gray-300 rounded-full text-center text-gray-300 px-3 w-fit h-fit text-sm ",
				className
			)}
		>
			{ele}
		</span>
	);
};
