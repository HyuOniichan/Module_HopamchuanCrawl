const cheerio = require('cheerio');

const baseUrl = 'https://hopamchuan.com';

// type SongType = {
//     songId: String, 
//     title: String, 
//     artist: String, 
//     lyric: String
// }

class HAC {

    constructor() {
        this.storedSongs = [];
    }

    getStoredSongs() {
        return this.storedSongs;
    }
    getStoredSong(songId) {
        const res = this.storedSongs.find(e => e.songId === songId);
        if (!res) return { message: 'Song not found' }
        return res;
    }
    storeSong(song) {
        const { songId, title, artist, lyric } = song;
        const savedSong = {
            songId,
            title,
            artist,
            lyric
        }
        this.storedSongs.push(savedSong);
    }
    deleteSong(songId) {
        this.storedSongs = this.storedSongs.filter(e => e.songId !== songId); 
    }

    async showSong(songId) {
        const url = `${baseUrl}/song/${songId}/`;

        try {
            const res = await fetch(url);

            if (!res.ok) throw new Error('Failed to fetch data');

            const html = await res.text();
            const $ = cheerio.load(html);

            const lyric = $('#song-lyric').text().trim();
            const title = $('#song-title').text().trim();
            const artist = $('.perform-singer-list').text().trim();

            if (!lyric) return `No lyric found`;
            if (!title) return `...`;
            if (!artist) return `...`;

            const songDetail = {
                songId,
                title,
                artist,
                lyric
            }

            return songDetail;

        } catch (err) {
            console.error('Error: ', err.message);
            return { message: 'Song not found' };
        }
    }

    async searchSongs(keyword) {
        const encodedKeyword = encodeURIComponent(keyword);
        const url = `${baseUrl}/search?q=${encodedKeyword}`;

        try {
            const res = await fetch(url);
            const html = await res.text();
            const $ = cheerio.load(html);

            const songsResult = [];

            $('.song-title-singers').each((index, element) => {
                const link = $(element).extract({
                    songLink: {
                        selector: 'a',
                        value: 'href'
                    }
                }).songLink
                const songId = this.#getSongIdFromLink(link).songId;
                const display = $(element).find('a').text().split('\n');
                const title = display[1].trim();
                const artist = display[2].trim();

                songsResult.push({
                    songId,
                    title,
                    artist
                });

            })

            return songsResult;

        } catch (err) {
            console.error('Error: ', err.message);
            return [];
        }
    }

    #getSongIdFromLink(link) {
        const linkArr = link.split('/');
        const song = {
            songId: linkArr[4],
            title: linkArr[5]
        }
        return song;
    }

    searchArtist() {

    }
}

module.exports = new HAC();

