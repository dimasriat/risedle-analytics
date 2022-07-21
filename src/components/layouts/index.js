import Logo from "../others/logo";
import Link from "next/link";

export default function Layout(props) {
	return (
		<div className="w-full h-full text-black">
			<nav className="flex items-center justify-start py-4 px-4">
				<Link href="/">
					<a>
						<div className="flex items-center">
							<Logo />
							<h1 className="text-2xl p-2 ml-2">
								Risedle Analytics
							</h1>
						</div>
					</a>
				</Link>
			</nav>
			<div className="mt-4 h-full">{props.children}</div>
		</div>
	);
}
