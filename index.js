const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceTemplates= require('./modules/replaceTemplates');





// Read Pages
const  tempOverview= fs.readFileSync(`${__dirname}/templates/overview.html` , "utf-8");
const  tempProduct= fs.readFileSync(`${__dirname}/templates/template-product.html` , "utf-8");
const  tempCard= fs.readFileSync(`${__dirname}/templates/template-card.html` , "utf-8");


// Replace Placeholder with Json data 


// Create server
const server = http.createServer((req, res) => {
  // Read API
  const  data= fs.readFileSync(`${__dirname}/dev-data/data.json` , "utf-8");
  const dataObj = JSON.parse(data);
  
  
  //Fetching paths
  // const {query,pathname} = url.parse(req.url , true);
  const parsedUrl = url.parse(req.url, true);
const query = parsedUrl.query;
const pathname = parsedUrl.pathname;


  //OVERVIEW
  if (pathname === '/overview' || pathname === "/") {
    res.writeHead(200, { 'Content-Type': 'text/html' });
   
    const cardHtml= dataObj.map(product=> replaceTemplates(tempCard ,product)).join('');
    output =  tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
    res.end(output); 
//PRODUCT PAGE
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html'});
    let index = dataObj.findIndex(ind => ind.id == query.id);
    let product =  dataObj[index];
    console.log(index);
    console.log(product);
    const output= replaceTemplates(tempProduct, product);
    res.end(output);
//API
}else if (pathname === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(dataObj));
  }
//PAGE NOT FOUND
   else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 error not found</h1>');
  }
});

// Listen to incoming requests on PORT
server.listen(7000, () => {
  console.log('Server is running on port 7000');
});

// server.close(() => {
//     console.log('Server stopped');
//   });






// const hello="Hello world";
// console.log(hello);


// let textin= fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textin);

// fs.writeFileSync('./txt/output.txt',`This is the avacado information we have: ${textin}`);
// console.log("file Written");


// fs.readFile('./txt/start.txt', 'utf-8' ,(err, data) => {
//     if(err) throw console.log('Error ');
//     console.log(data);
//     fs.readFile(`./txt/${data}.txt` ,'utf-8',(err, data1)=>{
//         console.log(data1);
//         fs.readFile('./txt/append.txt','utf-8',(err,data2)=>{
//             console.log(data2);
//             fs.writeFile('./txt/final.txt',` ${data1} \n ${data2}`,err=>{   
//                 console.log('file written');
//             });
//         });  
//     });
//   }); 


//   fs.readFile(`./txt/append.txt`,'utf-8',(err,data10)=>{
//     console.log(data10);
// });

/////////////////
// index = numbers.findIndex(number => number === 6);