// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Pedro Pathing Plus',
			logo: {
				src: './public/icon.png',
			},
			favicon: '/favicon.png',
			customCss: ['./src/styles/custom.css'],
			components: {
				SocialIcons: './src/components/CustomSocialIcons.astro',
				PageTitle: './src/components/PageTitle.astro',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'PedroPathingPlus',
					items: [
						{ label: 'Installation', slug: 'pedro-pathing-plus/installation' },
						{ label: 'Getting Started', slug: 'pedro-pathing-plus/getting-started' },
						{ label: 'Live View', slug: 'pedro-pathing-plus/live-view' },
						{ label: 'Command-Based Programming', slug: 'pedro-pathing-plus/command-based' },
						{ label: 'Named Commands & Events', slug: 'pedro-pathing-plus/named-commands' },
					],
				},
				{
					label: 'PedroPathingPlusVisualizer',
					items: [
						{ label: 'Installation', slug: 'pedro-pathing-plus-visualizer/installation' },
						{ label: 'Getting Started', slug: 'pedro-pathing-plus-visualizer/getting-started' },
						{ label: 'File Management', slug: 'pedro-pathing-plus-visualizer/file-management' },
						{ label: 'Path Editing', slug: 'pedro-pathing-plus-visualizer/path-editing' },
						{ label: 'Simulation & Playback', slug: 'pedro-pathing-plus-visualizer/simulation' },
						{ label: 'Telemetry Overlay', slug: 'pedro-pathing-plus-visualizer/telemetry' },
						{ label: 'Obstacles', slug: 'pedro-pathing-plus-visualizer/obstacles' },
						{ label: 'Event Markers', slug: 'pedro-pathing-plus-visualizer/event-markers' },
						{ label: 'Path Optimization', slug: 'pedro-pathing-plus-visualizer/optimization' },
						{ label: 'Exporting Code', slug: 'pedro-pathing-plus-visualizer/exporting' },
						{ label: 'Plugins', slug: 'pedro-pathing-plus-visualizer/plugins' },
						{ label: 'Settings', slug: 'pedro-pathing-plus-visualizer/settings' },
						{ label: 'Controls & Shortcuts', slug: 'pedro-pathing-plus-visualizer/controls' },
						{ label: 'Troubleshooting & FAQ', slug: 'pedro-pathing-plus-visualizer/troubleshooting' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
