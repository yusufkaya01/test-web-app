# Use the official nginx image
FROM nginx:alpine

# Install git to clone the repository
RUN apk add --no-cache git

# Clone the repository into /usr/share/nginx/html
RUN git clone https://github.com/yusufkaya01/test-web-app.git /usr/share/nginx/html

# On each container start, pull the latest changes
CMD ["sh", "-c", "git -C /usr/share/nginx/html pull && nginx -g 'daemon off;'"]

# Expose port 80
EXPOSE 80
