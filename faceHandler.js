const fetch = require('node-fetch');

async function getRepoPNGFilesInDirectory(owner, repo, path) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch directory details. Status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            const pngFiles = data
                .filter(item => item.type === 'file' && item.name.endsWith('.png'))
                .map(item => item.name.replace('.png', ''));

            // console.log(`List of PNG files in the '${path}' directory:`, pngFiles);
            return(pngFiles);
        } else {
            console.error('Unexpected response format from GitHub API');
        }
    } catch (error) {
        console.error('Error fetching directory details:', error.message);
    }
}

async function getPokemonPortraitOptions(pokemon) {
    const owner = 'PMDCollab';
    const repo = 'SpriteCollab';
    const directoryPath = `portrait/${pokemon}`;
    const options = await getRepoPNGFilesInDirectory(owner, repo, directoryPath);
    console.log(options);
    return options;
}

// getPokemonPortraitOptions("0001");


module.exports = {
    getPokemonPortraitOptions
};