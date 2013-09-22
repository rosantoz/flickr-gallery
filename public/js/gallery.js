var Gallery = {
    search        : function (search, page) {
        page = typeof page !== 'undefined' ? page : 1;

        $.ajax('flickr.php', {
            type      : 'POST',
            data      : {
                request: 'search',
                search : search,
                page   : page
            },
            success   : function (response) {
                var xmlDoc = $.parseXML(response)
                    , xml = $(xmlDoc)
                    , rsp = xml.find('rsp')
                    , status = rsp.attr('stat');

                if (status == 'ok') {
                    Gallery.searchSuccess(xml, search, page);
                } else {
                    Gallery.searchError();
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
    searchSuccess : function (xml, search, page) {

        var photos = xml.find('photo')
            , currentPage = xml.find('photos').attr('page')
            , totalPages = xml.find('photos').attr('pages')
            , recordsFound = xml.find('photos').attr('total')
            , thumbnails = $('.thumbnails')

        thumbnails.html('');

        photos.each(function (index, photo) {

            var elementPhoto = $(photo)
                , farm = elementPhoto.attr('farm')
                , server = elementPhoto.attr('server')
                , photoId = elementPhoto.attr('id')
                , photoSecret = elementPhoto.attr('secret')
                , photoUrl = Gallery.photoUrl(farm, server, photoId, photoSecret, 'n')
                , thumbnail = $('<li class="span2"></li>');

            thumbnail.append('<a href="#" class="thumbnail" data-photoid="' + elementPhoto.attr('id') + '"><img src="' + photoUrl + '" /></a>');
            thumbnails.append(thumbnail);

            $('#query').text('"' + search + '"');
            $('#searchInput').val('');

            if (totalPages > 1 && currentPage < 10000) {
                Gallery.pagination(currentPage, totalPages, search);
            }

            Gallery.recordsFound(recordsFound);

        });
    },
    searchError   : function () {
        $('#search-title').show();
        $("#records-found").show().text('Something went wrong. Please try again!');
        $("#query").text('');
        $("#pagination").html('');
        $(".thumbnails").html('');
    },
    pagination    : function (current, total, search) {

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
    recordsFound  : function (recordsFound) {
        var elementRecordsFound = $('#records-found');
        elementRecordsFound.text('');
        if (recordsFound > 0) {
            elementRecordsFound.text(recordsFound + ' records found').show();
        } else {
            elementRecordsFound.text('no records found');
        }
    },
    photoDetails  : function (photoId) {

        $.ajax('flickr.php', {
            type   : 'POST',
            data   : {
                request: 'details',
                photo  : photoId
            },
            success: function (response) {
                var xmlDoc = $.parseXML(response)
                    , xml = $(xmlDoc)
                    , rsp = xml.find('rsp')
                    , status = rsp.attr('stat');

                if (status == 'ok') {
                    Gallery.detailsSuccess(xml);
                } else {
                    Gallery.detailsError();
                }
            }

        });

    },
    detailsSuccess: function (xml) {

        var elementPhoto = xml.find('photo')
            , photoTitleElement = elementPhoto.find('title')
            , photoTitle = photoTitleElement.text()
            , photoDescription = elementPhoto.find('description').text()
            , photographer = elementPhoto.find('owner').attr('realname')
            , farm = elementPhoto.attr('farm')
            , server = elementPhoto.attr('server')
            , photoId = elementPhoto.attr('id')
            , photoSecret = elementPhoto.attr('secret')
            , photoUrl = Gallery.photoUrl(farm, server, photoId, photoSecret, 'z')
            , flickrUrl = elementPhoto.find('urls').find('url[type="photopage"]').text()
            , imageLink = $('<a href="' + flickrUrl + '" title="' + photoTitle + '" target="_blank"></a>')
            , imageElement = $('<img src="' + photoUrl + '" alt="' + photoTitle + '" border="0"/>')
            , userId = elementPhoto.find('owner').attr('nsid');

        $("#photoTitle").text(photoTitle);
        imageLink.append(imageElement);
        $(".modal-body").html(imageLink);
        $("#photo-description").html(photoDescription);
        if (photographer.length) {
            var userProfile = '<a href="http://www.flickr.com/people/' + userId + '" target="_blank">by ' + photographer + '</a>';
            $("#photo-author").html(userProfile);
        }
        $("#photoDetailsModal").modal();
    },
    detailsError  : function () {
        console.log('error');
    },
    photoUrl      : function (farm, server, id, secret, size) {
        return 'http://farm'
                   + farm
                   + '.staticflickr.com/'
                   + server
                   + '/'
                   + id
                   + '_'
                   + secret
                   + '_' + size + '.jpg';
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