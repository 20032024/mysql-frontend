//var url = "http://34.60.119.163:8080/api/computers";

//var url = "https://pg-restapi-computers.onrender.com/api/computers";

var url = "https://pg-restapi-computers.onrender.com/api/computers";

function postComputer() {
  console.log("Enviando a:", url);

  var nameCorporation = $('#nameCorporation').val();
  var versionSoftware = $('#nameSoftware').val();
  var nameComputer = $('#nameComputer').val();
  var processor = $('#processor').val();
  var portatilText = $('#portatil').val().toLowerCase();
  var portatil = portatilText === 'sí' || portatilText === 'si' || portatilText === 'true';

  var myComputer = {
    nameCorporation: nameCorporation,
    versionSoftware: versionSoftware,
    nameComputer: nameComputer,
    processor: processor,
    portatil: portatil
  };

  console.log(myComputer);

  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      console.log('Respuesta del servidor:', data);
      $('#resultado').html('<pre>' + JSON.stringify(data, null, 2) + '</pre>');
    },
    error: function (err) {
      console.error('Error:', err);
      $('#resultado').html('<pre>' + JSON.stringify(err.responseJSON, null, 2) + '</pre>');
    },
    data: JSON.stringify(myComputer)
  });
}


function getComputers() {
  console.log(url);

  $.getJSON(url, function (json) {
    console.log(json);

    var arrComputers = json.computers;

    var htmlTable = '<table border="1">';
    htmlTable += '<tr>' +
      '<th>ID</th>' +
      '<th>nameCorporation</th>' +
      '<th>nameComputer Name</th>'+
      '<th>versionSoftware Version</th>' +
      '<th>processor</th>' +
      '<th>portatil</th>' +
    '</tr>';

    arrComputers.forEach(function (item) {
      htmlTable += '<tr>' +
        '<td>' + item.id + '</td>' +
        '<td>' + item.nameCorporation + '</td>' +
        '<td>' + item.nameComputer + '</td>' +
        '<td>' + item.versionSoftware + '</td>' +
        '<td>' + item.processor + '</td>' +
        '<td>' + (item.portatil ? 'Si' : 'No') + '</td>' +
        '<td><button onclick="editComputer(' + item.id + ')">Editar</button></td>' +
        '<td><button onclick="deleteComputer(' + item.id + ')">Eliminar</button></td>' +
        '</tr>';
    });

    htmlTable += '</table>';

    $('#resultado').html(htmlTable);
  });
}


function editComputer(id) {
  const nameCorporation = prompt("Nuevo nombre de corporación:");
  const versionSoftware = prompt("Nueva versión de software:");
  const nameComputer = prompt("Nuevo nombre de computadora:");
  const processor = prompt("Nuevo procesador:");
  const portatilInput = prompt("¿Es portátil? (sí/no):");
  const portatil = portatilInput.toLowerCase() === 'sí' || portatilInput.toLowerCase() === 'si' || portatilInput.toLowerCase() === 'true';

  const data = {
    nameCorporation,
    versionSoftware,
    nameComputer,
    processor,
    portatil
  };

  $.ajax({
    url: url + '/' + id,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (res) {
      alert('Computadora actualizada');
      getComputers(); // refresca la tabla
    },
    error: function (err) {
      alert('Error al actualizar');
      console.error(err);
    }
  });
}


function deleteComputer(id) {
  if (!confirm(`¿Estás seguro de eliminar la computadora #${id}?`)) return;

  $.ajax({
    url: url + '/' + id,
    type: 'DELETE',
    success: function () {
      alert('Computadora eliminada');
      getComputers(); // refresca la tabla
    },
    error: function (err) {
      console.error(err);
      alert('Error al eliminar computadora');
    }
  });
}

