// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Pedro Pathing Plus',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
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
						{ label: 'Live View', slug: 'pedro-pathing-plus/live-view' },
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
