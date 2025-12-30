FROM node:18-alpine 

# for the environment where the runtime with tool and linux based os


# set the working directory in an container

WORKDIR /app 

# select the package.json and lock.json  and copy the project files

COPY package*.json ./

RUN npm install --production 
# remove the dev dependencies only for production side

COPY . . 

EXPOSE 3000

# set the port for the container

CMD ["npm","start"]

#set the automatically to run while after build an docker image 

#first set the os and runtime then working directory then copy json and lock then run install prodution and copy the project files
# and then, expose the port for container  cmd for exexute it