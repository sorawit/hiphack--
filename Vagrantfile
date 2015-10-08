# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "forwarded_port", guest: 80, host: 9000
  config.vm.network "forwarded_port", guest: 8000, host: 8000
  config.vm.network "forwarded_port", guest: 8001, host: 8001

  config.vm.provision "docker"
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install -y build-essential supervisor nginx
    sudo apt-get install -y python-pip python-dev python-setuptools
    sudo apt-get install -y nodejs npm

    ln -s /usr/bin/nodejs /usr/bin/node || true
    sudo npm install -g n
    sudo npm install -g nodemon
    sudo n stable

    sudo pip install virtualenv
    sudo service supervisor start || true
    sudo service nginx start || true
  SHELL

  config.vm.provision "shell", path: "./hiphackio/bin/setup.sh"
end
