// Based on: https://github.com/AntuanKhanna/html-table-to-csv/blob/master/index.js

var cheerio = require('cheerio');

module.exports = function(html) {
    var $ = cheerio.load(html);

    var createMatrix = function($) {
        var matrix = [],
            i = 0;

        $("table tr").each(function() {
            console.log('- found tr #' + i);
            var j = 0;
            matrix[i] = [];

            $(this).find('th').each(function() {
                matrix[i][j] = $(this).text().trim().replace(/(\r\n|\n|\r)/gm, "");
                j++;
                return matrix;
            });

            $(this).find('td').each(function() {
                if ($(this).text().trim().match(/[\r\n\t\\",]/)) {
                    matrix[i][j] = '"' + $(this).text().trim().replace(/"/g, '""') + '"';
                } else {
                    matrix[i][j] = $(this).text().trim();
                }
                j++;
                return matrix;
            });

            i++;
        });

        return matrix;
    };

    function createCsv(data) {
        var csv = '';
        for (var i = 0; i < data.length; i++) {
            csv += data[i].join(',') + "\n";
        }
        return csv;
    }

    return createCsv(createMatrix($));
};
