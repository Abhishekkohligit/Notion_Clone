"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";

import { toast } from "sonner";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

interface ItemProps {
	id?: Id<"documents">;
	documentIcon?: string;
	active?: boolean;
	expanded?: boolean;
	isSearch?: boolean;
	level?: number;
	onExpand?: () => void;
	label: string;
	onClick: () => void;
	icon: LucideIcon;
}

export const Item = ({
	id,
	label,
	onClick,
	icon: Icon,
	active,
	documentIcon,
	isSearch,
	level = 0,
	onExpand,
	expanded,
}: ItemProps) => {
	const router = useRouter();
	const create = useMutation(api.documents.create);
	const handleExpand = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.stopPropagation();
		onExpand?.();
	};

	const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		if (!id) return;
		const promiseC = create({ title: "Untitled", parentDocument: id }).then(
			(documentId) => {
				if (!expanded) {
					onExpand?.();
				}
				router.push(`/documents/${documentId}`);
			}
		);
		toast.promise(promiseC, {
			loading: "Creating a new Note...",
			success: "New note created!",
			error: "Failed to create a new note.",
		});
	};

	const ChevronIcon = expanded ? ChevronDown : ChevronRight;
	return (
		<div
			onClick={onClick}
			role="button"
			style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
			className={cn(
				"group min-h-[27px] text-sm py-1 pr-3 w-full flex items-center text-muted-foreground font-medium hover:bg-primary/10",
				active && "bg-primary/10 text-primary"
			)}
		>
			{!!id && (
				<div
					role="button"
					className="h-full rounded-sm mr-1 hover:bg-neutral-300 dark:bg-neutral-600"
					onClick={handleExpand}
				>
					<ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground /50" />
				</div>
			)}

			{documentIcon ? (
				<div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
			) : (
				<Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
			)}

			<span className="truncate">{label}</span>
			{isSearch && (
				<kbd className=" ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1 font-mono font-medium text-[10px] text-muted-foreground">
					<span className="text-xs">CTRL</span> K
				</kbd>
			)}

			{!!id && (
				<div className="ml-auto flex items-center gap-x-2">
					<div
						className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
						role="button"
						onClick={onCreate}
					>
						<Plus className="h-4 w-4 text-muted-foreground" />
					</div>
				</div>
			)}
		</div>
	);
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
	return (
		<div
			className=" flex gap-x-2 py-[3px]"
			style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
		>
			<Skeleton className="h-4 w-4" />
			<Skeleton className="h-4 w-[30%]" />
		</div>
	);
};
