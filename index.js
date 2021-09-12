const express = require('express');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
const multer = require('multer')
const app = express();
const PORT = 9009;
app.use(express.json())

dotenv.config();

cloudinary.config(
{
    cloud_name: 'dow8sz2ff',
    api_key: '123734397692392',
    api_secret: '7ZF9FoTFRBPSjl9QvUAc0wafEcc'
}
)

const storageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "./public/image");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload = multer({storage:storageEngine});


app.post('/post', upload.single('image'), async(req,res)=>{

    const img = req.file;
    console.log(img)
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    console.log(result)
    const imageURL = result.url;
    console.log(imageURL);


})

app.listen(PORT, ()=>{
    console.log('It is working')
})