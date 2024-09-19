# Use a static file server image
FROM nginx:alpine

# Copy client files to the NGINX html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# The command to start NGINX will be provided by the base image itself
# No need to specify it here