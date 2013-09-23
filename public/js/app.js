$(document).ready(function () {
    $('#flickr-search').on('submit', function (event) {
        event.preventDefault();
        var search = $('#searchInput').val();
        if (search.length >= 2) {
            Gallery.search(search);
        }
    });

    $(".thumbnails").on('click', '.thumbnail', function () {
        var photoId = $(this).data('photoid');
        Gallery.photoDetails(photoId);
    });

});