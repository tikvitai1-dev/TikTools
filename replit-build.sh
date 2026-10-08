#!/bin/bash
# Script build untuk Replit
set -e

echo "Installing pnpm..."
npm install -g pnpm

echo "Installing dependencies..."
pnpm install

echo "Building shared package..."
pnpm --filter @indo-finity/shared build

echo "Building server..."
pnpm --filter server build

echo "Build complete!"
