#!/usr/bin/env bash
# Publish with npm Trusted Publishing (OIDC).
# Do not pass --provenance: Trusted Publishing already attests on the registry,
# and a client-side Rekor 409 aborts before the PUT, blocking that tarball forever.
# Do not use NODE_AUTH_TOKEN: a stale token 404s the PUT for scoped packages.
set -euo pipefail

NAME=$(node -p 'require("./package.json").name')
TARGET=$(node -p 'require("./package.json").version')
CURRENT=$(npm view "$NAME" version 2>/dev/null || true)
if [ "$CURRENT" = "$TARGET" ]; then
  echo "$NAME@$TARGET already on npm, skipping"
  exit 0
fi

unset NODE_AUTH_TOKEN
npm config delete "//registry.npmjs.org/:_authToken" >/dev/null 2>&1 || true

npm publish --access public
