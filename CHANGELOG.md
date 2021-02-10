# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## unreleased
### Added
- Mock Hpos Api server, for use as both as a standalone server (via npm package scripts) and as a customizable test mock. This is specifically useful for testing auth.
- Implementation of login and auth logic
- Link to Settings page in TopNav
- Settings page with editable device name and sshAccess
- Show UI version in left panel
- Link to holo website in left panel
### Changed
- TopNav now displays real device name
- Styling for logout button
- Display "--" instead of mock data
- Show X for happ image instead of initials
- Favicon to holo logo
- Small style tweaks
### Removed
- previous local hpos mock
### Fixed
- Bug in logout button
- Dropdown menu alignment
- Filter box no longer jumps when you start typing in it
