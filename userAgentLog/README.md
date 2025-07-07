# User Agent monitoring tools Server

This is a User Agent Monitoring project

![image alt](https://github.com/foyzan/Pocket-School/blob/f70655e46a830130660b5765dd4c3e96a7b6c4ff/userAgentLog/Screenshot%202025-07-07%20212224.png)



## Installation

To run this project on your local machine, first clone the repo ⏬ 

```bash
  git clone https://github.com/foyzan/Pocket-School.git
```
open the project file with vs code and open the terminal. 
To install all the dependency packages, run this command

```bash
  npm install 
```
✅Everything is set up. Now start the server

```bash
 node index.js
```
## API Reference


#### See the user-agent log.

```HTTP
  GET http://localhost:5000/user/logs?token=123
```
#### See the API Response of the user-agent log

```http
  GET http://localhost:5000/user/userlogs?token=123
```
