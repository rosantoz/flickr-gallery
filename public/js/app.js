$(document).ready(function () {
    $('#flickr-search').on('submit', function (event) {
        event.preventDefault();
        var search = $('#searchInput').val();
        if (search.length >= 2) {
            Gallery.search(search);
        }
    });

    $(".thumbnails").on('click', '.thumbnail', function () {

        // OK -- request photo details
        // OK -- on success open a modal window with photos details
        // OK -- include name of the photographer
        // include link on photo to open it in a new page
        // include link to photographer profile
        // document php class
        // publish

        var photoId = $(this).data('photoid');

        Gallery.photoDetails(photoId);

    });

});