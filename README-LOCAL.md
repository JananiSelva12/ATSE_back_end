# cpd-3-backend

<!-- *****Environment Setup***** -->

<!-- ***Installing Node.js (Version 18.16.0)*** -->

Using Node Version Manager (NVM) (Linux/Mac/Windows):

- Install NVM by following the instructions on the "https://github.com/nvm-sh/nvm#installing-and-updating"
- Open a new terminal window.
- Install Node.js(18.16.0) by running the following command: "nvm install 18.16.0"
- Set the default Node.js version to 18.16.0: "nvm use 18.16.0"

<!-- ***Installing MySQL*** -->

MySQL Community Server (Windows/Mac/Linux):

Download the MySQL Community Server installer from "https://dev.mysql.com/downloads/mysql/".

- Follow the installation instructions provided by the installer.
- During the installation, you may set up a root password for MySQL.

1. MySQL on Linux (using package manager):
   - For Debian-based systems (e.g., Ubuntu), you can use the following commands: 1. "sudo apt update" 2. "sudo apt install mysql-server"
   - For Red Hat-based systems (e.g., CentOS), use: 1. sudo yum install mysql-server
2. MySQL on Mac (using Homebrew):
   - Homebrew Installation:
     1. /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     2. brew --version
   - If you have Homebrew installed, you can use the following command:
     1. brew install mysql
3. MysQL on Windows:

   1. Installing WampServer:

      1. Download WampServer:Visit the WampServer official website and download: "https://www.wampserver.com/en/".

      2. Run the Installer:

      - Run the downloaded installer.
      - During the installation process, you may be prompted to choose the default web browser and text editor.Select your preferences and proceed with the installation.

      3. Start WampServer:After installation, you'll find a WampServer icon in your system tray.Click on it, and you can start the WampServer services.
      4. Verify Installation:Open your web browser and go to http://localhost/. If everything is set up correctly, you should see the WampServer homepage.

   2. Installing XAMPP:
      1. Download XAMPP:Visit the XAMPP official website and download "https://www.apachefriends.org/index.html"
      2. Run the Installer:Run the downloaded installer. During the installation, you can choose the components you want to install. At a minimum, make sure "Apache" and "MySQL" are selected.
      3. Choose Installation Folder:Choose the folder where you want to install XAMPP and proceed with the installation.
      4. Complete the Installation:Follow the on-screen instructions to complete the installation. You may be prompted to install Bitnami for XAMPP. You can uncheck this option if you don't need it.
      5. Start Apache and MySQL:After installation, open the XAMPP Control Panel. Start the Apache and MySQL services by clicking the "Start" buttons next to them.
      6. Verify Installation:Open your web browser and go to http://localhost/. If everything is set up correctly, you should see the XAMPP dashboard.

<!-- Please Follow the instruction for Run the application -->

- Change the DB credentials `src/ormconfig.ts`
- Create the folder logs folder in side the src "src/logs"
- Configure your SMTP email in `config/default.ts` File with your mail id and password
  (make sure your gmail's `less secure app access` enabled)
  - check via this link
    _https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4MxpkiqOzzu4VXJVlRTSmDDzL_n4jCkFHwNgumXvruDbtiUXrM8RLKzDQluYgljAmdDdxTIkKewnEUIeq-UPug4BKiwEA_
- npm install
- npm run dev

<!-- Migration Generate -->

npm run migration:generate -n <"migration file name">
npm run migration:run
