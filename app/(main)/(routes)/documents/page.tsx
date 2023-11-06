"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";

const DocumentPage = () => {
	const { user } = useUser();
	const create = useMutation(api.documents.create);
	const onCreate = () => {
		const promiseC = create({ title: "Untitled" });
		toast.promise(promiseC, {
			loading: "Creating a new note...",
			success: "new note created!",
			error: "Failed to crreate a new note.",
		});
	};
	return (
		<div className="h-full flex flex-col items-center justify-center space-y-4">
			<Image
				src="/empty.png"
				alt="empty"
				height="300"
				width="300"
				className="dark:hidden"
			/>

			<Image
				src="/empty-dark.png"
				alt="empty"
				height="300"
				width="300"
				className="hidden dark:block"
			/>
			<h2 className="font-semibold">
				Welcome to <span className="capitalize">{user?.firstName}&apos;s</span>
				J(N)otion
			</h2>
			<Button onClick={onCreate}>
				<PlusCircle className="h-4 w-4 mr-2" />
				Create a Note
			</Button>
		</div>
	);
};

export default DocumentPage;
