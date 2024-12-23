# Module_HopamchuanCrawl

## Description 
Như tên luôn, cào data từ web [hopamchuan](https://hopamchuan.com/), mong là không bị ăn gậy :D   
Thích chơi guitar nhưng bố mẹ bắt làm dân IT, vậy nên bằng tâm hồn thơ mộng của chàng lãng tử đập vỡ cây đàn, chiếc repo này ra đời 😎 

## Installation 
```bash
git clone https://github.com/HyuOniichan/Module_HopamchuanCrawl.git
cd Module_HopamchuanCrawl
```

## Usage 

### 0. Import 
```javascript
const HAC = require('Module_HopamchuanCrawl')
```

### 1. Example 
Sương sương use case 
```javascript 
(async () => {
    // search songs 
    const keyword = "con mua ngang qua";
    const songs = await HAC.searchSongs(keyword);

    // based on use case, get the song by songId 
    const songFound = songs.find(e => e.songId === '2691'); 

    // get con mua ngang qua for example and return song details 
    const cmnq = await HAC.showSong('2691'); 

    // save song 
    HAC.storeSong(cmnq); 

    // get all saved songs 
    console.log(HAC.getStoredSongs()); 

    // get song with id 
    console.log(HAC.getStoredSong('2691')); 
    
    // delete song 
    HAC.deleteSong('2691'); 

    // and return song not found 
    console.log(HAC.getStoredSong('2691')); 
})();
```

### 2. Tìm kiểm bài hát 
```javascript
const keyword = "con mua ngang qua";
const songs = await HAC.searchSongs(keyword);
console.log(songs) // Các bài hát tìm được (songId, title, artist)
```
(Mấy cái sau sẽ dùng songId cho tiện)

### 3. Chi tiết bài hát 
```javascript 
const songDetails = await HAC.showSong(songId);
```
Nhả ra songId, title, artist, lyric kèm hợp âm 

### 4. Lưu/lấy bài hát
```javascript 
const song = {
    songId: "221224",
    title: "Chuyen kenh",
    artist: "Candy",
    lyric: "Moi quan he giua chung ta la gi?"
};

HAC.storeSong(song); // Lưu bài hát
const storedSongs = HAC.getStoredSongs(); // Lấy tất cả bài hát đã lưu
const song = HAC.getStoredSong("221224"); // Lấy bài hát bằng songId 
```

### 5. Xóa bài hát 
```javascript 
HAC.deleteSong("221224"); // Lưu bài hát
const song = HAC.getStoredSong("221224"); // Trả về Song not found
```

### 6. Lấy hợp âm
```javascript 
const song = showSong("2691")
const chords = HAC.extractChords(song.lyric, false); // Lấy tất cả hợp âm 
const uniqeChords = HAC.extractChords(song.lyric); // Lấy vòng hợp âm cơ bản 
// params thứ 2 (unique) mặc định là true
```

## License 
MIT license 

## Note 
+ Dữ liệu được lấy từ: [hopamchuan](https://hopamchuan.com/)
+ Trong trường hợp repo này bị điều tra bởi các cơ quan, tổ chức có thẩm quyền, cũng như admin quản lý của web hopamchuan,
tôi khẳng định mình không liên quan tới những hành vi bất hợp pháp hay hội nhóm có ý đồ xấu. Tôi không rõ tại sao repo này
lại có mặt ở đây vào thời điểm này, có lẽ repo này của tôi đã được thêm bởi một bên thứ ba. Tôi cũng xin khẳng định rằng
mình không hề giúp sức cho những hành động cố tình phá hoại hay tấn công có chủ đích trang web chính chủ. 







