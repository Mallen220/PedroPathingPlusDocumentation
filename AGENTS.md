# AGENTS

This document outlines the steps for automated agents working with the PedroPathingPlusDocumentation repository. Agents should follow these instructions to clone the repository, update references, and leverage features from the reference projects.

## Overview

The goal for automated agents is to:

1. Clone the `PedroPathingPlusDocumentation` repository.
2. Install dependencies via `npm install` (if applicable).
3. Run `npm run ref` to update references throughout the workspace.
4. Reference and utilize features from the included reference projects (e.g., PedroPathingPlus, PedroPathingPlusVisualizer) to complete their prescribed tasks.

Agents should be aware that the workspace contains multiple subprojects, including:

- **PedroPathingPlus**: Android/Gradle-based project with pathfinding code.
- **PedroPathingPlusVisualizer**: Svelte/Vite-based visualization tool for pathfinding.

Each reference project provides examples of:

- How to structure source modules and packages.
- Typical build and test commands (Gradle tasks and `npm run` scripts).
- Utilities and helper scripts under `scripts/` directories.

## Cloning the Repository

Agents should run:

```bash
git clone https://github.com/Mallen220/PedroPathingPlusDocumentation.git
cd PedroPathingPlusDocumentation
```


## Updating References

After cloning, agents must ensure that any cross-project references are current. The repository includes an `npm` script named `ref` which is designed to update references automatically. Agents should execute:

```bash
npm install
npm run ref
```

This will scan the workspace for outdated or broken references and update them based on the project's reference configuration.

## Utilizing Features from Reference Projects

Agents should inspect the following areas to understand available features:

- `PedroPathingPlus/app/src/main/java/...` contains Java/Kotlin classes for pathfinding and robotics logic used in FTC robotics.
- `PedroPathingPlusVisualizer/src/lib/` includes TypeScript utilities, Svelte components, and visualization tools demonstrating UI features and plugin systems.
- Utility scripts like `scripts/publish.js` and `scripts/debug-point-mapping.js` show how to manipulate project assets and data.

When performing tasks that require sample code or behavior, agents should reference these projects for implementation patterns. For example:

- Use the pathfinding algorithms in `PedroPathingPlus/core` as a template for new Java modules.
- Follow the plugin structure in `PedroPathingPlusVisualizer/src/lib/pluginManager.ts` when extending the visualizer.

## Additional Notes

- Ensure any changes are committed back to the repository with clear messages describing the updates made by the agent.
- If the `npm run ref` script fails, inspect `package.json` and the referenced scripts for debugging.
- Agents should operate with read/write permissions and ensure their environment has Node.js (>=16) and Java/Gradle where required.

By following these steps, automated agents can effectively clone, update, and interact with the repository while leveraging existing features from the reference projects.