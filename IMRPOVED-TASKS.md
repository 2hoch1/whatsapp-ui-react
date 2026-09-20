# Tasks

## Goal

Convert this repository into a working Next.js monorepo with a real documentation website and downloadable shadcn-style components. The result should keep the existing source folders, preserve the backup branch content as the migration source, and end with a cleaner barrel-export based component structure.
The special requirement is that components must be downloadable through the website and through the shadcn CLI registry flow, while the canonical component source stays inside the React package so it can also be published and used as a normal npm package for quick, no-edit usage. The website should import from that React package.

## Decisions

1. Treat this as a migration and restructuring task, not a greenfield rebuild.
2. Preserve existing folders and files whenever possible. Do not delete anything unless it is explicitly proven obsolete.
3. Use the next-monorepo-template only as the structural reference for missing root-level files and workspace layout.
4. Use the registry-template and the existing shadcn-ui reference repository as implementation references for the website and component registry behavior.
5. Keep the final codebase organized as a monorepo, with packages for shared React components, registry content, and the website app.
6. If a step is ambiguous or has multiple valid implementations, ask for guidance instead of guessing.
7. Follow the shadcn registry model described in https://ui.shadcn.com/docs/registry/getting-started, but adapt it to this repository's monorepo layout.
8. Use apps/v4/public/r as the reference pattern for registry exposure, similar to shadcn-ui, when mapping downloadable registry assets.

## Constraints

1. Do not inspect or rewrite full file contents unless it is necessary for the task. Prefer file comparison, structure comparison, and targeted validation.
2. Do not remove existing folders or source files as part of the conversion.
3. Edits and moves are allowed when they help the migration.
4. Keep the component API clean, shallow, and easy to consume.
5. Prefer shadcn-style barrel exports and base component patterns over deeply nested imports.
6. Prefer @/ imports everywhere within the website and related app packages. Only use relative imports like ./ when @/ is not practical or cannot be resolved.
7. Keep downloadable registry artifacts and npm package source aligned so the same component remains consumable through both paths.
8. When copying files from a template or backup branch, copy them directly into the repo if they are missing, then read and adjust the copied files only after they exist in the workspace. Do not read template files first and then recreate them manually from their contents.

## Execution Plan

### Phase 1, repository recovery and workspace setup

1. Compare the current repository structure against E:\GitHub\bpsets\next-monorepo-template.
2. Add the missing root-level workspace files and configuration needed to restore the monorepo layout.
3. Verify that package installation and root-level execution are possible.
4. Confirm the project can be bootstrapped from the repository root.

### Phase 2, component package registration

1. Install the already registered but empty component set in E:\GitHub\2hoch1\whatsapp-ui-react\packages\react\src\ui\components using the shadcn CLI workflow.
2. Register all relevant subpackages and workspace packages needed for the website and component registry.
3. Set up the website package so it can serve as a test surface for downloadable components.
4. Ensure the React package remains the source of truth for the components that are exposed through the registry and also published for npm consumption.

### Phase 3, registry and website reference implementation

1. Use E:\GitHub\bpsets\registry-template as the behavioral reference for registry output and component publishing.
2. Use E:\GitHub\2hoch1\shadcn-ui as the styling and structure reference for shadcn-style component organization.
3. Implement the website and registry scaffolding so the component catalog can be validated visually.
4. Mirror the registry download path behavior used by shadcn-ui, including the public registry asset structure under apps/v4/public/r when appropriate for this repository.

### Phase 4, migration from backup branch

1. Bring the component and app files from backup/main into the new monorepo structure.
2. Refactor the imported code so it works with the new workspace layout and barrel exports.
3. Convert deeply nested usage into the new shadcn-style structure where appropriate.
4. Use the shadcn base component patterns as the target style for shared primitives such as accordion and card.
5. Update imports so the website consumes the React package source cleanly, with @/ as the preferred alias and relative imports only where necessary.
6. Copy missing files directly from the template or backup source first, then inspect and adapt the copied files inside the repository.

### Phase 5, validation

1. Verify the repository still works at the root after each major phase.
2. Check that package registration, imports, and exports resolve correctly.
3. Validate that the website renders the component registry correctly.
4. Finish with a concise report of what was changed and what still needs follow-up.

## Research And Planning Output

Before making changes, do the research needed to understand the current repository state and then provide:

1. A short decision summary at the top.
2. A step-by-step execution plan.
3. Any open questions that must be answered before implementation.

## Agent Guidance

1. Use multiple agents when they add real value, for example one for repository comparison, one for implementation planning, and one for validation. Use superpowers for the handling of that.
2. Keep one agent focused on context gathering and one on execution if parallelization is helpful.
3. Prefer asking for a guide or clarification when the best path is not clear.
