// 本程序以浏览video标签列表的页面为基础，当加载多个video标签的视频时，速度过慢。
(function(window, document){
	// 获取要操作的元素
	var video = document.getElementById("video");
	var videoControls = document.getElementById("videoControls");
	var videoContainer = document.getElementById("videoContainer");
	//var controls = document.getElementById("video_controls");
	var playBtn = document.getElementById("playBtn");
	var fullScreenBtn = document.getElementById("fullScreenBtn");
	var progressWrap = document.getElementById("progressWrap");
	var playProgress = document.getElementById("playProgress");
	var fullScreenFlag = false;
	var progressFlag;

	hideControls();

	// 创建我们的操作对象，我们的所有操作都在这个对象上。
	var videoPlayer = {
		init: function(){
			var that = this;
			video.removeAttribute("controls");
			bindEvent(video, "loadeddata", videoPlayer.initControls);
			videoPlayer.operateControls();
		},
		initControls: function(){
			videoPlayer.showHideControls();
		},
		showHideControls: function(){
			bindEvent(video, "mouseover", showControls);
			bindEvent(videoControls, "mouseover", showControls);
			bindEvent(video, "mouseout", hideControls);
			bindEvent(videoControls, "mouseout", hideControls);
		},
		operateControls: function(){
			bindEvent(playBtn, "click", play);
			bindEvent(video, "click", play);
			bindEvent(fullScreenBtn, "click", fullScreen);
			bindEvent(progressWrap, "mousedown", videoSeek);
		}
	}

	videoPlayer.init();

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
		videoControls.style.opacity = 1;
	}
	// 隐藏video的控制面板
	function hideControls(){
		// 为了让控制面板一直出现，我把videoControls.style.opacity的值改为1
		videoControls.style.opacity = 0;
	}
	// 控制video的播放
	function play(){
		if ( video.paused || video.ended ){              
			if ( video.ended ) { 
				video.currentTime = 0;
			} 
			video.play();
			playBtn.innerHTML = "暂停"; 
			progressFlag = setInterval(getProgress, 60);
		} 
		else{ 
			video.pause(); 
			playBtn.innerHTML = "播放";
			clearInterval(progressFlag);
		} 
	}
	// 控制video是否全屏，额这一部分没有实现好，以后有空我会接着研究一下
	function fullScreen(){
		if(fullScreenFlag){
			videoContainer.webkitCancelFullScreen();
		}
		else{
			videoContainer.webkitRequestFullscreen();
		}
	}
	// video的播放条
	function getProgress(){
		var percent = video.currentTime / video.duration;
		playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
		showProgress.innerHTML = (percent * 100).toFixed(1) + "%";
	}
	// 鼠标在播放条上点击时进行捕获并进行处理
	function videoSeek(e){
		if(video.paused || video.ended){
			enhanceVideoSeek(e);
			play();
		}
		else{
			enhanceVideoSeek(e);
		}

	}
	function enhanceVideoSeek(e){
		//console.log("e:", e);
		clearInterval(progressFlag);
		var length = e.pageX - progressWrap.offsetLeft;
		var percent = length / progressWrap.offsetWidth;
		console.log("percent:" + percent + " video.duration:" + video.duration);
		playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
		video.currentTime = percent * video.duration;
		console.log("video.currentTime = " + video.currentTime);
		progressFlag = setInterval(getProgress, 60);
	}

})(window, document);
