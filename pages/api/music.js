import nextConnect from 'next-connect';
import fs from 'fs';

const outputFolderName = './public/music';

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.get((req, res) => {
    const filenames = fs.readdirSync(outputFolderName);
    const music = filenames.map((name) => name);
    res.status(200).json({ data: music });
});

export default apiRoute;