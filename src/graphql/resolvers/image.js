
const { join, parse } = require('path')
const { createWriteStream } = require('fs')

const { BASE_URL, PORT } = require('../../config')

module.exports = {
    Query: {
        info: () => "image method."
    },
    Mutation: {
        imageUploader: async (_, { file }) => {
            let { filename, createReadStream } = await file;
            let stream = createReadStream();
            let { ext, name } = parse(filename)
            name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');
            let serverFile = join(__dirname, `../../uploads/${name}-${Date.now()}${ext}`)
            let writeStream = await createWriteStream(serverFile)
            await stream.pipe(writeStream);
            serverFile = `${BASE_URL}${PORT}${serverFile.split('uploads')[1]}`;

            return serverFile;
        }
    }
}