#!/bin/bash

name="ctf-python-ssti"

docker image build -t $name .

docker stop $name

docker run -d --name $name -p 50505:5000 --rm $name
