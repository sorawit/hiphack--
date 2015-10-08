#!/bin/bash

cd /vagrant/hiphooker
mkdir -p logs

docker build -t 'hiphooker' - < Dockerfile

sudo cp -f ./conf/supervisor.conf /etc/supervisor/conf.d/hiphooker.conf
sudo supervisorctl reread
sudo supervisorctl update
