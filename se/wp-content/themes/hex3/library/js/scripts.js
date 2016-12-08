var hex_replace = function($){
    jQuery(document).ready(function($){
        var w_wrap = $('#main').innerWidth();
        var w_hex = $('.hex-frame').outerWidth();
        var count = parseInt(w_wrap / (w_hex * 0.8));

        if($(window).width() > 750) count -= 1;

        $('.hex-container').each( function(){
            var i = 1;
            $(this).find('.hex-row').remove();

            $(this).find('.hex-wrapper').each(function(ind,elem){
                $(elem).removeClass('even');
                $(elem).removeClass('last-row');

                ind += 1;

                if( i%2 === 0 ) $(elem).addClass('even');

                if(ind%(count) === 0){
                    $(elem).addClass('last-row');
                    $(elem).after('<div class="hex-row">');
                    i = 0;
                }
                i++;
            });
        });

        if ($(window).width() > 460){
            var m = 1;

            $('.hex-container-main .hex-wrapper').each( function( mind ) {
                mind += 1;
                if( m%2 != 0 ) $(this).addClass('even');
                if(m%3 == 0) m = 1;
                else m++;
            });

        }
        else{
            $('.hex-container-main .hex-wrapper').each( function( mind ) {
                $(this).removeClass('even');
                $(this).removeClass('last');
                $(this).removeClass('last-row');
            });
        }
    });
};

var hex_postpend = function(data){
    jQuery(document).ready(function($){
        $('.load_more button').on('click touchstart', function() {
            id = $(this).attr('data-id');
			btn = $(this);
            postpend = $('#'+id).find('.postpend');
            content = $('#'+id).find('.games-container');
			
            if(postpend){
                data.offset  = parseInt(postpend.attr('data-offset'));
                data.perpage = parseInt(postpend.attr('data-perpage'));
                data.args    = postpend.attr('data-args');

                jQuery.post( '/wp-content/themes/hex3/queries.php', data, function(response) {
                    if(response.length > 0){
                        content.html(content.html() + response);
                        postpend.attr( 'data-offset', data.offset + data.perpage);
                        /*
                        if(content.find('.game-box').length % data.offset != 0){
                                btn.css('display', 'none');
                        }
                        */
                    }else{
                        btn.css('display', 'none');
                    }
                });
            }
        });
    });
};

var hex_slider_info_resize = function(){
    jQuery(document).ready(function($){
        all = 0;
        var container = $('.slide-inner');
        container.find('.col').each(function(){
            if( ! $(this).hasClass('info')){
                all += $(this).innerWidth();
            }
        });
        if(all > 0 && $(window).width() > 750){
            $('.slide-inner .col.info').css(
                'width', container.innerWidth() - all - 10 + 'px'
            );
        }else{
            $('.slide-inner .col.info').css(
                'width', '100%'
            );
        }
        
    });
};

var hex_delay = (function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();


function mobilecheck() {
    var check = false;
    (function(a) {
        if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
            check = true;
        }
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
function updateViewportDimensions() {
    var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
    return { width:x,height:y };
}
var viewport = updateViewportDimensions();

/* top menu */
jQuery(document).ready(function($) {
    
    var clickevent = 'click';
    var menu = $('#mainNavigation');
        
    if(viewport.width < 992 || mobilecheck()){
        menu.removeClass('desctop').addClass('mobile');
        $('#langMenu').addClass('mobile').appendTo(menu.find('ul#menu-top_menu'));
    }else{
        menu.removeClass('mobile').addClass('desctop');
        $('#langMenu').removeClass('mobile').appendTo('header.header');
    }    
        
    function replaceMenuItem(menu){
        if( menu.hasClass('desctop') && menu.outerWidth() > $('header.header').width() - ($('#langMenu').outerWidth() + 200) ){

            var hideshow = menu.find('.hideshow');
            var item = menu.find('ul#menu-top_menu > li.menu-item').last();

            hideshow.css('display', 'inline-block');

            item.appendTo($('.hideshow ul'));

            replaceMenuItem(menu);
        }
    }
    
    replaceMenuItem(menu);
        
    $('#navToggle').on(clickevent, function(){

        if(menu.hasClass('active')){
            menu.removeClass('active').removeClass('subOpen');
            menu.find('li.active').removeClass('active');
        }else{
            menu.addClass('active');
        }
    });

    $('.ddArrow').on(clickevent, function(){
        
        menu.addClass('subOpen');
        
        $(this).closest('.sub').addClass('active');
        $(this).closest('.sub-menu').addClass('open');
    });

    $('.back').on(clickevent, function(e){
        
        e.preventDefault();
        var subact = menu.find('.sub-menu.open');
        
        $(this).closest('.sub.active').removeClass('active');
        subact.removeClass('open');
        
        if(subact.length < 2){
            menu.removeClass('subOpen');
        }
    });
    
	function closeMenu(menu){
		if(menu.hasClass('active')){
            menu.find('.sub-menu.open').removeClass('open');
			menu.find('.sub.active').removeClass('active');
            menu.removeClass('active').removeClass('subOpen');
        }
	}
	
    $('#content').on(clickevent, function(e){
        closeMenu(menu);
    });
	$(window).scroll(function(e) {
		closeMenu(menu);
	});
});

jQuery(document).ready(function($) {
    hex_slider_info_resize();
    
    $(window).resize(function() {
        hex_slider_info_resize();
    });
});

var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
        if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

var timeToWaitForLast = 100;

jQuery(document).ready(function($) {
    hex_replace();
    
    $(window).resize(function() {
        hex_delay(function(){ hex_replace(); }, 250);
    });
	
    $('ul.tabs li').click(function(){
        hex_replace();
    });
});

jQuery(document).ready(function($){
   
    $('ul.tabs li').click(function(){
        var tab_id = $(this).children('a').attr('href');
        			
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
    });
    
    $(".scroll").click(function(event){
        event.preventDefault();
        
        var trgt = $(this).attr('data-tab');
        var target_offset = $("#"+trgt).offset();
        var target_top = target_offset.top - $('.header').height();

        window.location.hash = trgt;

        $('html, body').animate({scrollTop:target_top}, 500);
    });
	
    if(window.location.hash) {
        var hash = window.location.hash.substring(1);
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
    }
	
    rh = $('.review').height() - 20;
    $('.review div').css('min-height',rh+'px');

});
	

function playDemo(code){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        location.replace(code);
    }
    else{
        var pid = document.getElementById('gameID').value;
        var img = document.getElementById('gameThumbnail'); 
        var width = img.clientWidth;
        /*var height = width * 0.74;*/
        var height = img.clientHeight + (img.clientHeight * 0.01);
        document.getElementById('gameThumbnail').innerHTML = '<iframe id="gameIframe" src="'+code+'" width="'+width+'px" height="'+height+'px" frameborder="0" noscroll="noscroll" scrolling="no" style="overflow:hidden;height:'+height+'px"></iframe>';
    
        jQuery(document).ready(function($) {
            $('body').activity({
                'achieveTime':10
                ,'testPeriod':10
                ,useMultiMode: 1
                ,callBack: function () {
                    $.ajax({
                        url: "/wp-content/plugins/slot-bundle/ajax.php",			
                        type: "POST",			
                        cache:true,			
                        data: {
                            shb_module:'playcount',
                            post_id:pid
                        }					
                    });
                }
            });
        });
    }
}

jQuery(document).ready(function($) {
    
    function gameFrame(){
        var img = $('#gameThumbnail');
        var button = $('#gameButtons');
        var pos_x = ( img.width() - button.width() ) / 2;
        var pos_y = ( img.height() - button.height() ) / 2;

        if(img.height() == 0) var pos_y_str = '40%';
        else var pos_y_str = pos_y + 'px';

        $('#gameButtons').css({'top':pos_y_str, 'left':pos_x + 'px'});
    }
    
    gameFrame();
        
    $(window).resize(function() {
        hex_delay(function(){
            gameFrame();
        }, 0);
    });
    
    $('ul.tabs li').click(function(){
        gameFrame();
    });
	
    $('#toDemoBtn').click(function(){
        gameFrame();
    });
});


jQuery(document).ready(function($) {
    function toggle(section_id, scroll){
        
        var default_height = 300;
        var toggle_section = $('#'+section_id);
        var toggle_action = toggle_section.find('.toggle-action');
        
        if(toggle_section.hasClass('toggle-closed')){
            toggle_section.animate({ 'height' : '100%' },250);
            toggle_section.removeClass('toggle-closed').addClass('toggle-opened');
            
            toggle_action.find('.first').css('display','inline-block');
            toggle_action.find('.second').css('display','none');
        }else{
            toggle_section.animate({ 'height' : default_height + 'px' },20);
            toggle_section.removeClass('toggle-opened').addClass('toggle-closed');
            
            toggle_action.find('.first').css('display','none');
            toggle_action.find('.second').css('display','inline-block');
            
            if(scroll === 'scroll'){
                var target_offset = toggle_section.offset();
                var target_top = target_offset.top - $('.header').height();
                $('html, body').animate({scrollTop:target_top}, 500);
            }
        }
    }
        
    $('.toggle-action').click(function(){
        var section_id = $(this).parent().attr('id');
        toggle(section_id, 'scroll'); 
    });
	
    $('body').activity({
        'achieveTime':2
        ,'testPeriod':2
        ,useMultiMode: 1
        ,callBack: function () {
            $('.toggle').each(function(){
                var section_id = $(this).attr('id');
                toggle(section_id, null);
            });
        }
    });
});

( function( $ ) {
    $( document ).ready(function() {
	function sticky_footer(){
        var browserHeight = $(window).height(),
        footerOuterHeight = $('.footer').outerHeight(true),
        sliderOuterHeight = $('.slider').outerHeight(true),
        headerOuterHeight = $('.header').outerHeight(true),
        mainHeightMarginPaddingBorder = $('#content').outerHeight(true) - $('#content').height();
        $('#content').css({
        'min-height': browserHeight - footerOuterHeight - mainHeightMarginPaddingBorder - sliderOuterHeight - headerOuterHeight,
        });
	}
	sticky_footer();
	$(window).resize(function () {
            sticky_footer();
	});
});
} )( jQuery );

/* additional functions */

(function( $ ){
var timerHand = 0, data = {}, eventFlag = 0, methods = {
    init:function(settings) {
        return this.each(function() {
            data = jQuery.extend({
                achieveTime: 60
                ,loop:0
                ,eventList:'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error'
                ,testPeriod: 10
                ,useMultiMode : 1
                ,callBack: function (e) { console.log('Achieved!') }
                ,watchEvery: 1
                ,counter : {'test':0, 'achiev':0}
            }, settings);

            data.watchEvery *= 1000;

            if(data.useMultiMode) {
                methods.loadMultiData();
            }

            if(data.counter.achiev != -1) {
                $(this).bind(data.eventList, methods.eventTrigger);
                methods.process();
            }
        })
    }, process:function() {
        data.counter.test += 1;

        if(data.counter.test == data.testPeriod) {
            if(eventFlag) {
                eventFlag = 0;
                data.counter.achiev += data.testPeriod;
            }
            data.counter.test = 0;
        }

        timerHand = setTimeout(methods.process, data.watchEvery);
        if(data.counter.achiev >= data.achieveTime) {
            if(!data.loop) clearTimeout(timerHand);
            data.counter.achiev = data.loop ? 0 : -1;
            data.callBack.call(this,data);
        }
        if(data.useMultiMode) document.cookie = 'activity=' + data.counter.test+'|'+data.counter.achiev+'; path=/;';

        }, eventTrigger:function() {
            eventFlag = 1;
        }, loadMultiData:function() {
            var search = ' activity=';
            var cookie = ' ' + document.cookie;
            if (cookie.length > 0) {
                if (cookie.indexOf(search) != -1) {
                    offset = cookie.indexOf(search) + search.length;
                    var m = unescape(cookie.substring(offset, cookie.indexOf(";", offset) == -1 ? cookie.length : cookie.indexOf(";", offset))).split('|');
                    data.counter.test = m[0];
                    data.counter.achiev = m[1];
                }
            }
            data.counter.test = data.counter.achiev = 0;
        }};

        $.fn.activity = function(method) {
            if(methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else {
                if(typeof method === "object" || !method) {
                    return methods.init.apply(this, arguments);
                } else {
                    $.error("Method " + method + " does not exist on jQuery.activity");
                }
            }
        };
})( jQuery );

jQuery(document).ready(function($){

    $(".close").on('click', function(event){
        var id = $(this).attr('data-id');
        $('#'+id).css('display','none');
    });

    $(".open").on('click', function(event){
        var id = $(this).attr('data-id');
        $('#'+id).css('display','block');
    });

}); 