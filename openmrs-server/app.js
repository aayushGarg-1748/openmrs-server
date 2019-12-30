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

const categories = [
    {name: 'cty01', place: 0},
    {name: 'cty02', place: 1},
    {name: 'cty03', place: 2},
    {name: 'cty04', place: 3}
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
    res.send(getAllProducts());
});

app.get('/product/:id', (req, res) => {
    var id = (req.params.id);
    var productInfo = getProduct(id);

    if (productInfo != null){
        res.json(productInfo);
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

function getProductData(intege) {
    var categoryName = null;
    var data = allProductData[intege];

    if(categoryName == null){
        var da = (categories.find( ({ name }) => name === allProductData[intege]["categoryId"] ));
        var tempPlace = da["place"];
        categoryName = allCategoryData[tempPlace]["categoryName"];
    }

    data.categoryName = categoryName;
    return(data);
    categoryName = null;
}

function getProduct (productName){
    var categoryName = null;

    var data = (allProductData.find( ({ id }) => id === productName ));
//var index = (allProductData.indexOf(data));
//console.log(index);
    var finalData = null;

    if(categoryName == null){
            var da = (categories.find( ({ name }) => name === data["categoryId"] ));
            var tempPlace = da["place"];
            categoryName = allCategoryData[tempPlace]["categoryName"];}

    if (data != null){
        //arr.push({'categoryName':`${categoryName}`});
        data.categoryName = categoryName;

        finalData = data;
    } else {
        finalData = null;
    }
    return(
        place = finalData
    )
}

function getCategoryDetails (categoryName){
    var data = (categories.find( ({ name }) => name === categoryName ));
    var placeno = null;

    if (data != null){
        var arrayLength = allProductData.length;
        var allDataOfProducts = [];

        for (var i = 0; i < arrayLength; i++) {
            allDataOfProducts.push(getProductData(i));
        }

        console.log(allDataOfProducts);
        var finder = (allDataOfProducts.filter( ({ categoryId }) => categoryId === categoryName));
        console.log(finder);
        return(
            place = (finder)
        )
    }

    else {
        return(null);
    }


}

function getAllProducts(){
    //const allProductPlaces = Object.keys(products);
    //console.log(allProductPlaces);
    //var iterator = allProductPlaces.values();
    var arrayLength = allProductData.length;
    var allDataOfProducts = [];
    for (var i = 0; i < arrayLength; i++) {
        allDataOfProducts.push(getProductData(i));
        //Do something
    }
    return(allDataOfProducts);
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
