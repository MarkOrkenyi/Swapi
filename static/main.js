

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
    $(".table.table-bordered tbody").empty();
    $(".table.table-bordered tbody").append(html_table);
    $(".container button#next_btn").val(next_href);
    $(".container button#prev_btn").val(prev_href);
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
$("html body div.container button.bela").click(function () {
    alert("megyen")
    var resident_hrefs = $(this).val();
    alert(resident_hrefs)
    return false;
});