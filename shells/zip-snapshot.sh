#!/bin/bash

# 确保脚本在遇到错误时停止执行
set -e

# 删除旧的目录
echo "删除旧的构建目录..."
rm -rf dist

# 构建
cat << EOF > .env
VITE_BASE_URL=/apps/image-tools/
VITE_BUILD_DIR=dist/apps/image-tools
EOF
npm run build

# 进入构建目录
cd dist/apps/image-tools
cp index.html 404.html

# 压缩
cd -
node scripts/snapshot.js
echo "快照完成！" 