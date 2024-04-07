const shortid = require('shortid');
const URL = require('../Models/Url')

async function handleGenerateNewShortId(req,res) {
    const userData = req.body;
    if(!userData.url) return res.status(400).json({error:'please give the url'})
   
    const shortID = shortid();
    console.log('ShortID:', shortID);

   
        await URL.create({
            shortId: shortID,
            redirectURL: userData.url,
            visitedHistory: [],
            createdBy: req.user._id
        });
        return res.render('home', {
            id: shortID
        })
       
    
}
async function handleAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    console.log(result);
    return res.json({
        totalClick : result.visitedHistory.length , 
        analytics : result.visitedHistory
    })
    
}


module.exports = {
    handleGenerateNewShortId,
    handleAnalytics,
}