var multer = require('multer'),
    multerS3 = require('multer-s3'),
    fs = require('fs'),
    AWS = require('aws-sdk');
    bucket = process.env.S3_BUCKET_NAME; 

AWS.config.loadFromPath(process.env.S3_CONFIG_PATH);
var s3 = new AWS.S3();


exports.uploadFile = function (req, res, next) {
    console.log("document controller upload file");
    return multer({
        storage: multerS3({
            s3: s3,
         //   acl: 'public-read',
            bucket: bucket,
            key: function (req, file, cb) {
                cb(null, `${Date.now().toString()}-${file.originalname}`)
            }
        })
    }).array('file', 10)(req, res, next);
};

exports.afterFileUPload = function(req, res, next) {
    console.log("fdfdf")
    req.files.forEach(x=>{
        let doc = {
            "name" : x.originalname,
            "__v" : 0,
            "file" : {
                "url" : x.location,
                "bucket" : x.bucket,
                "etag" : x.etag,
                "filename" : x.key,
                "size" : x.size,
                "path" : "/",
                acl: x.acl,
                encoding: x.encoding,
                "mimetype" : x.mimetype
            }
        }
        res.json(doc);
    });

};


exports.getFile = function (req, res) {
    var params = {Bucket: bucket, Key: req.query.filename};
    s3.getObject(params).createReadStream().pipe(res);  
};