import fs from 'fs';

const outputFolderName = './public/music';

export default function handler(req, res) {
  fs.unlinkSync(`${outputFolderName}/${req.body.name}`)
  const filenames = fs.readdirSync(outputFolderName);
  const music = filenames.map((name) => name);
  res.status(200).json({ data: music });
}