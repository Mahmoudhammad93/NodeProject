$(function(){
    'use strict';

    $(document).on('click', '.desc p', function(){
        $(this).toggleClass('show');
    });

    // Plus And Minus Count Items
    $(document).on('click', '#plus', function () {
        var parent = $(this).parents('.item');
    	parent.find('.count').val(+parent.find('.count').val() + 1);
    });
    $(document).on('click', '#minus', function () {
        var parent = $(this).parents('.item');
        if (parent.find('.count').val() > 1) {
            if (parent.find('.count').val() > 1) parent.find('.count').val(+parent.find('.count').val() - 1);
        }
    });
});