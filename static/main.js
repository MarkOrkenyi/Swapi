$(".container button").click(function () {
    var api_href = $(this).val();
    next_table(api_href);
    return false;
});

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
        html_table.push('<tr><td>' + planets[i].name + '</td><td>' + planets[i].diameter + '</td><td>' + planets[i].climate + '</td><td>' + planets[i].terrain + '</td><td>' + planets[i].surface_water + '</td><td>' + planets[i].population + '</td><td>' + planets[i].residents + '</td></tr>');
    };
    $(".table.table-bordered tbody").empty();
    $(".table.table-bordered tbody").append(html_table);
    $(".container button#next_btn").val(next_href);
    $(".container button#prev_btn").val(prev_href);
};