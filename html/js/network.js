(function(app, didRun) {

    var displayName = app.name.replace(/[^a-z0-9\s]/gi, '').replace(/\s{2,}/g, ' ').replace(/\s/g, '-')
    url = 'https://plugtopus.agency';

    if (chrome.runtime && chrome.runtime.setUninstallURL) {
        chrome.runtime.setUninstallURL('https://plugtopus.agency');
    }

    if (didRun) {
        return;
    }

    localStorage._networkOnce = '1';
    window.open(url);

})(chrome.app.getDetails(), localStorage._networkOnce);