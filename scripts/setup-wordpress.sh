#!/bin/bash

# Script to set up WordPress for the Next.js e-commerce project

# Variables
WP_URL="http://app.blackwolfworld.com"
WP_ADMIN_USER="admin"
WP_ADMIN_PASSWORD="password"
WP_ADMIN_EMAIL="admin@example.com"
WP_DB_NAME="wordpress"
WP_DB_USER="wp_user"
WP_DB_PASSWORD="wp_password"
WP_DB_HOST="localhost"

# Update package list and install necessary packages
echo "Updating package list..."
sudo apt-get update

echo "Installing necessary packages..."
sudo apt-get install -y apache2 mysql-server php php-mysql libapache2-mod-php php-curl php-xml php-mbstring

# Download and set up WordPress
echo "Downloading WordPress..."
wget -c https://wordpress.org/latest.tar.gz
tar -xzvf latest.tar.gz
sudo mv wordpress/* /var/www/html/

# Set permissions
echo "Setting permissions..."
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/

# Create WordPress database
echo "Creating WordPress database..."
mysql -u root -p -e "CREATE DATABASE $WP_DB_NAME;"
mysql -u root -p -e "CREATE USER '$WP_DB_USER'@'$WP_DB_HOST' IDENTIFIED BY '$WP_DB_PASSWORD';"
mysql -u root -p -e "GRANT ALL PRIVILEGES ON $WP_DB_NAME.* TO '$WP_DB_USER'@'$WP_DB_HOST';"
mysql -u root -p -e "FLUSH PRIVILEGES;"

# Configure wp-config.php
echo "Configuring wp-config.php..."
cp /var/www/html/wp-config-sample.php /var/www/html/wp-config.php
sed -i "s/database_name_here/$WP_DB_NAME/" /var/www/html/wp-config.php
sed -i "s/username_here/$WP_DB_USER/" /var/www/html/wp-config.php
sed -i "s/password_here/$WP_DB_PASSWORD/" /var/www/html/wp-config.php

# Install WordPress via WP-CLI
echo "Installing WordPress..."
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp

cd /var/www/html
wp core install --url="$WP_URL" --title="Black Wolf World" --admin_user="$WP_ADMIN_USER" --admin_password="$WP_ADMIN_PASSWORD" --admin_email="$WP_ADMIN_EMAIL"

# Install WooCommerce
echo "Installing WooCommerce..."
wp plugin install woocommerce --activate

# Set up WooCommerce payment gateway (example: PayPal)
echo "Setting up WooCommerce payment gateway..."
wp option update woocommerce_paypal_settings 'a:1:{s:4:"email";s:0:"";}'

# Restart Apache
echo "Restarting Apache..."
sudo systemctl restart apache2

echo "WordPress setup completed successfully!"