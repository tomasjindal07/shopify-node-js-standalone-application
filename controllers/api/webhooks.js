exports.postUninstall = async (req,res) => {

    await req.shopData.update({status : "D"});
    
    res.status(200).json({
        success : true
    });
};