"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

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
					onClick={() => {}}
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
      <span className="text-xs">
       CTRL
      </span> K
     </kbd>
    )}
  
  
  </div>
	);
};
