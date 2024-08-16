# 使用官方的Node.js镜像作为基础镜像
FROM node:20.0.0

# 设置工作目录
WORKDIR /app

# 复制项目的package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装pnpm
RUN npm install -g pnpm

# 安装pm2
RUN npm install -g pm2

# 安装项目依赖
RUN pnpm install

# 复制项目所有文件
COPY . .

# 调试：列出工作目录中的文件和权限
RUN ls -l /app

# 构建 Next.js 应用
RUN pnpm build


RUN chown -R node:node /app/.next

# 调试：列出构建目录中的文件和权限
RUN ls -l /app/.next

# 暴露应用运行的端口
EXPOSE 5003

# 启动应用
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
