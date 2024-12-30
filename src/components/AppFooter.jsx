import React from "react";
import { Layout, Icon } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
	const items = [
		{
			title: "Vuetify Documentation",
			icon: "vuetify",
			href: "https://vuetifyjs.com/",
		},
		{
			title: "Vuetify Support",
			icon: "mdi-shield-star-outline",
			href: "https://support.vuetifyjs.com/",
		},
		{ title: "Vuetify X", icon: "mdi-x", href: "https://x.com/vuetifyjs" },
		{
			title: "Vuetify GitHub",
			icon: "mdi-github",
			href: "https://github.com/vuetifyjs/vuetify",
		},
		{
			title: "Vuetify Discord",
			icon: "mdi-discord",
			href: "https://community.vuetifyjs.com/",
		},
		{
			title: "Vuetify Reddit",
			icon: "mdi-reddit",
			href: "https://reddit.com/r/vuetifyjs",
		},
	];

	return (
		<Footer style={{ textAlign: "center", height: 40 }}>
			{items.map((item) => (
				<a
					key={item.title}
					href={item.href}
					title={item.title}
					target="_blank"
					rel="noopener noreferrer"
					className="social-link"
				>
					<Icon
						type={item.icon}
						style={{ fontSize: item.icon === "vuetify" ? 24 : 16 }}
					/>
				</a>
			))}
			<div
				className="text-caption text-disabled"
				style={{ position: "absolute", right: 16 }}
			>
				&copy; 2016-{new Date().getFullYear()}{" "}
				<span className="d-none d-sm-inline-block">Vuetify, LLC</span> —
				<a
					className="text-decoration-none on-surface"
					href="https://vuetifyjs.com/about/licensing/"
					target="_blank"
					rel="noopener noreferrer"
				>
					MIT License
				</a>
			</div>
		</Footer>
	);
};

export default AppFooter;
