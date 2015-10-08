#!/bin/bash

cd hiprunner
npm install
grunt || (npm install -g grunt-cli && grunt)
