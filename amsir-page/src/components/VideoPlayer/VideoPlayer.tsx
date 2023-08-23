function VideoPlayer(props: any){

	var poster: string = props.video.poster? props.video.poster : undefined;
	var autoplay: boolean = props.video.autoplay? props.video.autoplay : false;

	return <>
	<div>
		<video controls autoPlay={autoplay} poster={poster}>
			<source
				src={props.video.src}
				type="video/mp4"
			/>
			Your browser does not support the video tag.
		</video>
	</div>
	</>
};

export default VideoPlayer;