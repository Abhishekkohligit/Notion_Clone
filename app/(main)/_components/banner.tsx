"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
	documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
	const router = useRouter();

	const restore = useMutation(api.documents.restore);
	const remove = useMutation(api.documents.remove);

	const onRemove = () => {
		const promise = remove({ id: documentId });
		toast.promise(promise, {
			loading: "Deleting note ...",
			success: "Note Deleted!",
			error: "Failed to delete note.",
		});

		router.push("/documents");
	};

	const onRestore = () => {
		const promise = restore({ id: documentId });
		toast.promise(promise, {
			loading: "Restoring note ...",
			success: "Note Restored!",
			error: "Failed to restore note.",
		});
	};

	// return statment marker
	return (
		<div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center justify-center gap-x-2">
			<p>This page is in the Trash!</p>
			<Button
				variant="outline"
				size="sm"
				onClick={onRestore}
				className="bg-transparent border-white hover:bg-primary/10 text-white hover:text-white p-1 px-2 h-auto font-normal"
			>
				Restore page
			</Button>

			<ConfirmModal onConfirm={onRemove}>
				<Button
					variant="outline"
					size="sm"
					className="bg-transparent border-white hover:bg-primary/10 text-white hover:text-white p-1 px-2 h-auto font-normal"
				>
					Delete Forever!
				</Button>
			</ConfirmModal>
		</div>
	);
};
