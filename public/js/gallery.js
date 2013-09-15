var Gallery = {
    search: function (search, page) {
        page = typeof page !== 'undefined' ? page : 1;

        var promise = $.Deferred();

        $.ajax('flickr.php', {
            type      : 'POST',
            data      : {
                search: search,
                page  : page
            },
            success   : function (response) {
                var xmlDoc = $.parseXML(response)
                    , xml = $(xmlDoc)
                    , photos = xml.find('photo')
                    , thumbnails = $('.thumbnails')
                    , photoUrl;

                thumbnails.html('');

                photos.each(function (index, photo) {

                    var elementPhoto = $(photo);

                    photoUrl = 'http://farm'
                                   + elementPhoto.attr('farm')
                                   + '.staticflickr.com/'
                                   + elementPhoto.attr('server')
                                   + '/'
                                   + elementPhoto.attr('id')
                                   + '_'
                                   + elementPhoto.attr('secret')
                        + '_n.jpg';

                    var thumbnail = $('<li class="span2"></li>');
                    thumbnail.append('<a href="#" class="thumbnail"><img src="' + photoUrl + '" /></a>');
                    thumbnails.append(thumbnail);

                    $('#query').text('"' + search + '"');
                    $('#searchInput').val('');
                });

            },
            error     : function (error, error2) {
                console.log(error);
                console.log(error2);
            },
            beforeSend: function () {
                toggleLoadingGif();
            },
            complete  : function () {
                showResults();
            }
        });
        return promise;

    }

}

var toggleLoadingGif = function () {
    $('#loading').show();
    $('#results').hide();
    $('.pagination').hide();
}

var showResults = function () {
    $('#loading').hide();
    $('#results').show();
    $('.pagination').show();
}