import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, useLocation, type MetaFunction } from "@remix-run/react";
import { Outlet } from "react-router";
import { STYLES } from "~/lib/Styles";

export const meta: MetaFunction = () => {
	return [
		{ title: "Hearts" },
		{ name: "description", content: "Hearts slider generator" },
		{ name: "theme-color", content: "#030712" },
	];
};

export default function RootLayout() {
	const { pathname, search } = useLocation();

	const currentSegment = search.startsWith("?style=")
		? search.replace("?style=", "") ?? "default"
		: pathname.slice(1) ?? "default";

	return (
		<main className="h-screen w-screen bg-slate-950 text-slate-50">
			<section className="mx-auto flex h-full w-[70%] max-w-[800px] flex-col items-center justify-center gap-8">
				<Outlet />
				<Menu as="nav" className="flex min-w-32 gap-4">
					<MenuButton className="flex h-10 w-full items-center justify-between rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm capitalize ring-offset-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
						{currentSegment}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-4 text-slate-50"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m19.5 8.25-7.5 7.5-7.5-7.5"
							/>
						</svg>
					</MenuButton>
					<MenuItems
						anchor="bottom"
						className="mt-2 flex min-w-32 flex-col gap-1 rounded border-[0.5px] border-slate-800 bg-slate-950 p-1 text-sm text-slate-100"
					>
						{STYLES.map((style) => (
							<MenuItem
								as={Link}
								to={`/?style=${style}`}
								key={style}
								prefetch="render"
								className="block rounded p-2 capitalize data-[focus]:bg-slate-900 data-[disabled]:!text-slate-500"
								disabled={style === currentSegment}
							>
								{style}
							</MenuItem>
						))}
						<MenuItem
							as={Link}
							to={`/custom`}
							className="block rounded p-2 capitalize data-[focus]:bg-slate-900 data-[disabled]:!text-slate-500"
							disabled={pathname === "/custom"}
						>
							custom
						</MenuItem>
						<MenuItem
							as={Link}
							to={`/level`}
							className="block rounded p-2 capitalize data-[focus]:bg-slate-900 data-[disabled]:!text-slate-500"
							disabled={pathname === "/level"}
						>
							level
						</MenuItem>
					</MenuItems>
				</Menu>
			</section>
		</main>
	);
}
