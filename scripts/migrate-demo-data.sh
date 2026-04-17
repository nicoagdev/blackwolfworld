#!/bin/bash

# Script to migrate demo data into the WordPress installation

# Define the WordPress installation URL
WP_URL="http://app.blackwolfworld.com"

# Define the path to the demo data XML file
DEMO_DATA_FILE="./path/to/demo-data.xml"

# Check if WP-CLI is installed
if ! command -v wp &> /dev/null
then
    echo "WP-CLI could not be found. Please install it to run this script."
    exit 1
fi

# Navigate to the WordPress installation directory
cd /path/to/wordpress || { echo "WordPress directory not found"; exit 1; }

# Import demo data
echo "Importing demo data..."
wp import "$DEMO_DATA_FILE" --authors=create

# Flush rewrite rules
echo "Flushing rewrite rules..."
wp rewrite flush

# Output completion message
echo "Demo data migration completed successfully!"