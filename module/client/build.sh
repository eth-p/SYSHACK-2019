#!/usr/bin/env bash
cd reactapp
npm install
npm run build
cp -R "public/assets" "dist"
