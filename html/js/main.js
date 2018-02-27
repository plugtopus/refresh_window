$(function() {
    var ext = chrome.extension.getBackgroundPage(),
        $min = $('#minutes'),
        $sec = $('#seconds'),
        swapButtons = function() {
            $('#start,#stop').toggle();
        };


    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        var timer = ext.timers.get(tabs[0].id);
        if (timer) {
            swapButtons();
            var min = timer.interval / (60 * 1000);
            $min.val(Math.floor(min));
            $sec.val(Math.round((min - Math.floor(min)) * 60));
        } else {
            $min.val(localStorage.defaultMin || 0);
            $sec.val(localStorage.defaultSec || 15);
        }
    });

    $('#start').on('click', function() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            var interval = ($min.val() * 60 * 1000) + ($sec.val() * 1000);
            ext.timers.set(tabs[0], interval);
        });
        swapButtons();
    });

    $('#stop').on('click', function() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            ext.timers.remove(tabs[0].id);
        });
        swapButtons();
    });

    $('#default').on('click', function() {
        localStorage.defaultMin = $min.val();
        localStorage.defaultSec = $sec.val();
        $('#defaultSuccess').show().delay(500).fadeOut('fast');
    });

    setTimeout(function() {
        $sec.focus()[0].select();
    }, 100);

});