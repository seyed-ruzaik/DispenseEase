// Assuming you have the process.env.DB_PORT defined in your TypeScript configuration or .env file
function getImageUrl(filename: string | undefined): string {
        const urlRegex = /(https?|http):\/\/\S+/i;
        if (urlRegex.test(<string>filename)) {
            return `${filename};`
        }

        return `http://localhost:${process.env.APP_PORT}/uploads/profile_pics/${filename}`;
}

export { getImageUrl };
