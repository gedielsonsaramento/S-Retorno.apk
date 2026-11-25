#!/usr/bin/env bash
set -euo pipefail
project_dir="$(cd "$(dirname "$0")/.." && pwd)"
test_binary="$(mktemp)"
trap 'rm -f "$test_binary"' EXIT
g++ -std=c++17 -O2 -pthread -Wall -Wextra -Werror "$project_dir/tests/native/latest_frame_test.cpp" -o "$test_binary"
"$test_binary"
