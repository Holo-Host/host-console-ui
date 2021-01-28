# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## unreleased
### Added
- Mock Hpos Api server, for use as both as a standalone server (via npm package scripts) and as a customizable test mock. This is specifically useful for testing auth.
- Implementation of login and auth logic
- Link to Settings page in TopNav
- Settings page with editable device name and sshAccess

### Changed
- TopNav now displays real device name
- Styling for logout button
### Removed
- previous local hpos mock
### Fixed
- Bug in logout button
