import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
	audioRef,
	isPlaying,
	setIsPlaying,
	setSongInfo,
	songInfo,
	currentSong,
	songs,
	setCurrentSong,
	setSongs,
	activeLibraryHandler,
}) => {
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};
	const skipTrackHandler = async (direction) => {
		let CurrentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === "skip-forward") {
			await setCurrentSong(songs[(CurrentIndex + 1) % songs.length]);
			activeLibraryHandler(songs[(CurrentIndex + 1) % songs.length]);
		}
		if (direction === "skip-back") {
			if ((CurrentIndex - 1) % songs.length === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				activeLibraryHandler(songs[songs.length - 1]);
				if (isPlaying) audioRef.current.play();
				return;
			}
			await setCurrentSong(songs[(CurrentIndex - 1) % songs.length]);
			activeLibraryHandler(songs[(CurrentIndex - 1) % songs.length]);
		}
		if (isPlaying) audioRef.current.play();
	};

	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};
	const trackAnimation = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	};
	return (
		<div className="Player">
			<div className="time-controller">
				<p>{getTime(songInfo.currentTime)}</p>
				<div
					style={{
						background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
					}}
					className="track"
				>
					<input
						min={0}
						max={songInfo.duration}
						value={songInfo.currentTime}
						onChange={dragHandler}
						type="range"
					/>
					<div style={trackAnimation} className="animate-track"></div>
				</div>
				<p>{getTime(songInfo.duration)}</p>
			</div>
			<div className="play-controller">
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-back")}
					size="2x"
					className="skip-back"
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					size="2x"
					className="play"
					icon={isPlaying ? faPause : faPlay}
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-forward")}
					size="2x"
					className="skip-forward"
					icon={faAngleRight}
				/>
			</div>
		</div>
	);
};

export default Player;
