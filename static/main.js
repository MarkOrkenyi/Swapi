

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
            var residents_html = '<td><button class="resident_btn" value="' + planets[i].residents + '">' + residents_nmbr + ' resident(s)</button></td>'
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
        residents_modal(residents_links)
    });
};

function residents_modal(residents_links) {
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
    $(".table.table-bordered#residents tbody").empty();
    $(".table.table-bordered#residents tbody").append(residents_table);
    $("#myModal").modal();
};

$(document).ready(function () {
    $.getJSON('http://swapi.co/api/planets', function (response) {
        planets = response['results'];
        next_href = response['next'];
        prev_href = response['previous'];
        display_planets(planets, next_href, prev_href);
    });
});

$(".container button").click(function () {
    var api_href = $(this).val();
    next_table(api_href);
    return false;
});
