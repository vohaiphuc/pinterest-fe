FROM nginx

WORKDIR /usr/share/nginx/html

COPY . .

# Set the working directory to /etc/nginx
WORKDIR /etc/nginx

# Now, any subsequent instructions will be executed in /etc/nginx
COPY nginx.conf .