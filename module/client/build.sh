#!/usr/bin/env bash
cd reactapp
npm install
npm run build
cp -R "public/assets/favicon.ico" "dist/favicon.ico" || true
cp -R "public/assets" "dist/" || true
