var createError = require('http-errors');
var express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//var productInfo = ["id"]["categoryId"];

//info
var serverData = require('./package.json');
var serverVersion = serverData.version;
var serverName = serverData.name;

//products
var productData = require('./src/data/products.json');
var allProductData = productData.products;

//categories
var categoryData = require('./src/data/category.json');
var allCategoryData = categoryData.categories;

const app = express();

const products = [
  {name: 'P001', place: 0},
  {name: 'P002', place: 1},
  {name: 'P003', place: 2},
  {name: 'P004', place: 3},
  {name: 'P005', place: 4},
  {name: 'P006', place: 5},
  {name: 'P007', place: 6},
  {name: 'P008', place: 7},
  {name: 'P009', place: 8},
  {name: 'P010', place: 9},
  {name: 'P011', place: 10},
  {name: 'P012', place: 11},
];

const categories = [
  {name: 'cty01', place: 0, product1: 'P001', product2:'P002', product3:'P003'},
  {name: 'cty02', place: 1, product1: 'P004', product2:'P005', product3:'P006'},
  {name: 'cty03', place: 2, product1: 'P007', product2:'P008', product3:'P009'},
  {name: 'cty04', place: 3, product1: 'P010', product2:'P011', product3:'P012'}
];

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

    if((req.query.password) == "Admin123"){

        res.json({"happy hacking gamer-1748":[{
                  "ServerName" : `${serverName}`,
                   "ServerVersion" : `${serverVersion}`
                   }]});
    }
    else{
        res.json({"could not recognize you? Fake servers for you":[{
                          "ServerName" : "demo.fake.mrs.fake.oco",
                           "ServerVersion" : "fake.9.0.faked"
                           }]});
    }

});

app.get('/product/all', (req, res) => {
    var prd1 = getProductData(0);
    var prd2 = getProductData(1);
    var prd3 = getProductData(2);
    var prd4 = getProductData(3);
    var prd5= getProductData(4);
    var prd6 = getProductData(5);
    var prd7 = getProductData(6);
    var prd8 = getProductData(7);
    var prd9 = getProductData(8);
    var prd10 = getProductData(9);
    var prd11 = getProductData(10);
    var prd12 = getProductData(11);
    var allprd = ({prd1, prd2 , prd3 , prd4 , prd5 , prd6 , prd7 , prd8 , prd9 , prd10 , prd11 , prd12 , allCategoryData});
    res.send(allprd);
    });

app.get('/product/:id', (req, res) => {
    var id = (req.params.id);
    var productInfo = getProduct(id);
    if (productInfo != null){
        res.json(allProductData[productInfo]);
    }
    else{
        res.send("error404: not found");
    }
});


app.get('/category/:id', (req, res) => {
    var id = (req.params.id);
    var categorInfo = getCategoryDetails(id);
    if (categorInfo != null){
        res.json(categorInfo);
    }
    else{
        res.send("error404: category not found");
    }

});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

function getProductData(intege, ProductDta) {
    var categoryName = null;

    if(categoryName == null){
        var data = (categories.find( ({ name }) => name === allProductData[intege]["categoryId"] ));
        var tempPlace = data["place"];
        categoryName = allCategoryData[tempPlace]["categoryName"];
}
    return(
                ProductDta = {
                "id" : `${allProductData[intege]["id"]}`,
                "categoryId" : `${allProductData[intege]["categoryId"]}`,
                "categoryName" : `${categoryName}`,
                "name" : `${allProductData[intege]["name"]}`,
                "unit" : `${allProductData[intege]["unit"]}`,
                "pricePerUnit" : `${allProductData[intege]["pricePerUnit"]}`,
                "stocks" : `${allProductData[intege]["stocks"]}`
                }
        )
    categoryName = null;
}

function getProduct (productName, place){
    var data = (products.find( ({ name }) => name === productName ));
    var finalData = null;
    if (data != null){
        finalData = data["place"];
    } else {
        finalData = null;
    }
    return(
        place = finalData
    )
}

function getCategoryDetails (categoryName, place){
    var data = (categories.find( ({ name }) => name === categoryName ));
    var placeno = null;

    if (data != null){
        placeno = data["place"];
        var prdct1 = data["product1"];
        var prdct2 = data["product2"];
        var prdct3 = data["product3"];

        var product1place = getProduct(prdct1);
        var product2place = getProduct(prdct2);
        var product3place = getProduct(prdct3);

        var details = allCategoryData[placeno];
        var product1 = allProductData[product1place];
        var product2 = allProductData[product2place];
        var product3 = allProductData[product3place];
        return(
            place = ({categoryName, details, product1 ,product2 , product3})
        )
    } else {
        return(null)
    }


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
