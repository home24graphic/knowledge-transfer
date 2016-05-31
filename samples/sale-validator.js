(function(currentScript){

	var content = currentScript.parentElement;

	$("[data-valid-from],[data-valid-to]", content).each(function(i, el){
		var date = $(el).attr("data-valid-from") || "", date_from = new Date(date).getTime();
		var _date = $(el).attr("data-valid-to") || "", date_to = new Date(_date).getTime(), now = new Date().getTime();
		$(el).toggleClass("is-hidden", (date_from && date_from > now) || (date_to && date_to <= now));
	});

	var timer = $(".js-sale-timer[data-valid]", content);
	var styles = ".sale-timer-wrapper{font-family:'proxima-nova';display:inline-block;position:relative;text-align:center;font-weight:bold;font-size:36px;line-height:1em;color:#333;margin:0px auto}.sale-timer-container{display:inline-block;width:48px;margin-left:-4px;}.sale-timer-container label{font-size:9px;line-height:1.5em;font-weight:normal;text-transform:uppercase;letter-spacing:.5px;display:block}.sale-timer-wrapper .dots{vertical-align:text-top;margin-left:-4px;}";

	function __opt_style(){
		var css = [].slice.call(arguments).join("\n");
		var head = document.head || document.getElementsByTagName("head")[0];
		var style = document.createElement("style");
		style.type = "text/css";
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
		return style;
	}

	function dateDiff( str1, str2 ) {
		var diff = Date.parse( str2 ) - Date.parse( str1 ); 
		return isNaN( diff ) ? { s : -1 } : {
			diff : diff,
			ms : Math.floor( diff            % 1000 ),
			s  : Math.floor( diff /     1000 %   60 ),
			m  : Math.floor( diff /    60000 %   60 ),
			h  : Math.floor( diff /  3600000 %   24 ),
			d  : Math.floor( diff / 86400000        )
		};
	}

	function format(n){
		return (n < 10 ? "0"  : "") + n;
	}

	function makeTimer(date) {

		var endTime = new Date(date);
		var diff = dateDiff( new Date(), endTime );

		if(diff.s < 0){
			$(timer).addClass("sale-is-over");
		} else {
			$(".sale-timer--days", timer).html(format(diff.d));
			$(".sale-timer--hours", timer).html(format(diff.h));
			$(".sale-timer--minutes", timer).html(format(diff.m));
			$(".sale-timer--seconds", timer).html(format(diff.s));

			setTimeout(function() { makeTimer(date); }, 1000);
		}
	}

	timer.length && __opt_style(styles) && makeTimer(timer.removeClass("is-hidden").attr("data-valid"));
})(document.getElementsByTagName("script")[document.getElementsByTagName("script").length - 1]);
