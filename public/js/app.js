$(document).ready(function () {
    $('#flickr-search').on('submit', function (event) {
        event.preventDefault();
        var search = $('#searchInput').val();
        Gallery.search(search);
    });
});