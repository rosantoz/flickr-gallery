var Gallery = {
    search         : function (search, page) {
        page = typeof page !== 'undefined' ? page : 1;

        $.ajax('flickr.php', {
            type      : 'POST',
            data      : {
                search: search,
                page  : page
            },
            success   : function (response) {
                var xmlDoc = $.parseXML(response)
                    , xml = $(xmlDoc)
                    , rsp = xml.find('rsp')
                    , status = rsp.attr('stat');

                if (status == 'ok') {
                    Gallery.successResponse(xml, search, page);
                } else {
                    Gallery.errorResponse();
                }
            },
            error     : function (jqXHR, textStatus) {
                console.log(jqXHR);
                console.log(textStatus);
            },
            beforeSend: function () {
                toggleLoadingGif();
            },
            complete  : function () {
                showResults();
            }
        });
    },
    successResponse: function (xml, search, page) {

        var photos = xml.find('photo')
            , currentPage = xml.find('photos').attr('page')
            , totalPages = xml.find('photos').attr('pages')
            , recordsFound = xml.find('photos').attr('total')
            , thumbnails = $('.thumbnails')

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

            if (totalPages > 1 && currentPage < 10000) {
                Gallery.pagination(currentPage, totalPages, search);
            }

            Gallery.recordsFound(recordsFound);

        });
    },
    errorResponse  : function () {
        $('#search-title').show();
        $("#records-found").show().text('Something went wrong. Please try again!');
        $("#query").text('');
        $("#pagination").html('');
        $(".thumbnails").html('');
    },
    pagination     : function (current, total, search) {

        var options = {
            currentPage  : current,
            totalPages   : total,
            search       : search,
            numberOfPages: 5,
            onPageClicked: function (e, originalEvent, type, page) {
                Gallery.search(search, page);
            }
        }
        $('#pagination').bootstrapPaginator(options);
    },
    recordsFound   : function (recordsFound) {
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
}

var showResults = function () {
    $('#loading').hide();
    $('#results').show();
    $('#search-title').show();
}