const express = require('express');
const {handleGenerateNewShortId ,handleAnalytics} = require('../Controllers/url')
const router = express.Router();

router.post('/',handleGenerateNewShortId);
router.get('/analytics/:shortId',handleAnalytics)


module.exports = router;