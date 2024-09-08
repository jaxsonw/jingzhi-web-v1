# 使用官方的Node.js镜像作为基础镜像
FROM node:20.0.0

# 更新包管理器并安装 vim 和 lsof
RUN apt-get update && apt-get install -y vim lsof

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
RUN ls -l /

ENV NODE_ENV=production

# 暴露应用运行的端口
EXPOSE 5003

# 在运行时构建和启动应用
CMD ["sh", "-c", "pnpm build && pm2-runtime start ecosystem.config.js"]