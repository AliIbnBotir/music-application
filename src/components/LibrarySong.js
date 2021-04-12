import React from "react";

const LibrarySong = ({
	audioRef,
	song,
	songs,
	setCurrentSong,
	id,
	isPlaying,
	setSongs,
}) => {
	const songSelectorHandler = async () => {
		await setCurrentSong(song);
		//Add active
		const newSongs = songs.map((song) => {
			if (song.id === id) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});
		setSongs(newSongs);
		if (isPlaying) audioRef.current.play();
		// audioRef.current.play();
		// if (isPlaying) {
		// 	const playPromise = audioRef.current.play();
		// 	if (playPromise !== undefined) {
		// 		playPromise.then((audio) => {
		// 			audioRef.current.play();
		// 		});
		// 	}
		// }
	};
	return (
		<div
			onClick={songSelectorHandler}
			className={`library-song ${song.active ? "selected" : ""}`}
		>
			<img alt={song.name} src={song.cover}></img>
			<div className="song-description">
				<h3>{song.name} </h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
