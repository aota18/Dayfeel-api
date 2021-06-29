import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import * as multer from 'multer';

const AWS_S3_BUCKET_NAME= process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();

AWS.config.update({
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
})



@Injectable()
export class ImageService {

    constructor(
        private readonly config : ConfigService
    ){}
    async uploadImage(@Req() req, @Res() res){
        try {
            console.log(this.config.get('AWS_S3_BUCKET_NAME'));
            this.upload(req, res, function(err) {
                if(err){
                    console.log(err);
                    return res.status(404).json(`Failed to upload image file: ${err}`)
                }
                
                return res.status(201).json("Success");
            });
        }catch (e){
            console.log(e);
            return res.status(500).json(`Failed to upload image file: ${e}`)
        }
        
    }

    upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: this.config.get('AWS_S3_BUCKET_NAME'),
            acl: 'public-read',
            key: function(req, file, cb){
                console.log(file)
                cb(null, file.originalname);
            }
        })
    });
}
