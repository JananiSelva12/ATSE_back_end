#!/bin/bash

# Create a new user
# Grant superuser privileges for the new user on the specified database
mysql -u"root" -p"root" -h"${MYSQL_HOST}" -e "GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'${MYSQL_HOST}';"
