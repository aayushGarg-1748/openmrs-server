var createError = require('http-errors');
var express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var productInfo = ["id"]["categoryId"];

//info
var ServerData = require('./package.json');
var ServerVersion = ServerData.version;
var ServerName = ServerData.name;

//products
var productData = require('./src/data/products.json');
var AllProductData = productData.products;

//categories
var categoryData = require('./src/data/category.json');
var AllCategoryData = categoryData.categories;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/info',(req, res) => {

    if((req.query.category) == "1"){

        res.json({"happy hacking gamer-1748":[{
                  "ServerName" : `${ServerName}`,
                   "ServerVersion" : `${ServerVersion}`
                   }]});
    }
    else{
        res.json({"could not recognize you? Fake servers for you":[{
                          "ServerName" : "demo.fake.mrs.fake.oco",
                           "ServerVersion" : "fake.9.0.faked"
                           }]});
    }

});

app.get('/product/:id', (req, res) => {

    if((req.params.id) == "P001"){
        res.json(AllProductData[0]);
    }
    else if((req.params.id) == "P002"){
        res.json(AllProductData[1]);
    }
    else if((req.params.id) == "P003"){
        res.json(AllProductData[2]);
    }
    else if((req.params.id)== "P004"){
        res.json(AllProductData[3]);
    }
    else if((req.params.id) == "P005"){
        res.json(AllProductData[4]);
    }
    else if((req.params.id) == "P006"){
       res.json(AllProductData[5]);
    }
    else if((req.params.id) == "P007"){
        res.json(AllProductData[6]);
    }
    else if((req.params.id) == "P008"){
        res.json(AllProductData[7]);
    }
    else if((req.params.id) == "P009"){
        res.json(AllProductData[8]);
    }
    else if((req.params.id) == "P010"){
        res.json(AllProductData[9]);
    }
    else if((req.params.id) == "P011"){
        res.json(AllProductData[10]);
    }
    else if((req.params.id) == "P012"){
        res.json(AllProductData[11]);
    }
    else if ((req.params.id) == "all"){
        res.json({AllProductData,AllCategoryData});
    }
    else{
        res.send("no product of this id: error 404")
    }
});

app.get('/category/:id', (req, res) => {
    if ((req.params.id) == "cty01"){
        var details = getCategory(0);
        var product1 = getProductData(0);
        var product2 = getProductData(1);
        var product3 = getProductData(2);
        res.json({category1: [{details, product1 ,product2 , product3}]});
    }
    else if ((req.params.id) == "cty02"){
             var details = getCategory(1);
             var product1 = getProductData(3);
             var product2 = getProductData(4);
             var product3 = getProductData(5);
             res.json({category2: [{details, product1 ,product2 , product3}]});
    }
    else if ((req.params.id) == "cty03"){
             var details = getCategory(2);
             var product1 = getProductData(6);
             var product2 = getProductData(7);
             var product3 = getProductData(8);
             res.json({category3: [{details, product1 ,product2 , product3}]});
    }
    else if ((req.params.id) == "cty04"){
             var details = getCategory(3);
             var product1 = getProductData(9);
             var product2 = getProductData(10);
             var product3 = getProductData(11);
             res.json({category4: [{details, product1 ,product2 , product3}]});
    }
    else {
        res.send("No Category Of this Id");
    }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

function getCategory(intege, categoryDta) {
    return(
    categoryDta = {
    "id" : `${AllCategoryData[intege]["id"]}`,
    "categoryName" : `${AllCategoryData[intege]["categoryName"]}`
    }
    )
}

function getProductData(intege, ProductDta) {
    return(
    ProductDta = {
    "id" : `${AllProductData[intege]["id"]}`,
    "categoryId" : `${AllProductData[intege]["categoryId"]}`,
    "name" : `${AllProductData[intege]["name"]}`,
    "unit" : `${AllProductData[intege]["unit"]}`,
    "pricePerUnit" : `${AllProductData[intege]["pricePerUnit"]}`,
    "stocks" : `${AllProductData[intege]["stocks"]}`
    }
    )
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
