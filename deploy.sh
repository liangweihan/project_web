#!/bin/bash

# 部署到 AWS EB
source venv/bin/activate
eb deploy Graduate-env

# 自動清理舊的 zip 檔案
echo "清理舊的部署檔案..."
rm -f .elasticbeanstalk/app_versions/*.zip
echo "清理完成！"
