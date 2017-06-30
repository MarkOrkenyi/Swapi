

function next_table(api_href) {
    $.getJSON(api_href, function (response) {
        planets = response['results'];
        next_href = response['next'];
        prev_href = response['previous'];
        display_planets(planets, next_href, prev_href);
    });
};

function display_planets(planets, next_href, prev_href) {
    var html_table = [];
    for (i = 0; i < planets.length; i++) {
        var residents_nmbr = planets[i].residents.length;
        if (residents_nmbr > 0) {
            var residents_html = '<td><button class="resident_btn" value="' + planets[i].residents + ',' + planets[i].name + '">' + residents_nmbr + ' resident(s)</button></td>'
        } else {
            var residents_html = '<td>No known residents</td>'
        }
        html_table.push('<tr><td>' + planets[i].name + '</td><td>' + planets[i].diameter + '</td><td>' + planets[i].climate + '</td><td>' + planets[i].terrain + '</td><td>' + planets[i].surface_water + '</td><td>' + planets[i].population + '</td>' + residents_html + '</tr>');
    };
    $(".table.table-bordered#planets tbody").empty();
    $(".table.table-bordered#planets tbody").append(html_table);
    $(".container button#next_btn").val(next_href);
    $(".container button#prev_btn").val(prev_href);
    $("button.resident_btn").click(function () {
        var residents_links = ($(this).val()).split(',');
        var planetName = residents_links.pop()
        residents_modal(residents_links, planetName)
    });
};

function residents_modal(residents_links, planetName) {
    var residents = [];
    for (i = 0; i < residents_links.length; i++) {
        $.ajax({
            url: residents_links[i],
            dataType: 'json',
            async: false,
            success: function (response) {
                var residentsDataTemp = [];
                residentsDataTemp.push(response['name'], response['height'], response['mass'], response['hair_color'], response['skin_color'], response['eye_color'], response['birth_year'], response['gender']);
                residents.push(residentsDataTemp);
            }
        });
    };
    var residents_table = [];
    for (i = 0; i < residents.length; i++) {
        residents_table.push('<tr><td>' + residents[i][0] + '</td><td>' + residents[i][1] + '</td><td>' + residents[i][2] + '</td><td>' + residents[i][3] + '</td><td>' + residents[i][4] + '</td><td>' + residents[i][5] + '</td><td>' + residents[i][6] + '</td><td>' + residents[i][7] + '</td></tr>');
    };
    $("h4.modal-title").text('Residents of ' + planetName);
    $(".table.table-bordered#residents tbody").empty();
    $(".table.table-bordered#residents tbody").append(residents_table);
    $("#residentModal").modal();
    $(function () {
        $('.close').click(function () {
            $('#residentModal').modal('hide');
        });
    });

};

$(document).ready(function () {
    $.getJSON('http://swapi.co/api/planets', function (response) {
        planets = response['results'];
        next_href = response['next'];
        prev_href = response['previous'];
        display_planets(planets, next_href, prev_href);
    });
    $(".container button").click(function () {
        var api_href = $(this).val();
        next_table(api_href);
        return false;
    });
    $(function () {
        if (window.location.href === "http://127.0.0.1:5000/login_user") {
            var loginUsername = $("meta[name='loginUsername']").attr("content");
            var loginStatus = $("meta[name='loginStatus']").attr("content");
            sessionStorage.setItem("loginStatus", loginStatus);
            sessionStorage.setItem("loginUsername", loginUsername);
            window.setTimeout(function () { window.location = "/"; }, 1000);
        };
        if (window.location.href === "http://127.0.0.1:5000/register_user") {
            window.setTimeout(function () { window.location = "/"; }, 1000);
        };
    });
    $(function () {
        if (sessionStorage.getItem("loginUsername") !== null) {
            $("html body nav.navbar.navbar-default div.container-fluid a#loggedIn").text(sessionStorage.getItem("loginUsername"));
        };
    });
    $(function () {
        $("html body nav.navbar.navbar-default div.container-fluid ul.nav.navbar-nav li a#logout").click(function () {
            sessionStorage.clear();
            window.location = "/";
        });
    });
});