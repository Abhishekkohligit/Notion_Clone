"use client";
import { cn } from "@/lib/utils";
import { ChevronsLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, ElementRef, useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { MenuIcon } from "lucide-react";

export const Navigation = () => {
	const isMobile = useMediaQuery("(max-width:768px)");
	const pathname = usePathname();

	const isResizeRef = useRef(false);
	const sidebarRef = useRef<ElementRef<"aside">>(null);
	const navbarRef = useRef<ElementRef<"div">>(null);
	const [isResetting, setIsResetting] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(isMobile);

	useEffect(() => {
		if (isMobile) {
			collapse();
		} else {
			resetWidth();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMobile]);

	useEffect(() => {
		if (isMobile) {
			collapse();
		}
	}, [pathname, isMobile]);

	const handleMouseDown = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.preventDefault();
		event.stopPropagation();

		isResizeRef.current = true;
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (!isResizeRef.current) return;

		let newWidth = event.clientX;

		if (newWidth < 240) newWidth = 240;
		if (newWidth > 480) newWidth = 480;

		if (sidebarRef.current && navbarRef.current) {
			sidebarRef.current.style.width = `${newWidth}px`;
			navbarRef.current.style.setProperty("left", `${newWidth}px`);
			navbarRef.current.style.setProperty(
				"width",
				`calc(100% - ${newWidth}px)`
			);
		}
	};
	const handleMouseUp = () => {
		isResizeRef.current = false;
		document.removeEventListener("mouseup", handleMouseUp);
		document.removeEventListener("mousemove", handleMouseMove);
	};

	const resetWidth = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(false);
			setIsResetting(true);

			sidebarRef.current.style.width = isMobile ? "100%" : "240px";
			navbarRef.current.style.setProperty(
				"width",
				isMobile ? "0" : "calc(100%-240px)"
			);

			navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
		}

		setTimeout(() => setIsResetting(false), 300);
	};

	const collapse = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(true);
			setIsResetting(true);

			sidebarRef.current.style.width = "0";
			navbarRef.current.style.setProperty("width", "100%");
			navbarRef.current.style.setProperty("left", "0");
			setTimeout(() => setIsResetting(false), 300);
		}
	};

	// console.log(isCollapsed);
	// console.log(isMobile);
	console.log(navbarRef, "navbarRef");
	console.log(sidebarRef, "sidebarref");

	return (
		<div className="flex relative">
			<aside
				className={cn(
					"group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
					isResetting && "transition-all ease-in-out duration-300",
					isMobile && "w-0"
				)}
				ref={sidebarRef}
			>
				<div
					role="button"
					onClick={collapse}
					className={cn(
						"h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
						isMobile && "opacity-100"
					)}
				>
					<ChevronsLeft className="h-6 w-6" />
				</div>

				<div>
					<p>Action items</p>
				</div>
				<div className="mt-4">
					<p>Documents</p>
				</div>

				<div
					onMouseDown={handleMouseDown}
					onClick={resetWidth}
					className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 top-0 right-0"
				/>
			</aside>

			<div
				ref={navbarRef}
				className={cn(
					"absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
					isResetting && "transition-all ease-in-out duration-300",
					isMobile && "left-2 w-full"
				)}
			>
				<nav className="bg-transparent w-full">
					{isCollapsed && (
						<MenuIcon
							onClick={resetWidth}
							className="h-6 w-6 text-muted-foreground bg-yellow-500"
							role="button"
						/>
					)}
				</nav>
			</div>
		</div>
	);
};
