// 为了不随意的创建全局变量，我们将我们的代码放在一个自己调用自己的匿名函数中，这是一个好的编程习惯
(function(window, document){
	// 获取要操作的元素

	// 自定义动态bootstrap组件
	function compile(tplName, data) {
		var _tpls = [{		// 弹出式播放窗口
			name: 'player', template : ' \
			<div class="modal fade" id = "videoPlayerModal" tabindex = "-1" role = "dialog" aria-labelledby="myModalLabel" aria-hidden="true" > \
				<div class="modal-dialog"> \
					<div class="modal-content"> \
						<div class="modal-header"> \
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
							<h4 class="modal-title text-center" id="myModalLabel">{{title}}</h4> \
						</div> \
						{{>videoplayer playinfo}} \
					</div> \
				</div> \
			</div>	\
		'}];
		for(var i=0; i<_tpls.length; i++) {
			if(_tpls[i].name===tplName) {
				try {
					var template = Handlebars.compile(_tpls[i].template);
					var html = template(data);
					return html;
				} catch (e) {
					console.log("Handlebars compile error:", e);
					console.log("template:", template);
					return null;
				}
			}
		}
		return null;
	}

	/////////////////////////////
	// video thumbnails 

	$('.imageWrap').on('click', '.image', showPlayer);
	$('.imageWrap').on('mouseover', '.image', activeImage);
	$('.imageWrap').on('mouseout', '.image', deactiveImage);

	function activeImage() {
		var ele = this;
		$('.imageWrap .image').each(function(){
			if(this!=ele) $(this).removeClass('active');
		})
		$(ele).addClass('active');
	}
	function deactiveImage() {
		var ele = this;
		$(ele).removeClass('active');
	}

	function showPlayer() {
		var that = this;
		console.log("showPlayer");
		var html = compile('player', { 
			title: $(that).attr("data-title"), 
			playinfo: JSON.parse($(that).attr("data-playinfo")) 
		});
		$('#videoPlayerModal').remove();
		$('.page').after(html);

		$('#videoPlayerModal').on('show.bs.modal', function () {
			var video = $(this).find('.videoPlayer video')[0];
			initPlayControls(video);
		});
		$('#videoPlayerModal').on('hide.bs.modal', function () {
			console.log("on 'hide.bs.modal' event")
			var video = $(this).find('.videoPlayer video')[0];
			stop.call(video);
		});

		$('#videoPlayerModal').modal({
			remote: "",//可以填写一个url，会调用jquery load方法加载数据
			backdrop: "static",//指定一个静态背景，当用户点击背景处，modal界面不会消失
			keyboard: true,//当按下esc键时，modal框消失
		});
	}

	/////////////////////////////
	// video player

	function onProgressMouseOver() {
		var that = this;
		$(that).css("cursor", "hand");
	}

	function onProgressMouseOut() {
		var that = this;
		$(that).css("cursor", "pointer");
	}

	// 初始化播放控件
	function initPlayControls(video) {
		console.log("init progress bar...");
		if (video.startProgress) return;
		var vplayer = $(video).parents('.videoPlayer')[0];
		// 刷新进度条
		var refresh = function () {
			//var video = $(vplayer).find('video')[0];
			var percent = video.currentTime / video.duration;
			$(vplayer).find("#playProgress").width(percent * ($(vplayer).find("#progressWrap")[0].offsetWidth) - 5 + "px");
			$(vplayer).find("#showProgress").text((percent * 100).toFixed(1) + "%");
			if (percent == 1) {
				clearInterval(video.progressFlag);
				video.progressFlag = undefined;
			}
		}
		video.startProgress = function () {
			if (!video.progressFlag)
				video.progressFlag = setInterval(refresh, 500);
		}
		video.stopProgress = function () {
			if (video.progressFlag) clearInterval(video.progressFlag);
			video.progressFlag = undefined;
			//refresh();		// 刷新到最初状态
		}

		$(vplayer).on('click', '#playButton', play);
		$(vplayer).on('click', '#stopButton', stop);
		$(vplayer).on('click', '#progressWrap', onVideoSeek);
		$(vplayer).on('mouseover', '#progressWrap', onProgressMouseOver);
		$(vplayer).on('mouseout', '#progressWrap', onProgressMouseOut);
		
	};
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
		console.log("play()");
		var that = this;
		var vplayer = $(that).parents('.videoPlayer')[0]; 
		var video = $(vplayer).find('video')[0]; 
		//initPlayControls(video);

		$(video).addClass('playing');	// 播放状态

		if ( video.paused || video.ended ){              
			console.log("play ...");
			if ( video.ended ) { 
				video.currentTime = 0;
			} 
			video.playbackRate = 1.0;
			video.play();
			$(vplayer).find("#playButton>span").attr("class", "glyphicon glyphicon-pause"); 
			video.startProgress();
		} else { 
			console.log("pause ...");
			video.pause(); 
			$(vplayer).find("#playButton>span").attr("class", "glyphicon glyphicon-play"); 
			video.stopProgress();
		} 
		$(vplayer).find("#stopButton").removeAttr("disabled");
	}
	// 停止播放
	function stop(event) {
		console.log("stop()");
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
	function onVideoSeek(event){
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
		playProgress.style.width = percent * (progressWrap.offsetWidth) + "px";
		video.currentTime = percent * video.duration;
		console.log("video.currentTime = " + video.currentTime);
		video.startProgress();
	}

})(window, document);
 