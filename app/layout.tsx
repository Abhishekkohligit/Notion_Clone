import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ModalProvider } from "@/components/providers/model-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "J(N)otion",
	description: "The connected workspace where better, faster work happens.",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme:dark)",
				url: "/logo-dark.svg",
				href: "/logo-dark.svg",
			},
			{
				media: "(prefers-color-scheme:light)",
				url: "/logo.svg",
				href: "/logo.svg",
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ConvexClientProvider>
					<EdgeStoreProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
							storageKey="jotion-theme"
						>
							<Toaster position="top-center" />
							<ModalProvider />
							{children}
						</ThemeProvider>
					</EdgeStoreProvider>
				</ConvexClientProvider>
			</body>
		</html>
	);
}
