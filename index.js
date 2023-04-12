const http = require('http');
const fs = require('fs');
const url = require('url');


// Read API
const  data= fs.readFileSync(`${__dirname}/dev-data/data.json` , "utf-8");
const dataObj = JSON.parse(data);





// Read Pages
const  tempOverview= fs.readFileSync(`${__dirname}/templates/overview.html` , "utf-8");
const  tempProduct= fs.readFileSync(`${__dirname}/templates/template-product.html` , "utf-8");
const  tempCard= fs.readFileSync(`${__dirname}/templates/template-card.html` , "utf-8");


// Create server
const server = http.createServer((req, res) => {
  const {query,pathname} = url.parse(req.url , true);
  // Replace Placeholder with Json data 
  const replaceTemplates=(temp, product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%NEUTRIENTS%}/g,product.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    output = output.replace(/{%COUNTRYNAME%}/g,product.from);
    output = output.replace(/{%COUNTRYNAME%}/g,product.from);
    output = output.replace(/{%ID%}/g,product.id);
    if (product.organic === false) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
  }
  //OVERVIEW
  if (pathname === '/overview' || pathname === "/") {
    res.writeHead(200, { 'Content-Type': 'text/html' });
   
    const cardHtml= dataObj.map(product=> replaceTemplates(tempCard ,product)).join('');
    output =  tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
    res.end(output); 
//PRODUCT PAGE
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    console.log(query);
    let product =  dataObj[query.id];
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

// Listen to incoming requests on port 3000
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