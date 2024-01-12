# FROM node

# WORKDIR /app

# COPY package.json .

# RUN yarn

# COPY . .

# EXPOSE 5173

# CMD ["yarn", "vite"]

# Step 1: Build the application
FROM node AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Step 2: Set up the production environment
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
