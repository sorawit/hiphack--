#!/bin/bash

cd /vagrant/hiphackio
mkdir -p logs

[[ -d env ]] || virtualenv env
source env/bin/activate

pip install tornado

sudo cp -f ./conf/supervisor.conf /etc/supervisor/conf.d/hiphackio.conf
sudo supervisorctl reread
sudo supervisorctl update

sudo cp -f ./conf/nginx.conf /etc/nginx/sites-available/default
sudo service nginx reload