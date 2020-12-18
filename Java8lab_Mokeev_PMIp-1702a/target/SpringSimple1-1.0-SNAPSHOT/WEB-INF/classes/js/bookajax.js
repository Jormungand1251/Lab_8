$(document).ready(function () {
    var count = 1;
    getBooks();
    var json = '';
    var body = $('body');
    body.on('click', '.jsDeleteButton', function () {
        deleteBook($(this).val());
    });
    body.on('click', '.jsEditButton', function () {
        $('.sendBook').prop("disabled", true);
        $('.editBook').prop("disabled", false);
        $('.addDiv').css({'display': "none"});
        $('.editDiv').css({'display': "block"});
        $('.labelBookId').css({'display': "block"});
        $('.inputBookId').css({'display': "block"});
        getBook($(this).val());
    });
    body.on('click', '.editBook', function () {
        editBook();
        $('.sendBook').prop("disabled", false);
        $('.editBook').prop("disabled", true);
    });

    $('#newBookForm').submit(function (event) {
        var counter = (function () {
            return function () {
                return count++;
            }
        }());
        var i = counter();
        var title = $('.bookTitle').val();
        var author = $('.bookAuthor').val();
        json = {"id": i, "bookTitle": title, "bookAuthor": author};

        $.ajax({
            url: window.location.origin + '/books/add/ajax',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(json),
            type: "POST",
            dataType: 'json',
            async: true,
            success: function (s) {
                successMessage(s);
                getBooks();
            },
            error: function (e) {

                alert(e.responseText);
            }
        });

        event.preventDefault();
    });

    function successMessage(book) {
        $(".showAjax").html(json);
        var respContent = "";

        respContent += "<span class='success'>Book was added: [";
        respContent += book.bookTitle + " : ";
        respContent += book.bookAuthor + "]</span>";

        $(".addBookFromResponse").html(respContent);
    }

    function getBooks() {
        $.ajax({
            type: "GET",
            url: window.location.origin + '/books/ajax',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (s) {
                fillTable(s)
            },

            error: function (e) {

                alert(e.responseText);
            }
        })
    }

    function getBook(id) {
        $.ajax({
            type: 'GET',
            url: window.location.origin + '/books/ajax/' + id,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: true,
            success: function (s) {
                fillEditFields(s);
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
    }

    function fillTable(items) {
        var trHTML = '<table class="tg">\n' + '        <tbody>\n' + '        <tr>\n' + '            <th width="80">ID</th>\n' + '            <th width="120">Title</th>\n' + '            <th width="120">Author</th>\n' + '            <th width="60">Edit</th>\n' + '            <th width="60">Delete</th>\n' + '        </tr>';

        items.forEach(function (item) {

            trHTML += '<tr>' + '<td>' + item.id + '</td>' + '<td>' + item.bookTitle + '</td>' + '<td>' + item.bookAuthor + '</td>' + '<td>' + '<button class="jsEditButton" type="button" value="' + item.id + '">' + 'Edit' + '</button></td>' + '<td>' + '<button class="jsDeleteButton" type="button" value="' + item.id + '">' + 'Delete' + '</button></td>' + '</tr>';
        });

        trHTML += '</tbody>\n' + '           </table>';
        $('.fromAjax').html(trHTML);

    }

    function deleteBook(id) {

        $.ajax({
            type: "DELETE",
            url: window.location.origin + '/books/remove/ajax/' + id,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: true,
            success: function (s) {

                successDeleteMessage(s);
                getBooks();
            },
            error: function (e) {

                alert(e.responseText);
            }
        });
    }

    function successDeleteMessage(book) {
        $(".showAjax").html(json);
        var respContent = "";

        respContent += "<span class='success'>Book was deleted: [";
        respContent += book.bookTitle + " : ";
        respContent += book.bookAuthor + "]</span>";

        $(".addBookFromResponse").html(respContent);
    }

    function editBook() {
        var book = getBookFromFields();

        $.ajax({
            type: 'PUT',
            url: window.location.origin + '/books/edit/ajax',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(book),
            dataType: 'json',
            async: true,
            success: function (s) {
                changeVisible();
                getBooks();
                successEditMessage();
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
    }

    function successEditMessage() {
        $(".showAjax").html(json);
        var respContent = "";

        respContent += "<span class='success'>Book succssesfully edited</span>";

        $(".addBookFromResponse").html(respContent);
    }

    function changeVisible() {
        $('.addDiv').css({'display': "block"});
        $('.editDiv').css({'display': "none"});
        $('.labelBookId').css({'display': "none"});
        $('.inputBookId').css({'display': "none"});
        refreshFields();
    }

    function refreshFields() {
        $('.bookTitle').val("");
        $('.bookAuthor').val("");
    }

    function getBookFromFields() {
        var book = {};
        book["id"] = $('.inputBookId').val();
        book["bookTitle"] = $('.bookTitle').val();
        book["bookAuthor"] = $('.bookAuthor').val();

        return book;
    }

    function fillEditFields(book) {
        $('.inputBookId').val(book.id);
        $('.bookTitle').val(book.bookTitle);
        $('.bookAuthor').val(book.bookAuthor);
    }
});