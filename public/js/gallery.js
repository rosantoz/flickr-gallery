var Gallery = {
    search      : function (search, page) {
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
                    , currentPage = xml.find('photos').attr('page')
                    , totalPages = xml.find('photos').attr('pages')
                    , recordsFound = xml.find('photos').attr('total')
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

                    if (totalPages > 1) {
                        Gallery.pagination(currentPage, totalPages, search);
                    }

                    Gallery.recordsFound(recordsFound);

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
    },
    pagination  : function (current, total, search) {
        var options = {
            currentPage  : current,
            totalPages   : total,
            search       : search,
            onPageClicked: function (e, originalEvent, type, page) {
                Gallery.search(search, page);
            }
        }

        $('#pagination').bootstrapPaginator(options);
    },
    recordsFound: function (recordsFound) {
        var elementRecordsFound = $('#records-found');
        elementRecordsFound.text('');
        if (recordsFound > 0) {
            elementRecordsFound.text(recordsFound + ' records found').show();
        } else {
            elementRecordsFound.text('no records found');
        }
    }

}

var toggleLoadingGif = function () {
    $('#loading').show();
    $('#results').hide();
//    $('.pagination').hide();
}

var showResults = function () {
    $('#loading').hide();
    $('#results').show();
    $('.pagination').show();
}