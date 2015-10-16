#!/bin/bash

cd hiprunner
grunt || (npm install -g grunt-cli && grunt)
