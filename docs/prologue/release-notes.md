---
title: Release Notes
sidebar_position: 10
---

The nature version follows [Semantic Versioning](https://semver.org/). The version range from 0.1 to 1.0 consists of two parts.

The upper part always carries the "beta" label, indicating that it is not yet production-ready.

The lower part contains stable and backward-compatible syntax APIs. At this stage, nature can be used for personal, independent, or open-source projects, but it does not provide Long-Term Support (LTS) versions.

When version 1.0 is released, nature will be officially used for open-source/commercial projects and will have an LTS version.

|Version|Content|Estimated Release Date|
|---|---|---|
|v0.1.0-beta|Initial release of basic syntax|2023-05|
|v0.2.0-beta|Type system and basic syntax improvements|2023-07|
|v0.3.0-beta|Package management and basic syntax improvements|2023-09|
|v0.4.0-beta|Basic standard library and syntax improvements|2023-11|
|v0.5.0-beta|Small-scale test cases and bug fixes|2024-02|
|v0.6.0-beta|LSP development and editor support|2024-04|
|v0.7.0|Medium-scale test cases and stable syntax API|2024-07|
|v0.8.0+|Preparation for the official release|2024-09|
|v1.0.0|Official release|2025-|

### Changelog

Version: v0.2.0-beta

Release Date: 2023-07

New Features:

1. Added support for `continue` and `break` syntax.
2. Added `as` for type assertion and type coercion.
3. Added `is` keyword for checking specific types in `union` and `any` types.
4. Added `let` keyword for type inference.
5. Added support for `union` types.
6. Added support for type aliases with parameters.
7. Added generic support for global functions.
8. Added support for `null` type and null safety. Compound types are no longer allowed to be assigned `null`, and variables must be initialized with a value.
9. Added support for overload resolution based on parameter types for global functions.

Adjustments:

1. Changed `catch` keyword to a shorter `try` keyword.
2. Variables must now be initialized upon declaration, and compound types are no longer allowed to be `null`.
3. Removed mandatory parentheses for `if` and `for` statements. For example, `if true {}`.
4. Changed double quotes to single quotes for characters.
5. Renamed `list.length()` and `map.length()` to `len`.
6. Renamed `list.delete()` and `set.delete()` to `del`.
7. Renamed `set.contains()` to `has`.
8. Fixed the issue where `try` syntax was not available in chained calls (#11).
9. Fixed the issue where type aliases didn't support the `module.type` format.
10. Temporarily disabled implicit type conversions, but literal assignments like `i8 foo = 12` are still supported.
