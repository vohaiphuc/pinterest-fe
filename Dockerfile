# FROM node as build
# WORKDIR /app
# COPY . /app
# RUN yarn install && yarn run build

# FROM nginx:latest
# COPY --from=build /app/dist /usr/share/nginx/html

# # Set the working directory to /etc/nginx
# WORKDIR /etc/nginx

# # Now, any subsequent instructions will be executed in /etc/nginx
# COPY nginx.conf .

FROM nginx

WORKDIR /usr/share/nginx/html

COPY ./dist .

# Set the working directory to /etc/nginx
WORKDIR /etc/nginx

COPY nginx.conf .