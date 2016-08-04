#!/bin/bash

export DEBUG=goodpass:*
nohup node bin/www > logs/main.log 2>&1 &

# Redirect port 80 to port 3000 to run program from simple user
#sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to 3000