import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';

const outputFolderName = './public/music';

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/music',
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});
apiRoute.use(upload.array('music'));

apiRoute.post((req, res) => {
    const filenames = fs.readdirSync(outputFolderName);
    const music = filenames.map((name) => name);

    res.status(200).json({ data: music });
});

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
export default apiRoute;