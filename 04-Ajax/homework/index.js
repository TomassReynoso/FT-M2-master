var url = 'http://localhost:5000/amigos';

$('#loading').hide();

// const createElements = (info) => {
//     info.forEach((amigo) =>{
//         $(`<li>${amigo.name}</li>`).appendTo("#lista");
//     });
// };


$('#boton').click(() => {


    $.get(`${url}`, (info) => {

        const lista = $('#lista');
        lista.empty();
        for (let amigo of info) {
            const li = document.createElement('li');
            li.className = "amigos";
            li.id = amigo.id;
            li.innerText = amigo.name;
            lista.append(li);
        }
    })
    // cursor: pointer;
});


$(search).click(() => {

    $.get(`${url}` + '/' + $('#input').val(), (amigo) => {
        $('#amigo').text(amigo.name);
    });

});


$('#delete').click(() => {

    $.get(`${url}` + '/' + $('#inputDelete').val(), (amigo) => {
        $.ajax({
            url: `${url}` + '/' + $('#inputDelete').val(),
            type: 'DELETE',
            success: (result) => {
                $('#success').text(`${amigo.name} se ha eliminado de la lista`);
            }
        });
    });

});
