#!/bin/sh
# skrypt instaluje niezbędne zależności i uruchamia aplikacje
pacman -Syyu --noconfirm
reset
pacman -S git nodejs npm --noconfirm
reset
npm install -g typescript concurrently
cd
git clone https://github.com/szczesniakm/reservation-system.git
cd reservation-system/server
npm install
cd ../client
npm install
cd ..
npm run dev
