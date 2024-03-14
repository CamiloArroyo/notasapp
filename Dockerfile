FROM node:alpine As build
workdir /notas-app

copy . .

run npm install --legacy-peer-deps
run npm run build

from nginx:alpine
copy --from=build /notas-app/dist/notas/browser /usr/share/nginx/html
expose 80

