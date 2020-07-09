import app from './app';
const port = 3000


async function main() {
    await app.listen(port, () => {
        console.log(`App running on port http://localhost:${port}.`)
    });    
};

main();