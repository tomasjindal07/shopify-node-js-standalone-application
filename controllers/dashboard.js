exports.getDashboard = (req,res,next) => {
    res.render('index',{
        shopData: req.shopData
    });
};