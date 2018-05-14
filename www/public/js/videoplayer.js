(function(window, document){

	$('.videoPlayer').each(function(){
		var videoControls = $(this).find('#videoControls')[0];
		hideControls.call(videoControls);
		var video = $(this).find('video')[0];
		video.removeAttribute("controls");
		$(this).find('video').removeAttr("controls");
		initProgressBar(video);
	});

	$('.videoPlayer').on('click', '#playButton', play);
	$('.videoPlayer').on('click', '#stopButton', stop);
	$('.videoPlayer').on('click', '#video', play);
	$('.videoPlayer').on('mousedown', '#progressWrap', videoSeek);
	$('.videoPlayer').on('mouseover', '#video', showControls);
	$('.videoPlayer').on('mouseover', '#videoControls', showControls);
	$('.videoPlayer').on('mouseout', '#video', hideControls);
	$('.videoPlayer').on('mouseout', '#videoControls', hideControls);
	//$('.videoPlayer').on('loadeddata', 'video', initVideoControls);

	// 原生的JavaScript事件绑定函数
	function bindEvent(ele, eventName, func){
		if(window.addEventListener){
			ele.addEventListener(eventName, func);
		}
		else{
			ele.attachEvent('on' + eventName, func);
		}
	}
	// 显示video的控制面板
	function showControls(){
		var vplayer = $(this).parents('.videoPlayer')[0]; 
		var videoControls = $(vplayer).find('#videoControls')[0]; 
		videoControls.style.opacity = 1;
	}
	// 隐藏video的控制面板
	function hideControls(){
		var vplayer = $(this).parents('.videoPlayer')[0];
		var videoControls = $(vplayer).find('#videoControls')[0]; 
		videoControls.style.opacity = 0;
	}
	// 控制video的播放
	function play(event) {
		var that = this;
		var vplayer = $(that).parents('.videoPlayer')[0]; 
		var video = $(vplayer).find('video')[0]; 

		$(video).addClass('playing');	// 播放状态

		if ( video.paused || video.ended ){              
			if ( video.ended ) { 
				video.currentTime = 0;
			} 
			video.playbackRate = 1.0;
			video.play();
			$(vplayer).find("#playButton>span").attr("class", "glyphicon glyphicon-pause"); 
			video.startProgress();
		} else { 
			video.pause(); 
			$(vplayer).find("#playButton>span").attr("class", "glyphicon glyphicon-play"); 
			video.stopProgress();
		} 
		$(vplayer).find("#stopButton").removeAttr("disabled");
	}
	// 停止播放
	function stop(event) {
		var that = this;
		var vplayer = $(that).parents('.videoPlayer')[0]; 
		var video = $(vplayer).find('video')[0]; 
		video.pause();
		video.currentTime = 0;
		video.stopProgress();
		// getProgress(vplayer)();
		$(vplayer).find("#playButton>span").attr("class", "glyphicon glyphicon-play"); 
		$(vplayer).find("#stopButton").attr("disabled", "disabled");
		$(video).removeClass('playing');	// 删除播放状态
	}
	// 鼠标在播放条上点击时进行捕获并进行处理
	function videoSeek(event){
		var that = this;
		var vplayer = $(that).parents('.videoPlayer')[0]; 
		var video = $(vplayer).find('video')[0];
		var progressWrap = $(vplayer).find("#progressWrap")[0];
		if(video.paused || video.ended){
			enhanceVideoSeek(event, vplayer, video, progressWrap);
			play.call(that);
		}
		else{
			enhanceVideoSeek(event, vplayer, video, progressWrap);
		}

	}
	// 自定义seek
	function enhanceVideoSeek(event, vplayer, video, progressWrap){
		var playProgress = $(vplayer).find("#playProgress")[0];
		video.stopProgress();
		var length = event.pageX - progressWrap.offsetLeft;
		var percent = length / progressWrap.offsetWidth;
		console.log("percent:" + percent + " video.duration:" + video.duration);
		playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
		video.currentTime = percent * video.duration;
		console.log("video.currentTime = " + video.currentTime);
		video.startProgress();
	}
	// 初始化进度条
	function initProgressBar(video) {
		// var video = this;
		var vplayer = $(video).parents('.videoPlayer')[0];
		// 刷新进度条
		var refresh = function () {
			//var video = $(vplayer).find('video')[0];
			var percent = video.currentTime / video.duration;
			$(vplayer).find("#playProgress").width(percent * ($(vplayer).find("#progressWrap")[0].offsetWidth) -5 + "px");
			$(vplayer).find("#showProgress").text((percent * 100).toFixed(1) + "%");
			if (percent == 1) {
				clearInterval(video.progressFlag);
				video.progressFlag = undefined;
			}
		}
		video.startProgress = function () {
			if (!video.progressFlag)
				video.progressFlag = setInterval(refresh, 100);
		}
		video.stopProgress = function () {
			if (video.progressFlag) clearInterval(video.progressFlag);
			video.progressFlag = undefined;
			refresh();		// 刷新到最初状态
		}
	};
})(window, document);
