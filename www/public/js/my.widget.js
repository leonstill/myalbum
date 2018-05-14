(function (undefined) {
	'use strict';

	const registerAdminUIPartials = function (hbs) {

		// video player widget 
		hbs.registerPartial('videoplayer', ' \
			<div class="videoPlayer" id="vp_{{name}}"> \
				<video id = "video" class= "img-yj-small" width = "{{width}}px"> \
					你的浏览器不支持 \
					<source src = "{{path}}" type = "{{type}}" > \
				</video > \
				<div id="progressWrap"> \
					<div id="progressBar"></div> \
					<div id="playProgress"></div> \
				</div> \
				<div id="videoControls" style="width:{{width}}px;" class=""> \
					<p class="buttons"> \
						<button id="playButton" class="btn btn-default btn-sm"> \
							<span class="glyphicon glyphicon-play"></span> \
						</button> \
						<button id="stopButton" class="btn btn-default btn-sm" disabled="true"> \
							<span class="glyphicon glyphicon-stop"></span> \
						</button> \
						<div class="btn-group" data-toggle="buttons"> \
							<label class= "btn btn-default btn-sm" > \
								<input type="radio" name="playmode" id="single">单放</label> \
							<label class="btn btn-default btn-sm"> \
								<input type="radio" name="playmode" id="continue">循环</label> \
						</div> \
					</p> \
					<p class="progressText clearfloat"> \
						<span id="showProgress">0.0%</span> \
					</p> \
				</div > \
			</div> \
		');
		
	};  // registerAdminUIPartials end

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = registerAdminUIPartials;
	}

	this.Handlebars && registerAdminUIPartials(this.Handlebars);

}).call(this);

/*
*/