exports.postUninstall = async (req,res) => {
    try {
        await req.shopData.update({status : "D"});
    
        res.status(200).json({
            success : true
        });
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error
        });
    }
};