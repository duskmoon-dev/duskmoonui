#!/usr/bin/env bash
# Publish the package in the current directory with npm provenance.
# If Sigstore Rekor returns 409 for an equivalent tarball digest, retry
# without --provenance so a failed first attempt cannot block the release.
set -uo pipefail

NAME=$(node -p 'require("./package.json").name')
TARGET=$(node -p 'require("./package.json").version')

set +e
OUTPUT=$(npm publish --provenance --access public 2>&1)
STATUS=$?
set -e
echo "$OUTPUT"

if [ "$STATUS" -eq 0 ]; then
  exit 0
fi

CURRENT=$(npm view "$NAME" version 2>/dev/null || true)
if [ "$CURRENT" = "$TARGET" ]; then
  echo "$NAME@$TARGET already on npm, skipping"
  exit 0
fi

if echo "$OUTPUT" | grep -q 'TLOG_CREATE_ENTRY_ERROR'; then
  echo "Sigstore tlog 409 — retrying without --provenance"
  npm publish --access public
  exit $?
fi

exit "$STATUS"
