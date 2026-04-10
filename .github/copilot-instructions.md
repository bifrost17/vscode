# Open Cowork - Development Instructions

> **MANDATORY**: This project is a VS Code fork. All code MUST follow the guidelines below. No exceptions.
> - [VS Code Development Guidelines](vscode-guidelines.md) — Architecture, layering, coding rules
> - [Extension Development Guidelines](extension-guidelines.md) — Extension API, UX, testing

## Project Structure

- `src/` - Main TypeScript source (unit tests in `src/vs/*/test/`)
- `src/vs/base/` - Foundation utilities
- `src/vs/platform/` - Platform services and DI
- `src/vs/editor/` - Monaco Editor core
- `src/vs/workbench/` - Application workbench (browser, services, contrib, api)
- `src/vs/code/` - Electron main process
- `src/vs/server/` - Remote server
- `src/vs/sessions/` - Agent sessions (sits alongside workbench, may import from it but not vice versa)
- `build/` - Build scripts and CI/CD
- `extensions/` - Built-in extensions
- `test/` - Integration tests

## Validating Changes

MANDATORY: Always check for compilation errors before running tests or declaring work complete.

- NEVER run tests if there are compilation errors
- NEVER use `npm run compile` to compile TypeScript files

### Compilation
- `src/` changes: run `npm run compile-check-ts-native`
- `extensions/` changes: run `npm run gulp compile-extensions`
- `build/` changes: run `npm run typecheck` in the `build` folder
- If `#runTasks/getTaskOutput` is available, use the `VS Code - Build` watch task instead

### Testing
- Unit tests: `scripts/test.sh` (add `--grep <pattern>` to filter)
- Integration tests: `scripts/test-integration.sh`
- Layering check: `npm run valid-layers-check`
- Lint: `npm run eslint`

## Finding Code
1. Semantic search first (file search for general concepts)
2. Grep for exact strings (error messages, function names)
3. Follow imports from the problematic module
4. Check test files for usage patterns
